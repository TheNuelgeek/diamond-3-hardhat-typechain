// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Test3Facet{
    function add(uint a, uint b)external pure {
        a + b;
    }

    function minus(uint a, uint b)external pure {
        a - b;
    }
}