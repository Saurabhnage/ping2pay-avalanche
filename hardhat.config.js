import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

export default {
  solidity: "0.8.19",
  networks: {
    avalancheFuji: {
      url: process.env.AVALANCHE_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};