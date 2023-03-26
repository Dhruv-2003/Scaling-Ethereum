// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

/// Maybe we can add extra data ,like proposed Result , settled Result
contract OptimisticOracleV2 {
    uint256 public totalOORequests = 1;

    enum Status {
        Requested,
        SettleRequested,
        Settled
    }

    // Store the Req data
    struct ooRequest {
        bytes32 identifier;
        bytes ancillaryData;
        address bondCurrencyAddress;
        uint256 reward;
        uint livenessTime;
        uint256 requestTime;
        address requester;
        int256 result;
        Status currentStatus;
    }

    mapping(uint => ooRequest) public ooRequests;

    event requestCreated(
        uint256 requestId,
        bytes32 identifier,
        bytes ancillaryData,
        uint256 requestTime,
        address requester
    );

    event settleOORequest(uint256 requestId, uint256 timestamp);

    event resultAdded(uint256 requestId, int result, uint256 timestamp);

    // We can hardCode bond , reward & time to avoide complications
    function requestData(
        bytes32 identifier,
        bytes memory ancillaryData,
        address bondCurrencyAddress,
        uint256 rewardAmount,
        uint livenessTime
    ) public returns (uint requestId) {
        requestId = totalOORequests;
        ooRequests[requestId] = ooRequest(
            identifier,
            ancillaryData,
            bondCurrencyAddress,
            rewardAmount,
            livenessTime,
            block.timestamp,
            msg.sender,
            0,
            Status.Requested
        );

        totalOORequests +=1;

        emit requestCreated(
            requestId,
            identifier,
            ancillaryData,
            block.timestamp,
            msg.sender
        );
    }

    // called by the request creator
    function settleRequest(uint requestId) public {
        ooRequests[requestId].currentStatus = Status.SettleRequested;
        emit settleOORequest(requestId, block.timestamp);
    }

    // called by the Oracle
    function setRequestResult(uint requestId, int result) public {
        ooRequest storage _request = ooRequests[requestId];
        _request.result = result;
        _request.currentStatus = Status.Settled;
        emit resultAdded(requestId, result, block.timestamp);
    }

    function getRequestResult(uint requestId) public view returns(int) {
        return ooRequests[requestId].result;
    }

    function getRequest(uint requestId) public view returns(ooRequest memory) {
        return ooRequests[requestId];
    }
    

}
