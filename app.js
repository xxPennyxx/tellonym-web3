require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const {Web3} = require('web3');

// const simpleStorage=require("./build/contracts/SimpleStorage.json") //not required ig
const tellonymContract=require("./build/contracts/TellonymContract.json")
const app = express();//Init your express app

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));//connect to the local Ganache blockchain instead of the actual blockchain
const contractAddress = process.env.CONTRACT_ADDRESS ;//Import your contract address from .env
const contractAbi = tellonymContract.abi;

const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);//Init the contract instance using its address and ABI

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
  // console.log(tells);
    res.render("index", { tells1: tells });
});

app.post("/", async function (req, res) {
  let tell = req.body.newTell;
  console.log(tell);

  if (typeof tell !== 'string' || tell.trim() === '') {
    console.error("Invalid tell. Please provide a non-empty string.");
    res.redirect("/");
    return;
  }

  try {
    const result = await contractInstance.methods.addTell(tell).send({ from: senderAddress, gas:6721975 });
    console.log("Transaction result:", result);
    console.log("Tell added successfully");
  } catch (error) {
      console.error("Error adding tell:", error.message);
  }

  tells = await loadTells();
  res.redirect("/");
});



app.post("/delete", async function (req, res) {
    
        console.log("Tell deleted" );
        const tellToDelete = req.body.tellToDelete;
    await contractInstance.methods.removeTell(tellToDelete).send({ from: senderAddress, gas:6721975 });
    tells = await loadTells();
        // tells = tells.filter(t => t !== tell);
        res.redirect("/");
});


app.listen(3000, function () {
    console.log("Confessions by Champs 4 Grabs OUT at http://localhost:3000 !");
});
