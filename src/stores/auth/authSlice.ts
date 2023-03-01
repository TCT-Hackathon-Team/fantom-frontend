import {createSlice} from '@reduxjs/toolkit'
import {Account} from "@/common/types";
import Web3 from "web3";

const LS_KEY = 'login-with-metamask:auth';
export let web3: Web3 | undefined | null = undefined; // Will hold the web3 instance

const acc: Account = {
    id: "8888888",
    name: "TCT2001",
    walletAddr: "0x0000000",
    smartContractAddr: "0xFFFFFFFF"
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: null as unknown as Account,
    },
    reducers: {
        connect: (state, action) => {
            state.value = {} as Account
            state.value.walletAddr = action.payload.publicAddress
            localStorage.setItem(LS_KEY, "TCT2001");
        },
        disconnect: (state) => {
            state.value = null as unknown as Account
            // localStorage.removeItem(LS_KEY);
            localStorage.clear()
        },
    },
})

export const selectAccount = (state: any) => state.auth.value
export const {connect, disconnect} = authSlice.actions
export const authReducer = authSlice.reducer

import myData from '@/Wallet.json';

// @ts-ignore
export const connectWallet = (navigate) => async (dispatch) => {
    if (!(window as any).ethereum) {
        window.alert('Please install MetaMask first.');
        return;
    }

    if (!web3) {
        try {
            // Request account access if needed
            // await (window as any).ethereum.enable();
            await (window as any).ethereum.request({method: 'eth_requestAccounts'});
            // We don't know window.web3 version, so we use our own instance of Web3
            // with the injected provider given by MetaMask
            web3 = new Web3((window as any).ethereum);
        } catch (error) {
            window.alert('You need to allow MetaMask.');
            return;
        }
    }

    const coinbase = await web3.eth.getCoinbase();
    // @ts-ignore
    const myContract = new web3.eth.Contract(myData.abi, "0xD2C99E873EB4F21552C101C7c46eFC694323cb25");
    console.log(myContract)
    if (!coinbase) {
        window.alert('Please activate MetaMask first.');
        return;
    }

    let publicAddress = coinbase.toLowerCase();

    // const url = `${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
    const url = "https://api.publicapis.org/entries"

    // Look if user with current publicAddress is already present on backend
    fetch(url)
        // .then((response) => response.json())
        // // If yes, retrieve it. If no, create it.
        // .then((users) =>
        //     users.length ? users[0] : handleSignup(publicAddress)
        // )
        // // Popup MetaMask confirmation modal to sign message
        // .then(handleSignMessage)
        // // Send signature to backend on the /counter route
        // .then(handleAuthenticate)
        // // Pass accessToken back to parent component (to save it in localStorage)
        .then(() => {
            dispatch(connect({publicAddress}))
            navigate("/management")
            window.alert("Dang gia lap BE :)))");
            // if (web3 && web3.currentProvider) {
            //     web3.currentProvider.close()
            // }
        })
        .catch((err) => {
            window.alert(err);
        });
}
