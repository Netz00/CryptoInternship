const Box = artifacts.require("myERC20");

module.exports = function (deployer) {
  
  const name = "AEY";
  const symbol = "AEY";
  deployer.deploy(Box,name,symbol);
};