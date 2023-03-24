// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.16;

import "https://github.com/UMAprotocol/protocol/blob/7a93650a7494eaee83756382a18ecf11314499cf/packages/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol";

// ***************************************
// *    Minimum Viable OOV3 Consumer *
// ***************************************

contract OOConsumerV3 {
    // Create an Optimistic Oracle V3 instance at the deployed address on Görli.
    OptimisticOracleV3Interface oov3;

    struct AssertionRequest {
        bytes32 assertionId;
        bytes assertedClaim;
        address requester;
        address oracle;
    }

    mapping(uint => AssertionRequest) public assertionRequests;

    event truthAsserted(
        uint assertId,
        bytes32 assertionID,
        bytes assertedClaim,
        uint256 timestamp
    );

    // get the address of the chain we are interacting on
    constructor(address ooContractAddress) {
        oov3 = OptimisticOracleV3Interface(ooContractAddress);
    }

    // Asserted claim. This is some truth statement about the world and can be verified by the network of disputers.
    // bytes public assertedClaim =
    //     bytes("Argentina won the 2022 Fifa world cup in Qatar");
    // Assert the truth against the Optimistic Asserter. This uses the assertion with defaults method which defaults
    // all values, such as a) challenge window to 120 seconds (2 mins), b) identifier to ASSERT_TRUTH, c) bond currency
    //  to USDC and c) and default bond size to 0 (which means we dont need to worry about approvals in this example).
    function assertTruth(
        uint assertId,
        bytes memory assertedClaim,
        address requester
    ) public returns (bytes32 assertionId) {
        assertionId = oov3.assertTruthWithDefaults(
            assertedClaim,
            address(this)
        );

        assertionRequests[assertId] = AssertionRequest(
            assertionId,
            assertedClaim,
            requester,
            msg.sender
        );

        emit truthAsserted(
            assertId,
            assertionId,
            assertedClaim,
            block.timestamp
        );
    }

    // Settle the assertion, if it has not been disputed and it has passed the challenge window, and return the result.
    // result
    function settleAndGetAssertionResult(uint assertId) public returns (bool) {
        AssertionRequest storage _assertion = assertionRequests[assertId];
        return oov3.settleAndGetAssertionResult(_assertion.assertionId);
    }

    // Just return the assertion result. Can only be called once the assertion has been settled.
    function getAssertionResult(uint assertId) public view returns (bool) {
        AssertionRequest storage _assertion = assertionRequests[assertId];
        return oov3.getAssertionResult(_assertion.assertionId);
    }

    // Return the full assertion object contain all information associated with the assertion. Can be called any time.
    function getAssertion(
        uint assertId
    ) public view returns (OptimisticOracleV3Interface.Assertion memory) {
        AssertionRequest storage _assertion = assertionRequests[assertId];
        return oov3.getAssertion(_assertion.assertionId);
    }
}
