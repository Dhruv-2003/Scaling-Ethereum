// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.16;

/// Add the conditions based on the status
/// Getter Requests
contract OptimisticOracleV3 {
    uint public totalAssertions;

    enum Status {
        Asserted,
        SettleRequested,
        Settled
    }

    struct AssertionRequest {
        bytes32 assertionId;
        bytes assertedClaim;
        address requester;
        bool result;
        Status currentStatus;
    }

    mapping(uint => AssertionRequest) public assertionRequests;

    event assertTruth(
        uint assertId,
        address requester,
        bytes claim,
        uint timestamp
    );

    event settleRequest(uint assertId, uint timestamp);

    function assertTruthWithDefaults(
        bytes memory claim
    ) public returns (uint assertId) {
        assertId = totalAssertions;
        assertionRequests[assertId] = AssertionRequest(
            "",
            claim,
            msg.sender,
            false,
            Status.Asserted
        );
        emit assertTruth(assertId, msg.sender, claim, block.timestamp);
    }

    // called by the Oracle
    function setAssertionId(uint assertId, bytes32 assertionId) public {
        assertionRequests[assertId].assertionId = assertionId;
    }

    // called by user/ client
    function requestSettlement(uint assertId) public {
        assertionRequests[assertId].currentStatus = Status.SettleRequested;

        emit settleRequest(assertId, block.timestamp);
    }

    // called by the oracle
    function setAssertResult(uint assertId, bool assertResult) public {
        assertionRequests[assertId].result = assertResult;
        assertionRequests[assertId].currentStatus = Status.Settled;
    }
}
