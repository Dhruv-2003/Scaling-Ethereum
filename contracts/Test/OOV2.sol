// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.14;

// import "https://github.com/UMAprotocol/protocol/blob/7a93650a7494eaee83756382a18ecf11314499cf/packages/core/contracts/optimistic-oracle-v2/interfaces/OptimisticOracleV2Interface.sol";

// *************************************
// *   Minimum Viable OO Intergration  *
// *************************************

// This contract shows how to get up and running as quickly as posible with UMA's Optimistic Oracle.
// We make a simple price request to the OO and return it to the user.

import "../client-oracle/OptimisticOracleV2.sol";


contract OOV2Test {
    // Create an Optimistic oracle instance at the deployed address on Görli.
    OptimisticOracleV2 oo = OptimisticOracleV2();

    // Use the yes no idetifier to ask arbitary questions, such as the weather on a particular day.
    bytes32 identifier = bytes32("YES_OR_NO_QUERY");

    // Post the question in ancillary data. Note that this is a simplified form of ancillry data to work as an example. A real
    // world prodition market would use something slightly more complex and would need to conform to a more robust structure.
    bytes ancillaryData =
        bytes(
            "Q:Did the temperature on the 25th of July 2022 in Manhattan NY exceed 35c? A:1 for yes. 0 for no."
        );

    uint256 requestTime = 0; // Store the request time so we can re-use it later

    uint requestId;

    // Submit a data request to the Optimistic oracle.
    function requestData() public {
        requestTime = block.timestamp; // Set the request time to the current block time.
        address bondCurrency = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6; // Use Görli WETH as the bond currency.
        uint256 reward = 0; // Set the reward to 0 (so we dont have to fund it from this contract).

        requestId = oo.requestData(
            identifier,
            ancillaryData,
            bondCurrency,
            reward,
            30
        );
    }

    // Settle the request once it's gone through the liveness period of 30 seconds. This acts the finalize the voted on price.
    // In a real world use of the Optimistic Oracle this should be longer to give time to disputers to catch bat price proposals.
    function settleRequest() public {
        oo.settleRequest(requestId);
    }

    // Fetch the resolved price from the Optimistic Oracle that was settled.
    function getSettledData() public view returns (int256) {
        return
            oo
                .getRequestResult(
                    requestId
                );
    }
}
