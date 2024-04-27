const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);

console.log('privateKey:', toHex(privateKey));
console.log('publicKey:', toHex(publicKey));
console.log('address:', toHex(publicKey).slice(-20));

/* Generated 3 accounts:
    privateKey: ecc623cd75845d4e747bf11688084bf8efe4ccaab8bcc045de80b278fc9980c6
    publicKey: 033cefed8b3cdcf5325abc5b966640fe6808f64e48e3ee1adeceeb32632176dff4
    address: 1adeceeb32632176dff4

    privateKey: ff0f22a857a39af4cbce1aa0141db6abc337aa28c7d0c7f677dec88c107489c6
    publicKey: 035c0b8551b3ff8548ad76585d0031458e0fc68bd91973c6066ca3d41fb0140032
    address: c6066ca3d41fb0140032

    privateKey: 15197077fea7c3f85abfcdf94a4e63f49f338b35dd3bc9a6c80e994dcfe56811
    publicKey: 0267b9b86151a922b2bec76bbc97d8abf3cb72853cdeae2b7ee8e44f6e047433b0
    address: 2b7ee8e44f6e047433b0
 */
