const NONCE_LENGTH = 16;

export function getRandomString(): string {
    const randomValues = new Uint8Array(NONCE_LENGTH);
    crypto.getRandomValues(randomValues);
    return Array.from(randomValues)
        .map((n) => n.toString(16).padStart(2, "0"))
        .join("");
}
