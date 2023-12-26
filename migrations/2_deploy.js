const TellonymContract = artifacts.require("TellonymContract");//name of the Solidity contract

module.exports = function(deployer) {
  deployer.deploy(TellonymContract).then(async (instance) => {
    // console.log("Contract Address:", instance.address);
    const abi = instance.abi;
    // console.log("Contract ABI:");
    // console.log(abi, null, 2);
  });
};
