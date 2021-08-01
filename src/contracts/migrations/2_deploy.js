const Box = artifacts.require("myERC20");

module.exports = function (deployer) {
  
  const name = "AEY";
  const symbol = "AEY";
  const initialSupply = 10000;
  deployer.deploy(Box,name,symbol,initialSupply);
};