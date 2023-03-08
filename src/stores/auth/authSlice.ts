import { createSlice } from "@reduxjs/toolkit";
import { Account } from "@/common/types";

import {
  handleAuthenticate,
  handleSignMessage,
  handleSignup,
  SAMPLE_SC_ADDRESS,
} from "@/stores/auth/authHepler";
import jwtDecode from "jwt-decode";
import { getCurrentAccount } from "@/services/contracts/walletContract";

const LS_KEY = "login-with-metamask:auth";
// export let web3: Web3 | undefined | null = undefined; // Will hold the web3 instance
// export let contract: Contract | undefined | null = undefined;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: null as unknown as Account,
  },
  reducers: {
    connect: (state, action) => {
      state.value = {} as Account;
      const jwt = action.payload.token.jwt;
      const decodedData = jwtDecode(action.payload.token.jwt);

      console.log("action", action);
      console.log("decodeData", decodedData);
      console.log("state", state);
      console.log("jwt", jwt);

      // @ts-ignore
      state.value.id = decodedData.id;
      state.value.walletAddr = action.payload.publicAddress;
      state.value.smartContractAddr = action.payload.scAddr;

      localStorage.setItem(LS_KEY, JSON.stringify(action.payload.token.jwt));
    },
    disconnect: (state) => {
      state.value = null as unknown as Account;
      // localStorage.removeItem(LS_KEY);
      localStorage.clear();
    },
  },
});

export const selectAccount = (state: any) => state.auth.value;
export const { connect, disconnect } = authSlice.actions;
export const authReducer = authSlice.reducer;

// @ts-ignore
export const connectWallet = (navigate) => async (dispatch) => {
  const publicAddress = await getCurrentAccount();

  const url = `${
    import.meta.env.VITE_STRAPI_BACKEND_URL
  }/api/users?filters[publicAddress][$eqi]=${publicAddress}`;

  // Look if user with current publicAddress is already present on backend
  fetch(url)
    .then((response) => {
      return response.json();
    })
    // If yes, retrieve it. If no, create it.
    .then((users) => {
      // HandleSignup: if user is not exist
      console.log("users", users);

      return users.length ? users[0] : handleSignup(publicAddress);
    })
    // Popup MetaMask confirmation modal to sign message
    .then(handleSignMessage)
    // Send signature to backend on the /counter route
    .then(handleAuthenticate)
    // Pass accessToken back to parent component (to save it in localStorage)
    .then((response) => {
      const responseAuth = response as any;
      const jwtToken = responseAuth.jwt;
      const contractAddress = responseAuth.user.contractAddress;

      dispatch({
        type: "LOGIN_USER",
        payload: responseAuth,
      });

      const test = connect({
        publicAddress,
        token: responseAuth,
        scAddr: contractAddress,
      });

      console.log("test", test);
      dispatch(test);

      // dispatch(
      //     connect({
      //         publicAddress,
      //         token: responseAuth,
      //         scAddr: contractAddress,
      //     })
      // );
      navigate("/management");
      // window.alert("Dang gia lap BE :)))");
      // if (web3 && web3.currentProvider) {
      //     web3.currentProvider.close();
      // }
    })
    .catch((err) => {
      // window.alert(err);
      localStorage.clear();
      throw new Error(err);
    });
};
