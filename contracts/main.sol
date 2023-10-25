// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract TellonymContract {
    address public owner;
    string[] public tells;

    constructor() {
        owner = msg.sender;
    }

    function addTell(string memory tell) public {
        tells.push(tell);
    }

    function getTells() public view returns (string[] memory) {
        return tells;
    }

    function removeTell(string memory tell) public {
        for (uint i = 0; i < tells.length; i++) {
            if (keccak256(abi.encodePacked(tells[i])) == keccak256(abi.encodePacked(tell))) {
                // Found a matching tell, remove it by shifting the array
                for (uint j = i; j < tells.length - 1; j++) {
                    tells[j] = tells[j + 1];
                }
                // Reduce the array length by 1
                tells.pop();
                break;
            }
        }
    }
}
