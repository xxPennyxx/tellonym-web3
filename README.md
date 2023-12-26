## Tellonym Web3 edition

Hey folks! So I decided to recreate Tellonym using the Ethereum blockchain, and give it the functionality of adding and deleting secrets, aka "tells". If you'd like to test it out on your own computer, here is a breakdown of the steps:

1. Clone the repository using `git clone https://github.com/xxPennyxx/tellonym-web3.git` or simply download the source code.
2. Head to the directory of this project in your terminal and install all NPM packages using `npm i`. **(NodeJS required!!)**
   
   The packages you'll require are:
   - express
   - ejs
   - body-parser
   - web3
   - truffle
   - web3
   - dotenv (for environment variables)
   - nodemon (optional)
3. Go to https://www.infura.io or https://www.alchemy.com and create a new API key/application. Give it a name of your choice. Then choose Ethereum as your endpoint and Sepolia as your network. Make note of the URL you will get after this step.
4. Initialize Truffle Suite in your project using `truffle init`
5. Open Ganache GUI and click on `Quickstart` to run your local blockchain on port 7545.
6. In `truffle-config.js` the settings should be such that the mnemonic should match that of your MetaMask wallet, and under `networks`, the port of the development network should be 7545 so you could connect to Ganache GUI. For the sepolia network under `provider` replace the URL with that of the application you created in step 3. You can use wss instead of http if you like.
7. The smart contract (written in Solidity) will be inside the `contracts` folder. Compile it using `truffle compile`
8. Under the `migrations` folder the deployment code will be there. This will deploy the code into the blockchain. Run `truffle migrate` and you'll see an address for the contract as well as the sender address in your terminal.
9. Make sure you have a `.env` file in the same directory as `app.js`. Use this file to store the sender address and contract address and use it in the `app.js`. 
10. Then run `node app.js` (or `nodemon app.js`) and click on http://localhost:3000
11. Enjoy! ^_^