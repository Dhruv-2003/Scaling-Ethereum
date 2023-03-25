// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/// Only for Single API call
contract APIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    struct APIRequest {
        Chainlink.Request req;
        uint requestId;
        uint result;
    }

    mapping(uint => APIRequest) public apiRequests;

    uint256 private fee;

    /**
     * @notice Initialize the link token and target oracle
     *
     * Sepolia Testnet details:
     * Link Token: 0x779877A7B0D9E8603169DdbD7836e478b4624789
     * Oracle: 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD (Chainlink DevRel)
     * jobId: ca98366cc7314957b8c012c72f05aeeb
     *
     */
    constructor(
        address tokenAddress,
        address oracleAddress,
        uint256 _fee
    ) ConfirmedOwner(msg.sender) {
        setChainlinkToken(tokenAddress);
        setChainlinkOracle(oracleAddress);

        // fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
        fee = _fee;
    }

    function buildRequest(
        uint apiId,
        string memory jobId
    ) public returns (Chainlink.Request memory req) {
        req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        apiRequests[apiId] = APIRequest(req, 0, 0);
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestData(
        uint apiId,
        Chainlink.Request memory req
    ) public returns (bytes32 requestId) {
        // Set the URL to perform the GET request on
        // req.add("get", apiLink);
        // req.add("path", apiPath); // Chainlink nodes 1.0.0 and later support this format

        // // Multiply the result by 1000000000000000000 to remove decimals
        // int256 timesAmount = 10 ** 18;
        // req.addInt("times", timesAmount);

        // Sends the request
        requestId = sendChainlinkRequest(req, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(
        bytes32 _requestId,
        uint256 result
    ) public recordChainlinkFulfillment(_requestId) {}

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
