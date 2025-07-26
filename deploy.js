const hre = require("hardhat");

async function main() {
  const VendorContract = await hre.ethers.getContractFactory("ProductTracking");
  const contract = await VendorContract.deploy(); // waits for deployment in v6
  console.log("Contract deployed to:", contract.target); // use .target in ethers v6
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});