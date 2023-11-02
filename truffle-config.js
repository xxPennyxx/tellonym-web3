require('dotenv').config();

const HDWalletProvider = require("truffle-hdwallet-provider");
const path = require("path");
const MNEMONIC= process.env.MNEMONIC;
module.exports = {
  contracts_build_directory: "./build/contracts",


  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,//instead of 8545-- to connect to Ganache GUI
      network_id: "*", 
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, "wss://eth-goerli.g.alchemy.com/v2/y2azKY2HYhy9a7Vt9ZKmJK3sYWHxJojW"),
      network_id: 5,
      confirmations:2,
      timeoutBlocks:200, 
      skipDryRun:true,
      // gas: 6721975, // Adjust gas limit as needed
      // gasPrice: 20000000000, // Adjust gas price as needed
      networkCheckTimeout: 40000
    }
  },
  compilers: {
    solc: {
      version: "0.8.0" // Use the appropriate Solidity compiler version
    }
  }
};
