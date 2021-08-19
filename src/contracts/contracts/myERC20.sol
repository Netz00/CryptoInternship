// contracts/myERC20.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//https://docs.openzeppelin.com/contracts/4.x/access-control

contract myERC20 is ERC20, AccessControl {
    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public _maximumSupply;

    constructor(
        string memory name,
        string memory symbol,
        uint256 maximumSupply
    ) ERC20(name, symbol) {
        // Grant the minter role to a specified account
        _setupRole(MINTER_ROLE, msg.sender);
        _maximumSupply = maximumSupply;
    }

    function mint(address to, uint256 amount) public {
        // Check that the calling account has the minter role
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(
            (totalSupply() + amount) <= _maximumSupply,
            "Maximum supply is reached"
        );
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }
}
