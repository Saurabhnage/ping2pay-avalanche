import pkg from "hardhat";
const { ethers } = pkg;

async function main() {

  const contractAddress = "0x6C37935C4e791a996a93e0Daa8126CA8174057b0";

  const [signer] = await ethers.getSigners();

  console.log("Using wallet:", await signer.getAddress());

  const contract = await ethers.getContractAt(
    "Ping2PayEscrow",
    contractAddress
  );

  const tx = await contract.deposit({
    value: ethers.parseEther("0.01")
  });

  await tx.wait();

  console.log("Deposit successful!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});