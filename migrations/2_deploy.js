const TellonymContract = artifacts.require("TellonymContract");

module.exports = function(deployer) {
  deployer.deploy(TellonymContract);
};