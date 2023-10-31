require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const {Web3} = require('web3');
const app = express();
const ethereumNodeUrl = "https://sepolia.infura.io/v3/ae97616284604034b1f25fc5bda9e253";
// const ethereumNodeUrl = "https://sepolia.infura.io/v3/3dadb3f57b2644588d8441dcacf48308";


const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));

const contractAddress = '0x66C059435786a88E8df5E8f967c5660a1736E3B2';
const contractAbi=[
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    payable: undefined,
    signature: 'constructor'
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

async function loadTells() {
  const tells = await contractInstance.methods.getTells().call();
  return tells;
}

app.get("/", async function (req, res) {
    
  tells = await loadTells();

    res.render("index", { tells1: tells });
});

app.post("/", async function (req, res) {
   

    const tell = req.body.newTell;
    await contractInstance.methods.addTell(tell).send({ from: senderAddress });

    tells = await loadTells();
        console.log("Tell added successfully");
        // tells.push(tell);
        res.redirect("/");
});


app.post("/delete", async function (req, res) {
    
        console.log("Tell deleted" );
        const tellToDelete = req.body.tellToDelete;
    await contractInstance.methods.removeTell(tellToDelete).send({ from: senderAddress });
    tells = await loadTells();
        // tells = tells.filter(t => t !== tell);
        res.redirect("/");
});


app.listen(3000, function () {
    console.log("Confessions by Champs 4 Grabs OUT at http://localhost:3000 !");
});
