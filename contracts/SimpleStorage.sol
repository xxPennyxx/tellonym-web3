// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    address public owner;
    uint256 public storedValue;

    constructor() {
        owner = msg.sender;
    }

    function set(uint256 newValue) public {
        require(msg.sender == owner, "Only the owner can set the value");
        storedValue = newValue;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }
}
