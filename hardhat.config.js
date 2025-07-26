require("dotenv").config(); 
require("@nomicfoundation/hardhat-toolbox");

console.log("RPC:", process.env.RPC_URL);
console.log("KEY:", process.env.PRIVATE_KEY);

module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./backend/block_chain", // ✅ FIXED HERE
  },
  networks: {
    sepolia: {
      url: process.env.RPC_URL, 
      accounts: [process.env.PRIVATE_KEY], 
    },
  },
};