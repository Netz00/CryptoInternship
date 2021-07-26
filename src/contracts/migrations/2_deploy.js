const Box = artifacts.require("GLDToken");

module.exports = function (deployer) {
  const initialSupply = 10000; //name of our token
  deployer.deploy(Box,initialSupply);
};
