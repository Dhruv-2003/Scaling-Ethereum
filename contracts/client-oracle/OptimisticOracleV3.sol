// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.16;

/// Add the conditions based on the status
/// Getter Requests
contract OptimisticOracleV3 {
    uint public totalAssertions = 1;

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
        totalAssertions += 1;
        emit assertTruth(assertId, msg.sender, claim, block.timestamp);
    }

    // called by the Oracle
    function setAssertionId(uint assertId, bytes32 assertionId) public {
        assertionRequests[assertId].assertionId = assertionId;
    }

    // called by user/ client
    function settleAssertion(uint assertId) public {
        require(
            assertionRequests[assertId].currentStatus == Status.Asserted,
            "Not yet Asserted"
        );
        assertionRequests[assertId].currentStatus = Status.SettleRequested;

        emit settleRequest(assertId, block.timestamp);
    }

    // called by the oracle
    function setAssertResult(uint assertId, bool assertResult) public {
        require(
            assertionRequests[assertId].currentStatus == Status.SettleRequested,
            "Not yet requested"
        );
        assertionRequests[assertId].result = assertResult;
        assertionRequests[assertId].currentStatus = Status.Settled;
    }

    function getAssertionResult(uint assertId) public view returns (bool) {
        return assertionRequests[assertId].result;
    }

    function getAssertion(
        uint assertId
    ) public view returns (AssertionRequest memory) {
        return assertionRequests[assertId];
    }
}
