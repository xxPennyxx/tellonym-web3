1. Clone it using git clone https://github.com/xxPennyxx/tellonym-web3.git
2. Install all NPM packages using npm i
3. Initialize Truffle Suite using truffle init
4. On one tab run ganache-cli
5. On another tab compile the contracts using truffle compile
6. Run truffle migrate to deploy to the testnet (Sepolia) and the deployment networks
7. To get the address and the ABI, in another tab run truffle console and then run the following:
const TellonymContract = artifacts.require("TellonymContract");
let myContract = await TellonymContract.deployed();
myContract.abi 
8. Then run nodemon app.js and click on http://localhost:3000