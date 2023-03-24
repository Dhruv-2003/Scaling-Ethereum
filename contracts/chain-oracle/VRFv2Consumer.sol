// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

contract VRFv2DirectFundingConsumer is
    VRFV2WrapperConsumerBase,
    ConfirmedOwner
{
    event RequestSent(
        uint256 requestId,
        uint vrfID,
        uint32 numWords,
        uint paid
    );

    event RequestFulfilled(
        uint256 vrfId,
        uint256 requestId,
        uint256[] randomWords,
        uint256 payment
    );

    struct VRFRequests {
        uint256 requestId;
        uint256 vrfId;
        uint256 paid; // amount paid in link
        bool fulfilled; // whether the request has been successfully fulfilled
        uint256[] randomWords;
        uint32 numWords;
    }

    // requestId ->  VRFRequests
    mapping(uint256 => VRFRequests) public s_requests;

    // vrfId -> VRFRequests
    mapping(uint256 => VRFRequests) public vrf_requests;

    // past requests Id.
    uint256[] public requestIds;


    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 100000;

    // Address LINK - hardcoded for Sepolia
    // address linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

    // address WRAPPER - hardcoded for Sepolia
    // address wrapperAddress = 0xab18414CD93297B0d12ac29E63Ca20f515b3DB46;

    address linkAddress;

    constructor(
        address _linkAddress,
        address wrapperAddress
    )
        ConfirmedOwner(msg.sender)
        VRFV2WrapperConsumerBase(_linkAddress, wrapperAddress)
    {
        linkAddress = _linkAddress;
    }

    /// numWords = 2 
    /// requestConfirmations = 3
    function requestRandomWords(
        uint vrfId,
        uint32 numWords,
        uint16 requestConfirmations
    ) external onlyOwner returns (uint256 requestId) {
        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        s_requests[requestId] = VRFRequests({
            requestId: requestId,
            vrfId: vrfId,
            paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            randomWords: new uint256[](0),
            fulfilled: false,
            numWords: numWords
        });
        uint paidAmount = VRF_V2_WRAPPER.calculateRequestPrice(
            callbackGasLimit
        );

        vrf_requests[vrfId] = VRFRequests({
            requestId: requestId,
            vrfId: vrfId,
            paid: paidAmount,
            randomWords: new uint256[](0),
            fulfilled: false,
            numWords: numWords
        });

        requestIds.push(requestId);

        emit RequestSent(requestId, vrfId, numWords, paidAmount);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].paid > 0, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;

        uint vrfId = s_requests[_requestId].vrfId;

        vrf_requests[vrfId].fulfilled = true;
        vrf_requests[vrfId].randomWords = _randomWords;

        emit RequestFulfilled(
            vrfId,
            _requestId,
            _randomWords,
            s_requests[_requestId].paid
        );
    }

    function getRequestStatus(
        uint256 _requestId
    )
        external
        view
        returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)
    {
        require(s_requests[_requestId].paid > 0, "request not found");
        VRFRequests memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords);
    }

    function getVRFStatus(
        uint _vrfId
    ) public view returns (VRFRequests memory) {
        return vrf_requests[_vrfId];
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
