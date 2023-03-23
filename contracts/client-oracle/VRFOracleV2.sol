// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

// Need to add the Fee model
// Check the Conditions
contract VRFOracleV2 {
    enum Status {
        Requested,
        Fulfilled
    }

    struct VRFRequests {
        uint256 requestId;
        uint256 paid; // amount paid in link
        bool fulfilled; // whether the request has been successfully fulfilled
        uint256[] randomWords;
        uint numWords;
        Status currentStatus;
    }

    uint public totalVRFRequests = 1;

    mapping(uint => VRFRequests) public vrfRequests;

    event randomnessRequested(
        uint vrfId,
        uint numWords,
        uint requestConfirmations
    );

    event randomnessFulfilled(uint vrfId);

    // By Client
    function requestRandomness(
        uint numWords,
        uint requestConfirmations
    ) public payable returns (uint vrfId) {
        vrfId = totalVRFRequests;
        vrfRequests[vrfId].numWords = numWords;
        vrfRequests[vrfId].currentStatus = Status.Requested;
        totalVRFRequests += 1;
        emit randomnessRequested(vrfId, numWords, requestConfirmations);
    }

    // By Oracle
    function setRequestData(
        uint vrfId,
        uint requestId,
        uint paidAmount
    ) public {
        vrfRequests[vrfId].requestId = requestId;
        vrfRequests[vrfId].paid = paidAmount;
    }

    // By Oracle
    function fulfillRandomness(
        uint vrfId,
        uint256[] memory _randomWords
    ) public {
        vrfRequests[vrfId].randomWords = _randomWords;
        vrfRequests[vrfId].currentStatus = Status.Fulfilled;
    }

    function getRandomness(uint vrfId) public view returns (uint256[] memory) {
        return vrfRequests[vrfId].randomWords;
    }
}
