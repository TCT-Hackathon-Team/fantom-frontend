import {createSlice} from '@reduxjs/toolkit'
import {Account} from "@/common/types";

import Web3 from "web3";
import Contract from "web3"

import myData from '@/Wallet.json';
import {handleAuthenticate, handleSignMessage, handleSignup, SAMPLE_SC_ADDRESS} from "@/stores/auth/authHepler";
import {useSelector} from "react-redux";
import jwtDecode from 'jwt-decode';

const LS_KEY = 'login-with-metamask:auth';
export let web3: Web3 | undefined | null = undefined; // Will hold the web3 instance
export let contract: Contract | undefined | null = undefined;

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: null as unknown as Account,
    },
    reducers: {
        connect: (state, action) => {
            state.value = {} as Account
            const decodedData = jwtDecode(action.payload.token.accessToken);
            // @ts-ignore
            state.value.id = decodedData.payload.id
            state.value.walletAddr = action.payload.publicAddress
            state.value.smartContractAddr = SAMPLE_SC_ADDRESS
            localStorage.setItem(LS_KEY, JSON.stringify(action.payload.token));
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

// @ts-ignore
export const connectWallet = (navigate) => async (dispatch) => {
    console.log(import.meta.env.VITE_APP_BACKEND_URL)

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
    contract = new web3.eth.Contract(myData.abi, SAMPLE_SC_ADDRESS);

    if (!coinbase) {
        window.alert('Please activate MetaMask first.');
        return;
    }

    let publicAddress = coinbase.toLowerCase();
    const url = `${import.meta.env.VITE_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`

    // Look if user with current publicAddress is already present on backend
    fetch(url)
        .then((response) => {
            return response.json()
        })
        // If yes, retrieve it. If no, create it.
        .then((users) => {
            return users.length ? users[0] : handleSignup(publicAddress)
        })
        // Popup MetaMask confirmation modal to sign message
        .then(handleSignMessage)
        // // Send signature to backend on the /counter route
        .then(handleAuthenticate)
        // // Pass accessToken back to parent component (to save it in localStorage)
        .then((response) => {
            dispatch(connect({publicAddress, token: response, scAddr: SAMPLE_SC_ADDRESS}))
            navigate("/management")
            // window.alert("Dang gia lap BE :)))");
            // if (web3 && web3.currentProvider) {
            //     web3.currentProvider.close()
            // }
        })
        .catch((err) => {
            window.alert(err);
        });


}
