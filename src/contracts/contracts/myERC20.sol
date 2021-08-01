// contracts/myERC20.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract myERC20 is ERC20{
    uint256 private initialSupply;
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) ERC20(_name, _symbol){
        initialSupply=_initialSupply;
        _mint(msg.sender, _initialSupply);
    }
}