const TellonymContract = artifacts.require("TellonymContract");

module.exports = async function(callback) {
  const contractInstance = await TellonymContract.deployed();
  const blockNumber = 4565829; // Replace with the block number you desire

  const result = await contractInstance.getTells({ from: web3.eth.accounts[0], block: blockNumber });

  // Process the result
  console.log(result);

  callback();
};
