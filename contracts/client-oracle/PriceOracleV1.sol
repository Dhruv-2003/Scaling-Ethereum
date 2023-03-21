// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract PriceOracleV1 {
    mapping(address => uint) public pricePair;

    //  Need to put up restrictions
    function setLatestPrice(address pairAddress, uint256 _price) public {}

    //  Get the latest Price
    function getLatestPrice(address pairAddress) public view returns (uint) {
        return pricePair[pairAddress];
    }
}
