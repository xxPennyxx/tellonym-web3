const TellonymContract = artifacts.require("TellonymContract");

module.exports = async function(callback) {
  try {
    const contractInstance = await TellonymContract.deployed();
    const senderAddress = web3.eth.accounts[0]; // Replace with the sender's address
    const privateKey = process.env.PVT_KEY; // Replace with the sender's private key
    const tell = "Jhye Richardson is soooo hot!!!!"; // Replace with the tell you want to add
    const blockNumber = 4565829; // Replace with the block number you desire

    // Estimate the gas required for the transaction
    const gasLimit = await contractInstance.addTell.estimateGas(tell, { from: senderAddress, block: blockNumber });

    // Create a transaction object
    const txObject = {
      from: senderAddress,
      gas: gasLimit,
      block: blockNumber,
    };

    // Send the transaction to add the tell
    await contractInstance.addTell(tell, txObject);

    console.log(`Tell added successfully: ${tell}`);
  } catch (error) {
    console.error("Error:", error);
  }

  callback();
};
