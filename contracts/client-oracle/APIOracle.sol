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

    mapping(string => Chainlink.Request) public reqBuilds;

    uint public totalRequests;

    mapping(uint => APIRequest) public apiRequests;

    event buildRequest(string jobId, uint timeStamp);

    function buildAPIRequest(
        string memory jobId
    ) public view returns (Chainlink.Request memory req) {
        // require(reqBuilds);
        req = reqBuilds(jobId);
    }

    // in Case there is no Current req build is there, called by Client
    function requestBuildReq(string memory jobId) public {
        emit buildRequest(jobId, block.timestamp);
    }

    // By Oracle
    function completeRequestBuild(
        string memory jobId,
        Chainlink.Request memory req
    ) public {
        reqBuilds[jobId] = req;
    }

    // By Client
    function sendRequest(Chainlink.Request memory req) public {}

    // By Oracle
    function fulfillRequest() public {}

    function getRequestData() public {}
}
