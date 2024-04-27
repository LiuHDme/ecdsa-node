const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "1adeceeb32632176dff4": 100,
  "c6066ca3d41fb0140032": 50,
  "2b7ee8e44f6e047433b0": 75,
};

const executedSignatures = new Set();

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, nonce, signature, pubKey } = req.body;

  // hash msg
  const msg = {
    from: sender,
    to: recipient,
    amount: amount,
    nonce: nonce,
  }
  const msgHash = toHex(keccak256(utf8ToBytes(JSON.stringify(msg))));

  // verify signature
  let isValid = secp.secp256k1.verify(signature, msgHash, pubKey);
  if (executedSignatures.has(signature)) {
    isValid = false;
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else if (!isValid) {
    res.status(400).send({ message: "Signature not valid!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
    executedSignatures.add(signature);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
