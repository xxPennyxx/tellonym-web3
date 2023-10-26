require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const {Web3} = require('web3');
const app = express();
const blockNumber=4565829;


const ethereumNodeUrl = "https://sepolia.infura.io/v3/ae97616284604034b1f25fc5bda9e253";
// const ethereumNodeUrl = "https://sepolia.infura.io/v3/3dadb3f57b2644588d8441dcacf48308";


const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));

const contractAddress = '0x91c77d4A2Fcc25a73cE5F37C23d9C521C83d98CD';
const contractAbi=[
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    payable: undefined
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x8da5cb5b'
  },
  {
    inputs: [ [Object] ],
    name: 'tells',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xc0ad3b7f'
  },
  {
    inputs: [ [Object] ],
    name: 'addTell',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x30fc7d58'
  },
  {
    inputs: [],
    name: 'getTells',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x48b6725c'
  },
  {
    inputs: [ [Object] ],
    name: 'removeTell',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x7c0fe400'
  }
]
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

const senderAddress = process.env.SENDER_ADDRESS; 
const privateKey = process.env.PVT_KEY; // Replace with your private key

let tells=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async function (req, res) {
    try {
      const blockData = await web3.eth.getBlock(blockNumber);
        if (blockData){
          // const result = await contractInstance.methods.getTells().call({},blockData.number);
            const result = await contractInstance.methods.getTells().call({ from: web3.eth.accounts[0], block: blockNumber });

        tells = result;
        res.render("index", { tells1: tells });


        }
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Couldn't get tells" });
    }

    // res.render("index", { tells1: tells });
});

app.post("/", async function (req, res) {
    try {
        const tell = req.body.newTell;
        const gasLimit = await contractInstance.methods.addTell(tell).estimateGas({ from: senderAddress, to: contractAddress, value: web3.utils.toWei('0', 'ether') });
        await contractInstance.methods.addTell(tell).send({
          from: senderAddress,
          gas: gasLimit, // Set the gas limit here
      });

        console.log("Tell added successfully");
        tells.push(tell);
        res.redirect("/");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Tell addition failed" });
    }


    // const tell = req.body.newTell;
    //     console.log("Tell added successfully");
    //     tells.push(tell);
    //     res.redirect("/");
});


app.post("/delete", async function (req, res) {
    try {
        const tell = req.body.tellToDelete;
        const gasLimit = await contractInstance.methods.removeTell(tell).estimateGas({ from: senderAddress, to: contractAddress, value: web3.utils.toWei('0', 'ether') });
        console.log("Tell deleted" );
        tells = tells.filter(t => t !== tell);
        res.redirect("/");
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Tell deletion failed" });
    }

    // const tell = req.body.tellToDelete;
    //     console.log("Tell deleted" );
    //     tells = tells.filter(t => t !== tell);
    //     res.redirect("/");
});


app.listen(3000, function () {
    console.log("Confessions by Champs 4 Grabs OUT at http://localhost:3000 !");
});
