const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage).then(async (instance) => {
    console.log("Contract Address:", instance.address);
    const abi = instance.abi;
    console.log("Contract ABI:");
    // console.log(abi, null, 2);
    console.log(abi);
  });
};
