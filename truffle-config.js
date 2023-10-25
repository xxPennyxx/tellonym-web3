const HDWalletProvider = require("truffle-hdwallet-provider");
const path = require("path");

// const MNEMONIC= "slogan action endorse brief social unfold crumble cream maple gym math around"
const MNEMONIC='afddd6dca855fb5161ba4d64678652e964ebde43301f55abaf685d300a6260f4';
module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", 
    },
    testnet: {
      provider: () => new HDWalletProvider(MNEMONIC, "https://sepolia.infura.io/v3/ae97616284604034b1f25fc5bda9e253"),
      network_id: 11155111,
      gas: 5500000, // Adjust gas limit as needed
      gasPrice: 70000000000, // Adjust gas price as needed
      networkCheckTimeout: 40000
    }
  },
  compilers: {
    solc: {
      version: "0.8.0" // Use the appropriate Solidity compiler version
    }
  }
};
