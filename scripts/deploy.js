async function main() {

  const Ping2Pay = await ethers.getContractFactory("Ping2PayEscrow");

  const contract = await Ping2Pay.deploy();

  await contract.waitForDeployment();

  console.log("Ping2Pay deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
