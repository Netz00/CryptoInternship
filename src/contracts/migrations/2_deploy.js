const Box = artifacts.require("myERC20");

module.exports = function (deployer, network, accounts) {
  const name = "AEY";
  const symbol = "AEY";
  const maximum_supply = "1000000000000000000000000";
  deployer.deploy(Box, name, symbol, maximum_supply);
};
