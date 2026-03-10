const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.AVALANCHE_RPC);

async function sendPayment(privateKey, to, amount) {

  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = await wallet.sendTransaction({
    to: to,
    value: ethers.parseEther(amount)
  });

  await tx.wait();

  return tx.hash;
}

module.exports = sendPayment;
