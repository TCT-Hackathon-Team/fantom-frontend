import { NewUser } from "../../../common/types";

const BACKEND_URL = import.meta.env.VITE_STRAPI_BACKEND_URL;
const GET_USER_BY_ADDRESS_API = `${BACKEND_URL}/api/users?filters[publicAddress][$eq]=`;

export async function getUser(address: string): Promise<string> {
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

  if (!data[0].username) {
    console.log("Failed to fetch username: User doesn't exist");

    return "";
  }

  return data[0];
}

export async function getUserIdNumByUserAddress(
  address: string
): Promise<string> {
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

  if (!data[0].username) {
    console.log("Failed to fetch username: User doesn't exist");

    return "";
  }

  return data[0];
}

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

  if (!data[0].username) {
    console.log("Failed to fetch username: User doesn't exist");

    return "";
  }

  return data[0].walletAddress;
}

export async function getUserByUserIdDoc(idNum: string): Promise<any> {
  const url = `${
    import.meta.env.VITE_STRAPI_BACKEND_URL
  }/api/users?filters[identityNumber][$eqi]=${idNum}`;
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

  if (!data[0]?.username) {
    console.log("Failed to fetch username: User doesn't exist");

    return "";
  }

  return data[0];
}

export async function getContractAddressByUserAddress(
  address: string
): Promise<string> {
  const url = `${
    import.meta.env.VITE_STRAPI_BACKEND_URL
  }/api/users?filters[publicAddress][$eqi]=${address}`;

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
  console.log("scData", data);

  if (!data) {
    throw new Error(`Failed to fetch username: response data is invalid`);
  }

  if (!data[0].username) {
    console.log("Failed to fetch username: User doesn't exist");

    return "";
  }

  if (!data[0].contractAddress) {
    console.log("User doesn't have a wallet contract yet");

    return "";
  }

  return data[0].contractAddress;
}

export async function createNewUser(user: NewUser): Promise<any> {
  const url = `${
    import.meta.env.VITE_STRAPI_BACKEND_URL
  }/api/auth/local/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.name,
        email: `${user.publicAddress}@gmail.com`,
        password: import.meta.env.VITE_SAMPLE_PASSWORD,
        nonce: Math.floor(Math.random() * 1000000000000000000).toString(),
        publicAddress: user.publicAddress,
        isInRecovery: false,
      }),
    });

    return response.json();
  } catch (error) {
    return null;
    console.log(error);
  }
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

export async function callForRecovery(idNum: string) {
  // Check if id match
  // Set recovery status
}

export async function getAllProtectee(idNum: string) {
  // Check if id match
  // Set recovery status
}

export async function getAllProtecteeInRecovery(idNum: string) {
  // Check if id match
  // Set recovery status
}

export async function getAllGuardian(idNum: string) {
  // Check if id match
  // Set recovery status
}

export async function setRecoveryStatus(
  idNum: string
  // status: boolean
): Promise<Boolean> {
  // Get user id
  const data = await getUserByUserIdDoc(idNum);
  console.log("data", data);
  //   if (!data) {
  //     return false;
  //   }
  const url = `${import.meta.env.VITE_STRAPI_BACKEND_URL}/api/users/${data.id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      // Authorization: "Bearer " + localStorage.getItem("jwt"),
      Authorization: "Bearer " + import.meta.env.VITE_ADMIN_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isInRecovery: !data.isInRecovery,
    }),
  });

  if (!response.ok) {
    return false;
  }

  return true;
}

export async function getAllProtecteeFromGuardianAddress(
  guardAddress: string
): Promise<any> {
  const url = `${
    import.meta.env.VITE_STRAPI_BACKEND_URL
  }/api/users?filters[guardians][$containsi]=${guardAddress}`;

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

  return data;
}

export async function createNewRecoveryRound(recoveryStatusInfo: any) {}
