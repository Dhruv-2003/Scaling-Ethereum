// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

// Deployed on the new chain
contract PriceOracleV1 {
    mapping(address => uint) public pricePairs;

    event requestPrice(address pricePair);

    function requestPairPrice(address pricePair) public {
        emit requestPrice(pricePair);
    }

    //Need to put up restrictions
    function setLatestPrice(address pairAddress, uint256 _price) public {
        pricePairs[pairAddress] = _price;
    }

    //Get the latest Price
    function getLatestPrice(address pairAddress) public view returns (uint) {
        return pricePairs[pairAddress];
    }
}
