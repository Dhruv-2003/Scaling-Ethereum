// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.14;

import "https://github.com/UMAprotocol/protocol/blob/7a93650a7494eaee83756382a18ecf11314499cf/packages/core/contracts/optimistic-oracle-v2/interfaces/OptimisticOracleV2Interface.sol";

// get the Contract Address from the info : https://docs.uma.xyz/resources/network-addresses
contract OO_GettingStarted {
    // Create an Optimistic oracle instance at the deployed address on Görli.
    // Check the address on Optimism Goreli
    OptimisticOracleV2Interface oo;

    uint256 requestTime = 0; // Store the request time so we can re-use it later.

    constructor(address ooContractAddress) {
        oo = OptimisticOracleV2Interface(ooContractAddress);
    }

    // Submit a data request to the Optimistic oracle.
    function requestData() public {
        bytes32 identifier = bytes32("YES_OR_NO_QUERY");

        requestTime = block.timestamp; // Set the request time to the current block time.
        IERC20 bondCurrency = IERC20(
            0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6
        ); // Use Görli WETH as the bond currency.

        bytes ancillaryData = bytes(
            "Q:Did the temperature on the 25th of July 2022 in Manhattan NY exceed 35c? A:1 for yes. 0 for no."
        );

        uint256 reward = 0; // Set the reward to 0 (so we dont have to fund it from this contract).

        // Now, make the price request to the Optimistic oracle and set the liveness to 30 so it will settle quickly.
        oo.requestPrice(
            identifier,
            requestTime,
            ancillaryData,
            bondCurrency,
            reward
        );
        oo.setCustomLiveness(identifier, requestTime, ancillaryData, 30);
    }

    // Settle the request once it's gone through the liveness period of 30 seconds. This acts the finalize the voted on price.
    // In a real world use of the Optimistic Oracle this should be longer to give time to disputers to catch bat price proposals.
    function settleRequest() public {
        oo.settle(address(this), identifier, requestTime, ancillaryData);
    }

    // Fetch the resolved price from the Optimistic Oracle that was settled.
    function getSettledData() public view returns (int256) {
        return
            oo
                .getRequest(
                    address(this),
                    identifier,
                    requestTime,
                    ancillaryData
                )
                .resolvedPrice;
    }
}
