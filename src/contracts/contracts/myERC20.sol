// contracts/myERC20.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//https://docs.openzeppelin.com/contracts/4.x/access-control

contract myERC20 is ERC20, AccessControl {

 // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){
          // Grant the minter role to a specified account
        _setupRole(MINTER_ROLE, msg.sender);
    }
   
    function mint(address to, uint256 amount) public {
        // Check that the calling account has the minter role
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(to, amount);
    }
    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }
}
