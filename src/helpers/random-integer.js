export default (min = 1, max = 6) => {
    const range = max - min + 1;
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    if (bytesNeeded > 6) {
        throw new Error('Too many bytes needed');
    }
    const maxBytes = 6;
    const randBytes = new Uint8Array(maxBytes);
    window.crypto.getRandomValues(randBytes);
    let value = 0n;
    for (let i = 0; i < bytesNeeded; i += 1) {
        value <<= 8n;
        value |= BigInt(randBytes[i]);
    }
    return Number(value % BigInt(range)) + min;
}
