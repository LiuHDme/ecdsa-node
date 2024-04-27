const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "ecc623cd75845d4e747bf11688084bf8efe4ccaab8bcc045de80b278fc9980c6";
const PUBLIC_KEY = "033cefed8b3cdcf5325abc5b966640fe6808f64e48e3ee1adeceeb32632176dff4";
const ADDRESS = "1adeceeb32632176dff4";

const msg = {
    from: ADDRESS,
    to: "c6066ca3d41fb0140032",
    amount: 20,
    nonce: 0,
}
const hashMsg = toHex(keccak256(utf8ToBytes(JSON.stringify(msg))));
const signature = secp.secp256k1.sign(hashMsg, PRIVATE_KEY);
const hexSignature = toHex(signature.toCompactRawBytes());


console.log("Message:", msg);
console.log("Hex Signature:", hexSignature);

// const isValid = secp.secp256k1.verify(hexSignature, hashMsg, PUBLIC_KEY);
// console.log("isValid:", isValid);
