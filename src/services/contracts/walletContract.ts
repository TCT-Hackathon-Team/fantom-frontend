import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import WalletContract from "../../../contracts/Wallet.json";

const ALCHEMY_RPC_ENDPOINT = import.meta.env.VITE_ALCHEMY_ENDPOINT;
const CONTRACT_ADDRESS = import.meta.env.VITE_SAMPLE_WALLET_CONTRACT; // Todo: Call from backend

let selectedAccount: any;
export let walletContractInstance: Contract | null = null;
let isInitialized = false;
export let web3Instance: Web3 | null = null;

export const getWeb3Instance = async () => {
    if (!isInitialized) {
        await init();
    }
    return web3Instance;
}

export const init = async () => {
    if (!(window as any).ethereum) {
        window.alert('Please install MetaMask first.');
        return;
    }

    let provider = (window as any).ethereum;
    //  || Web3.givenProvider
    //  || ALCHEMY_RPC_ENDPOINT
    //  || "http://localhost:8545"

    if (typeof provider !== "undefined") {
        await provider.request({method: "eth_requestAccounts"})
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
    // const networkId = await web3Instance.eth.net.getId();
    walletContractInstance = new web3Instance.eth.Contract(
        WalletContract.abi as any,
        CONTRACT_ADDRESS
    );

    isInitialized = true;
};

export async function getContractAddress(): Promise<string> {
    // Todo: Connect with backend
    return CONTRACT_ADDRESS.toLowerCase();
}

export async function getCurrentAccount(): Promise<string> {
    if (!isInitialized) {
        await init()
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
        return web3Instance?.utils.fromWei(contractBalance, "ether")!
    } catch (error) {
        console.log(error);
    }

    return "0";
}

export async function deposit(value: number): Promise<boolean> {
    if (!isInitialized) {
        await init();
    }
    if (value == 0 || value == null) {
        return false;
    }

    try {
        const transaction = await web3Instance?.eth.sendTransaction({
            from: selectedAccount,
            to: CONTRACT_ADDRESS,
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

// Utils
async function isPending(txHash: string) {
    return (await web3Instance?.eth.getTransactionReceipt(txHash)) == null;
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
