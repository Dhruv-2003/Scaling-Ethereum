// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity ^0.8.16;

import "https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/optimistic-asserter/interfaces/OptimisticAsserterInterface.sol";

// *************************************
// *    Minimum Viable OA Integration  *
// *************************************

// This contract shows how to get up and running as quickly as possible with UMA's Optimistic Asserter.
// We make a simple data assertion about the real world and let the OA arbitrate the outcome.

import "./client-oracle/OptimisticOracleV3.sol";

contract OO_GettingStarted {
    // Create an Optimistic Asserter instance at the deployed address on Görli.
    OptimisticAsserterInterface oa = OptimisticOracleV3();

    // Asserted claim. This is some truth statement about the world and can be verified by the network of disputers.
    bytes public assertedClaim =
        bytes("Argentina won the 2022 Fifa world cup in Qatar");

    // Each assertion has an associated assertionID that uniquly identifies the assertion. We will store this here.
    bytes32 public assertionId;

    // Assert the truth against the Optimistic Asserter. This uses the assertion with defaults method which defaults
    // all values, such as a) challenge window to 120 seconds (2 mins), b) identifier to ASSERT_TRUTH, c) bond currency
    //  to USDC and c) and default bond size to 0 (which means we dont need to worry about approvals in this example).
    function assertTruth() public {
        assertionId = oa.assertTruthWithDefaults(assertedClaim);
    }

    // Settle the assertion, if it has not been disputed and it has passed the challenge window, and return the result.
    // result
    function settleResult() public {
        oa.settleAssertion(assertionId);
    }

    // Just return the assertion result. Can only be called once the assertion has been settled.
    function getAssertionResult() public view returns (bool) {
        return oa.getAssertionResult(assertionId);
    }

    // Return the full assertion object contain all information associated with the assertion. Can be called any time.
    // function getAssertion()
    //     public
    //     view
    //     returns (OptimisticAsserterInterface.Assertion memory)
    // {
    //     return oa.getAssertion(assertionId);
    // }
}
