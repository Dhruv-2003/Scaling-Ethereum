// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.16;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract APIOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    struct APIRequest {
        Chainlink.Request req;
        uint requestId;
        uint result;
    }

    uint public totalRequests;

    mapping(uint => APIRequest) public apiRequests;

    event buildRequest(string jobId, uint timeStamp);

    // By Client
    function buildAPIrequest(string memory jobId) public {
        emit buildRequest(jobId, block.timestamp);
    }

    // By Oracle
    function completeRequestBuild() public {}

    // By Client
    function requestData() public {}
}
