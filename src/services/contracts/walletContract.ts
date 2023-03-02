import { format } from "path";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import WalletContract from "../../../contracts/Wallet.json";

const ALCHEMY_RPC_ENDPOINT = import.meta.env.VITE_ALCHEMY_ENDPOINT;
const CONTRACT_ADDRESS = import.meta.env.VITE_SAMPLE_WALLET_CONTRACT; // Todo: Call from backend

let selectedAccount: any;
let walletContractInstance: Contract | null = null;
let isInitialized = false;
let web3Instance: Web3 | null = null;

export const init = async () => {
  let provider = (window as any).ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts: any) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err: any) => {
        console.log(err);
        return;
      });
    (window as any).ethereum.on("accountsChanged", function (accounts: any) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }

  web3Instance = new Web3(provider);
  // const networkId = await web3Instance.eth.net.getId();
  walletContractInstance = new web3Instance.eth.Contract(
    WalletContract.abi as any,
    CONTRACT_ADDRESS
  );

  isInitialized = true;
};

export async function getContractAddress(): Promise<string> {
  return CONTRACT_ADDRESS;
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

export async function getContractBalance(): Promise<string> {
  if (!isInitialized) {
    await init();
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

export async function deposit(value: number): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  try {
    await web3Instance?.eth.sendTransaction({
      from: selectedAccount,
      to: CONTRACT_ADDRESS,
      value: web3Instance?.utils.toWei(value.toString(), "ether"),
    });
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function withdraw(value: number): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  try {
    await walletContractInstance?.methods.withdraw(value).send({
      from: selectedAccount,
    });
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function vote(newOwner: string): Promise<boolean> {
  if (!isInitialized) {
    await init();
  }

  try {
    await walletContractInstance?.methods.vote(newOwner).send({
      from: selectedAccount,
    });
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
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
