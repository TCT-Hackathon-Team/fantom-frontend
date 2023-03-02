import Web3 from "web3";
import {web3} from "@/stores/auth/authSlice";

export const BACKEND_API: string = import.meta.env.VITE_APP_BACKEND_URL
export const SAMPLE_SC_ADDRESS: string = import.meta.env.VITE_SAMPLE_SMARTCONTRACT_ADDRESS

export const handleAuthenticate = ({
                                       publicAddress,
                                       signature,
                                   }: {
    publicAddress: string;
    signature: string;
}) =>
    fetch(`${BACKEND_API}/auth`, {
        body: JSON.stringify({publicAddress, signature}),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((response) => response.json());

export const handleSignMessage = async ({
                                     publicAddress,
                                     nonce,
                                 }: {
    publicAddress: string;
    nonce: string;
}) => {
    try {
        const signature = await web3!.eth.personal.sign(
            `I am signing my one-time nonce: ${nonce}`,
            publicAddress,
            '' // MetaMask will ignore the password argument here
        );

        return { publicAddress, signature };
    } catch (err) {
        throw new Error(
            'You need to sign the message to be able to log in.'
        );
    }
};

export const handleSignup = (publicAddress: string) => {
    fetch(`${BACKEND_API}/users`, {
        body: JSON.stringify({publicAddress}),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((response) => {
        return response.json()
    });
}