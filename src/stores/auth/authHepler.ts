import {getWeb3Instance} from "@/services/contracts/walletContract";
import {NewUser} from "@/common/types";

export const BACKEND_API: string = import.meta.env.VITE_APP_BACKEND_URL
export const SAMPLE_SC_ADDRESS: string = import.meta.env.VITE_SAMPLE_WALLET_CONTRACT

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
        const web3 = await getWeb3Instance()
        const signature = await web3!.eth.personal.sign(
            `I am signing my one-time nonce: ${nonce}`,
            publicAddress,
            '' // MetaMask will ignore the password argument here
        );

        return {publicAddress, signature};
    } catch (err) {
        throw new Error(
            'You need to sign the message to be able to log in.'
        );
    }
};

export const handleSignupNew = (data: NewUser) => {
    // Open 1 cho de nguoi dung them guardians
    fetch(`${BACKEND_API}/users`, {
        body: JSON.stringify({data}),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((response) => {
        return response.json()
    });
}
export const test = () => {
    // chuyen den trang
}

export const handleSignup = (publicAddress: string) => {
    // Open 1 cho de nguoi dung them guardians
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