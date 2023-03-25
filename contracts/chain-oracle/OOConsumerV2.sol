// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.14;

import "https://github.com/UMAprotocol/protocol/blob/7a93650a7494eaee83756382a18ecf11314499cf/packages/core/contracts/optimistic-oracle-v2/interfaces/OptimisticOracleV2Interface.sol";

// ***************************************
// *    Minimum Viable OOV2 Consumer *
// ***************************************

// get the Contract Address from the info : https://docs.uma.xyz/resources/network-addresses
contract OOConsumerV2 {
    // Create an Optimistic oracle instance at the deployed address on Görli.
    // Check the address on Optimism Goreli
    OptimisticOracleV2Interface oo;

    // Store the Req data
    struct Request {
        bytes32 identifier;
        bytes ancillaryData;
        address bondCurrencyAddress;
        uint256 reward;
        uint livenessTime;
        uint256 requestTime;
        address requester;
        address oracle;
    }

    mapping(uint => Request) public ooRequests;

    event requestCreated(
        uint256 requestId,
        bytes32 identifier,
        bytes ancillaryData,
        uint256 requestTime,
        address requester
    );

    event requestSettled(uint256 requestId, uint256 timestamp);

    // get the address of the chain we are interacting on
    constructor(address ooContractAddress) {
        oo = OptimisticOracleV2Interface(ooContractAddress);
    }

    // Submit a data request to the Optimistic oracle.
    /**
    * bytes identifier = bytes("YES_OR_NO_QUERY")
    * identifier can be found here: https://docs.uma.xyz/resources/approved-price-identifiers
    * 
        bytes ancillaryData = bytes(
            "Q:Did the temperature on the 25th of July 2022 in Manhattan NY exceed 35c? A:1 for yes. 0 for no."
        );
    */
    function requestData(
        uint256 requestId,
        bytes32 identifier,
        bytes memory ancillaryData,
        address bondCurrencyAddress,
        uint256 rewardAmount,
        uint livenessTime,
        address requester
    ) public {
        IERC20 bondCurrency = IERC20(bondCurrencyAddress); // Use Görli WETH as the bond currency

        uint256 requestTime = 0; // Store the request time so we can re-use it later.

        // Now, make the price request to the Optimistic oracle and set the liveness to 30 so it will settle quickly.
        oo.requestPrice(
            identifier,
            requestTime,
            ancillaryData,
            bondCurrency,
            rewardAmount
        );

        oo.setCustomLiveness(
            identifier,
            requestTime,
            ancillaryData,
            livenessTime
        );

        ooRequests[requestId] = Request(
            identifier,
            ancillaryData,
            bondCurrencyAddress,
            rewardAmount,
            livenessTime,
            requestTime,
            requester,
            msg.sender
        );

        emit requestCreated(
            requestId,
            identifier,
            ancillaryData,
            requestTime,
            requester
        );
    }

    // Settle the request once it's gone through the liveness period of 30 seconds. This acts the finalize the voted on price.
    // In a real world use of the Optimistic Oracle this should be longer to give time to disputers to catch bat price proposals.
    function settleRequest(uint requestId) public {
        Request memory _request = ooRequests[requestId];
        oo.settle(
            address(this),
            _request.identifier,
            _request.requestTime,
            _request.ancillaryData
        );

        emit requestSettled(requestId, block.timestamp);
    }

    // Fetch the resolved price from the Optimistic Oracle that was settled.
    function getSettledData(uint requestId) public view returns (int256) {
        Request memory _request = ooRequests[requestId];
        return
            oo
                .getRequest(
                    address(this),
                    _request.identifier,
                    _request.requestTime,
                    _request.ancillaryData
                )
                .resolvedPrice;
    }

    function getRequest(uint requestId) public view returns (Request memory) {
        return ooRequests[requestId];
    }

    /// for all other info , get the info directly from the OO contract
}
