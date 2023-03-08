import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import WalletContract from "../../../contracts/Wallet.json";
import hashContract from "../../../contracts/Hash.json";
import { json } from "react-router-dom";
import { async } from "q";
import { Bool } from "reselect/es/types";

const ALCHEMY_RPC_ENDPOINT = import.meta.env.VITE_ALCHEMY_ENDPOINT;
const CONTRACT_ADDRESS = import.meta.env.VITE_SAMPLE_WALLET_CONTRACT; // Todo: Call from backend
const HASH_CONTRACT_ADDRESS = import.meta.env.VITE_SAMPLE_HASH_CONTRACT; // Todo: Call from backend

let selectedAccount: any;
export let walletContractInstance: Contract | null = null;
let isInitialized = false;
let isContractInitialized = false;
export let web3Instance: Web3 | null = null;

export const getWeb3Instance = async () => {
  if (!isInitialized) {
    await init();
  }
  return web3Instance;
};

/************************************************
 *  Initialization
 ***********************************************/

// export async function connectToMetamask() {
//     if (typeof (window as any).ethereum !== "undefined") {
//         console.log("MetaMask is installed!");
//     }

//     await (window as any).ethereum.request({ method: "eth_requestAccounts" });
// }

export const init = async () => {
  if (!(window as any).ethereum) {
    window.alert("Please install MetaMask first.");
    return;
  }

  let provider = (window as any).ethereum;
  //  || Web3.givenProvider
  //  || ALCHEMY_RPC_ENDPOINT
  //  || "http://localhost:8545"

  if (typeof provider !== "undefined") {
    await provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts: any) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err: any) => {
        console.log(err);
        return;
      });
    (window as any).ethereum.on("accountsChanged", (accounts: any) => {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }

  web3Instance = new Web3(provider);
  // walletContractInstance = new web3Instance.eth.Contract(
  //   WalletContract.abi as any,
  //   CONTRACT_ADDRESS
  // );

  isInitialized = true;
};

export async function initContractInstance(contractAddress: string) {
  if (!isInitialized) {
    await init();
  }

  let provider = (window as any).ethereum;
  web3Instance = new Web3(provider);
  walletContractInstance = new web3Instance.eth.Contract(
    WalletContract.abi as any,
    contractAddress
  );

  // walletContractInstance = new web3Instance?.eth.Contract(
  //   WalletContract.abi as any,
  //   contractAddress
  // );

  isContractInitialized = true;
}

/************************************************
 *  Signup
 ***********************************************/

export async function createWalletContract(
  guardianAddresses: string[],
  threshold: number
): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }
  let web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_RPC_ENDPOINT));
  const guardianAddressHashes = guardianAddresses.map((address) => {
    return web3Instance?.utils.keccak256(address);
  });

  const walletContract = new web3.eth.Contract(WalletContract.abi as any);

  try {
    const contractInstance = await walletContract
      .deploy({
        data: WalletContract.bytecode,
        arguments: [guardianAddressHashes, threshold],
      })
      .send({
        from: selectedAccount,
        gas: 1500000,
        gasPrice: "30000000000000",
      });

    console.log("Contract deployed at:", contractInstance.options.address);

    // Check if the contract was deployed successfully
    const code = await web3.eth.getCode(contractInstance.options.address);
    if (code.length > 2) {
      console.log("Contract deployment was successful");
      return true;
    } else {
      console.log("Contract deployment failed");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

/************************************************
 *  Account Management
 ***********************************************/

export async function getContractAddress(): Promise<string> {
  // Todo: Connect with backend
  return CONTRACT_ADDRESS.toLowerCase();
}

export async function getCurrentAccount(): Promise<string> {
  if (!isInitialized) {
    await init();
  }
  return selectedAccount;
}

export async function getUserBalance(): Promise<string> {
  if (!isInitialized) {
    await init();
  }

  try {
    const balance: string = await web3Instance?.eth.getBalance(
      selectedAccount
    )!;

    return web3Instance?.utils.fromWei(balance, "ether")!;
  } catch (error) {
    console.log(error);
  }

  return "0";
}

export async function getContractBalance(
  contractAddress: string
): Promise<string> {
  if (!isInitialized) {
    await init();
  }

  if (!isContractInitialized) {
    await initContractInstance(contractAddress);
  }

  try {
    const contractBalance = await walletContractInstance?.methods
      .getBalance()
      .call();
    return web3Instance?.utils.fromWei(contractBalance, "ether")!;
  } catch (error) {
    console.log(error);
  }

  return "0";
}

/************************************************
 *  Vault Management
 ***********************************************/

export async function deposit(
  contractAddress: string,
  value: number
): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }
  if (value == 0 || value == null) {
    return false;
  }

  try {
    const transaction = await web3Instance?.eth.sendTransaction({
      from: selectedAccount,
      to: contractAddress,
      value: web3Instance?.utils.toWei(value.toString(), "ether"),
    });

    let receipt = await web3Instance?.eth.getTransactionReceipt(
      transaction!.transactionHash
    );
    while (!receipt) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
      receipt = await web3Instance?.eth.getTransactionReceipt(
        transaction!.transactionHash
      );
    }
    // @ts-ignore
    // Todo: If success: call tobackend to add tx
    return receipt.status;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function withdraw(value: number): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  if (value == 0 || value == null) {
    return false;
  }

  const weiValue = web3Instance?.utils.toWei(value.toString(), "ether");

  try {
    const transaction = await walletContractInstance?.methods
      .withdraw(weiValue)
      .send({
        from: selectedAccount,
      });
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

/************************************************
 *  Guardian Management
 ***********************************************/

export async function isGuardian(address: string): Promise<Boolean> {
  if (!isInitialized) {
    await init();
  }

  const addressHash = web3Instance?.utils.keccak256(address);

  try {
    const isGuardian = await walletContractInstance?.methods
      .isGuardian(addressHash)
      .call();
    return isGuardian;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function addGuardians(address: string): Promise<Boolean> {
  if (!isInitialized) {
    await init();
  }

  const guardStatus = await isGuardian(address);
  if (guardStatus) {
    console.log("Already a guardian");
    return false;
  }

  try {
    const transaction = await walletContractInstance?.methods
      .addGuardians(address)
      .send({
        from: selectedAccount,
      });

    let receipt = await web3Instance?.eth.getTransactionReceipt(
      transaction!.transactionHash
    );
    while (!receipt) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
      receipt = await web3Instance?.eth.getTransactionReceipt(
        transaction!.transactionHash
      );
    }
    return receipt.status;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function removeGuardians(address: string): Promise<Boolean> {
  if (!isInitialized) {
    await init();
  }

  const guardStatus = await isGuardian(address);
  if (!guardStatus) {
    console.log("Not a guardian");

    return false;
  }

  try {
    const transaction = await walletContractInstance?.methods
      .removeGuardian(address)
      .send({
        from: selectedAccount,
      });
    let receipt = await web3Instance?.eth.getTransactionReceipt(
      transaction!.transactionHash
    );
    while (!receipt) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
      receipt = await web3Instance?.eth.getTransactionReceipt(
        transaction!.transactionHash
      );
    }
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

/************************************************
 *  Recovery Process
 ***********************************************/

export async function vote(
  contractAddress: string,
  newOwner: string
): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  console.log("vote called");

  const recoveryStatus = await isInRecovery(contractAddress);
  if (!recoveryStatus) {
    const res = await initiateRecovery(contractAddress, newOwner);
    if (!res) {
      return false;
    }
  } else {
    const res = await supportRecovery(newOwner);
    if (!res) {
      return false;
    }
  }
  return true;
}

export async function autoExecuteVote(
  contractAddress: string,
  newOwner: string
): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  const recoveryStatus = await isInRecovery(contractAddress);
  if (!recoveryStatus) {
    const res = await initiateRecovery(contractAddress, newOwner);
    if (!res) {
      console.log("initiateRecovery failed");
      return false;
    }
  } else {
    const res = await supportRecovery(newOwner);
    if (!res) {
      console.log("supportRecovery failed");
      return false;
    }
  }

  const voteCount = await getCurrentRoundNewOwernVoteCount(newOwner);
  const threshold = await getThreshold();
  if (voteCount >= threshold) {
    const res = await executeRecovery(newOwner);
    if (!res) {
      console.log("executeRecovery failed");
      return false;
    }
  }

  return true;
}

export async function initiateRecovery(
  contractAddress: string,
  newOwner: string
): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  let provider = (window as any).ethereum;
  web3Instance = new Web3(provider);
  const walletContract = new web3Instance.eth.Contract(
    WalletContract.abi as any,
    contractAddress
  );

  try {
    let transaction = await walletContract?.methods
      .initiateRecovery(newOwner)
      .send({
        from: selectedAccount,
      });

    let receipt = await web3Instance?.eth.getTransactionReceipt(
      transaction!.transactionHash
    );
    while (!receipt) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
      receipt = await web3Instance?.eth.getTransactionReceipt(
        transaction!.transactionHash
      );
    }
    return receipt.status;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function supportRecovery(newOwner: string): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  try {
    const transaction = await walletContractInstance?.methods
      .supportRecovery(newOwner)
      .send({
        from: selectedAccount,
      });

    let receipt = await web3Instance?.eth.getTransactionReceipt(
      transaction!.transactionHash
    );
    while (!receipt) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
      receipt = await web3Instance?.eth.getTransactionReceipt(
        transaction!.transactionHash
      );
    }
    // @ts-ignore
    return receipt.status;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function executeRecovery(newOwner: string): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  try {
    await walletContractInstance?.methods["executeRecovery(address)"](
      newOwner
    ).send({
      from: selectedAccount,
    });
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

/************************************************
 *  Recovery Status Management
 ***********************************************/

export async function getThreshold(): Promise<number> {
  if (!isInitialized) {
    await init();
  }

  try {
    const threshold = await walletContractInstance?.methods.threshold().call();

    return threshold.toNumber();
  } catch (error) {
    console.log(error);
  }

  return 0;
}

export async function isInRecovery(contractAddress: string): Promise<Boolean> {
  if (!isInitialized) {
    await init();
  }

  const contractInstance = await getWalletContractInstanceFromContractAddress(
    contractAddress
  );

  try {
    const isRecovery = await contractInstance.methods.inRecovery().call();

    return isRecovery;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function getRecoveryRound(): Promise<number> {
  if (!isInitialized) {
    await init();
  }

  try {
    const recoveryRound = await walletContractInstance?.methods
      .getRecoveryRound()
      .call();

    console.log("recoveryRound", recoveryRound);

    return recoveryRound.toNumber();
  } catch (error) {
    console.log(error);
  }

  return 0;
}

export async function getCurrentRoundNewOwernVoteCount(
  newOnwer: string
): Promise<number> {
  if (!isInitialized) {
    await init();
  }

  const currRound = await getRecoveryRound();

  try {
    const voteCount = await walletContractInstance?.methods
      .getNewOwnerVoteCount(currRound, newOnwer)
      .call();

    console.log("vote count", voteCount);

    return voteCount.toNumber();
  } catch (error) {
    console.log(error);
  }

  return 0;
}

// Utils
async function isPending(txHash: string) {
  return (await web3Instance?.eth.getTransactionReceipt(txHash)) == null;
}

async function getWalletContractInstanceFromContractAddress(
  contractAddress: string
) {
  if (!isInitialized) {
    await init();
  }

  let provider = (window as any).ethereum;
  web3Instance = new Web3(provider);
  return new web3Instance.eth.Contract(
    WalletContract.abi as any,
    contractAddress
  );
}

// console.log("Contract address", CONTRACT_ADDRESS);

// let walletContract;

// export async function initiateContractInstance() {
//   const web3 = new Web3(
//     Web3.givenProvider || ALCHEMY_RPC_ENDPOINT || "http://localhost:8545"
//   );

//   walletContract = new web3.eth.Contract(Wallet.abi as any, CONTRACT_ADDRESS);
// }

// export async function getContractBalance(): Promise<string> {
//   let balance = "0";
//   try {
//     balance = await walletContract.methods.getBalance().call();
//   } catch (error) {
//     console.log("Error", error);
//   }

//   return balance;
