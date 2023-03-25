// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.16;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract APIOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;
}
