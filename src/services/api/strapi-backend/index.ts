interface NewUser {
    name: string;
    identityNumber: string;
    publicAddress: string;
    nonce: number;
}

const BACKEND_URL = import.meta.env.VITE_STRAPI_BACKEND_URL;
const GET_USER_BY_ADDRESS_API = `${BACKEND_URL}/api/users?filters[publicAddress][$eq]=`;

export async function getUserByAddress(address: string): Promise<string> {
    const url = `${
        import.meta.env.VITE_STRAPI_BACKEND_URL
    }/api/users?filters[publicAddress][$eq]=${address}`;
    console.log(url);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch username: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();

    if (!data) {
        throw new Error(`Failed to fetch username: response data is invalid`);
    }

    if (!data.username) {
        console.log("Failed to fetch username: User doesn't exist");

        return "";
    }

    return data[0].walletAddress;
}

export async function createNewUser(user: NewUser): Promise<string> {
    const url = `${
        import.meta.env.VITE_STRAPI_BACKEND_URL
    }/api/auth/local/register`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: user.name,
            email: `${user.publicAddress}@gmail.com`,
            password: import.meta.env.SAMPLE_PASSWORD,
            nonce: Math.floor(Math.random() * 1000000000000000000),
            publicAddress: "0xcdE2CA950d10374CeBfe8003FaB5521b8Cc13Bd0",
        }),
    });

    return "";
}

export async function getUserJWT(address: string): Promise<string> {
    const url = `${import.meta.env.VITE_STRAPI_BACKEND_URL}/api/auth/local`;
    console.log(url);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identifier: `${address}@gmail.com`,
            password: import.meta.env.SAMPLE_PASSWORD,
        }),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch jwt: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();
    console.log(data[0].walletAddress);

    if (!data || !data.username) {
        throw new Error(`Failed to fetch username: response data is invalid`);
    }

    return data[0].walletAddress;
}
