require('dotenv').config();

const HDWalletProvider = require("truffle-hdwallet-provider");
const path = require("path");
const MNEMONIC= process.env.MNEMONIC;
module.exports = {
  contracts_build_directory: "./build/contracts",


  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", 
    },
    testnet: {
      provider: () => new HDWalletProvider(MNEMONIC, "https://sepolia.infura.io/v3/ae97616284604034b1f25fc5bda9e253"),
      network_id: 11155111,
      gas: 6721975, // Adjust gas limit as needed
      gasPrice: 20000000000, // Adjust gas price as needed
      networkCheckTimeout: 40000
    }
  },
  compilers: {
    solc: {
      version: "0.8.0" // Use the appropriate Solidity compiler version
    }
  }
};
