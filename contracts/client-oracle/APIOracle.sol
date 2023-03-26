// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.16;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract APIOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    struct APIRequest {
        Chainlink.Request req;
        bytes32 requestId;
        uint result;
    }

    mapping(string => Chainlink.Request) public reqBuilds;

    uint public totalRequests;

    mapping(uint => APIRequest) public apiRequests;

    event buildRequest(string jobId, uint timeStamp);

    event requestSent(Chainlink.Request req, uint apiId, uint timeStamp);

    function buildAPIRequest(
        string memory jobId
    ) public view returns (Chainlink.Request memory req) {
        // require(reqBuilds);
        req = reqBuilds[jobId];
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
    function sendRequest(
        Chainlink.Request memory req
    ) public payable returns (uint apiId) {
        apiId = totalRequests;

        apiRequests[apiId] = APIRequest(req, 0, 0);
        totalRequests += 1;

        emit requestSent(req, apiId, block.timestamp);
    }

    // By Oracle
    function setRequestData(uint apiId, bytes32 memory requestId) public {
        apiRequests[apiId].requestId = requestId;
    }

    // By Oracle
    function fulfillRequest(uint apiId, uint result) public {
        apiRequests[apiId].result = result;
    }

    // by Client
    function getRequestData(
        uint apiId
    ) public view returns (APIRequest memory _request) {
        _request = apiRequests[apiId];
    }

    // by Client
    function getRequestResult(uint apiId) public view returns (uint) {
        return apiRequests[apiId].result;
    }
}
