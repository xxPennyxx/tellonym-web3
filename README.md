1. Clone it using `git clone https://github.com/xxPennyxx/tellonym-web3.git` or simply download the source code
2. Install all NPM packages using `npm i`
3. Go to https://www.infura.io or https://www.alchemy.com and create a new API key/application. Give it a name of your choice. Then choose Ethereum as your endpoint and Sepolia as your network. Make note of the URL you will get after this step.
4. Initialize Truffle Suite using truffle init
5. Open Ganache GUI and click on `Quickstart` to run your local blockchain on port 7545.
6. In `truffle-config.js` the settings should be such that the mnemonic should match that of your MetaMask wallet, and under `networks`, the port of the development network should be 7545 so you could connect to Ganache GUI. For the sepolia network under `provider` replace the URL with that of the application you created in step 3. You can use wss instead of http if you like.
7. The smart contract will be inside the `contracts` folder. Compile it using `truffle compile`
8. Under the `migrations` folder the deployment code will be there. This will deploy the code into the blockchain. Run `truffle migrate` and you'll see an address for the contract as well as the sender address.
9. Make sure you have a `.env` file in the same directory as `app.js`. Use this file to store the sender address and contract address and use it in the app.js. 
10. Then run `nodemon app.js` and click on http://localhost:3000
