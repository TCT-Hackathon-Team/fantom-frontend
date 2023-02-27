import Web3 from "web3";

export const handleAuthenticate = ({
                                       publicAddress,
                                       signature,
                                   }: {
    publicAddress: string;
    signature: string;
}) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
        body: JSON.stringify({publicAddress, signature}),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((response) => response.json());

export const handleSignMessage = async ({
                                            web3,
                                            publicAddress,
                                            nonce,
                                        }: {
    web3: Web3
    publicAddress: string;
    nonce: string;
}) => {
    try {
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

export const handleSignup = (publicAddress: string) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        body: JSON.stringify({publicAddress}),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((response) => response.json());