// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/// the Address list can be found for the pair here at : https://docs.chain.link/data-feeds/price-feeds/addresses?network=optimism
contract PriceConsumerV3 {
    /**
     * Returns the latest price.
     */
    function getLatestPrice(
        address pricePairAddress
    ) public view returns (int) {
        // prettier-ignore
        ( /* uint80 roundID */,
            int price ,
          /*uint startedAt*/ ,
          /*uint timeStamp*/  ,
          /*uint80 answeredInRound*/
        ) = AggregatorV3Interface(pricePairAddress).latestRoundData();
        return price;
    }
}
