import { format } from "path";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import WalletContract from "../../../contracts/Wallet.json";

const ALCHEMY_RPC_ENDPOINT = import.meta.env.VITE_ALCHEMY_ENDPOINT;
const CONTRACT_ADDRESS = import.meta.env.VITE_SAMPLE_WALLET_CONTRACT; // Todo: Call from backend

let selectedAccount: any;
let walletContract: Contract | null = null;
let isInitialized = false;

export const init = async () => {
  console.log("Contract address", CONTRACT_ADDRESS);

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

  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  walletContract = new web3.eth.Contract(
    WalletContract.abi as any,
    CONTRACT_ADDRESS
  );

  isInitialized = true;
};

export async function getContractBalance(): Promise<string> {
  if (!isInitialized) {
    await init();
  }

  try {
    const contractBalance = await walletContract?.methods.getBalance().call();
    return contractBalance;
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
    await web3.eth.sendTransaction({
      from: selectedAccount,
      to: accounts[1],
      value: web3.utils.toWei(value, "ether"),
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
    await web3.eth.methods.withdraw(value).send({
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
    await web3.eth.methods.vote(newOwner).send({
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
