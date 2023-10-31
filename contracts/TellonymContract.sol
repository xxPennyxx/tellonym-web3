// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TellonymContract {
    address public owner;
    string[] public tells;

    constructor() public {
        owner = msg.sender;
        tells = new string[](0);

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
                for (uint j = i; j < tells.length - 1; j++) {
                    tells[j] = tells[j + 1];
                }
                tells.pop();
                break;
            }
        }
    }
}
