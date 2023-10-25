const express = require("express");
const bodyParser = require("body-parser");
const {Web3} = require('web3');
const app = express();
const blockNumber=7;

const ethereumNodeUrl = "https://sepolia.infura.io/v3/ae97616284604034b1f25fc5bda9e253";
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));

const contractAddress = '0xf67f80a1b9d2b25d1040FBe162188394E4F8ccDa';

const contractAbi=
[
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

const senderAddress = '0x45d828bD8a1A712C09Ec6dac21fF39cac97F470D'; 
// const senderAddress='0x18c8a29785e2F12F68FCBfebCFC63dFE8fb17159';
const privateKey = 'afddd6dca855fb5161ba4d64678652e964ebde43301f55abaf685d300a6260f4'; // Replace with your private key

let tells=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async function (req, res) {
    try {
        const result = await contractInstance.methods.getTells().call({blockNumber});
        tells = result;
        res.render("index", { tells1: tells });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Couldn't get tells" });
    }

    // res.render("index", { tells1: tells });
});

app.post("/", async function (req, res) {
    try {
        const tell = req.body.newTell;
        // const gasLimit = 5000000; 
        const gasLimit = await contractInstance.methods.addTell(tell).estimateGas({ from: senderAddress });
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
});


app.post("/delete", async function (req, res) {
    try {
        const tell = req.body.tellToDelete;
        const gasLimit = await contractInstance.methods.removeTell(tell).estimateGas({ from: senderAddress });

        // await contractInstance.methods.removeTell(tell).send({ from: senderAddress, gas:gasLimit });

        console.log("Tell deleted" );
        tells = tells.filter(t => t !== tell);
        res.redirect("/");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Tell deletion failed" });
    }
});


app.listen(3000, function () {
    console.log("Confessions by Champs 4 Grabs OUT at http://localhost:3000 !");
});
