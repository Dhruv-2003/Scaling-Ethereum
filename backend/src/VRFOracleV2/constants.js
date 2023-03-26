const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const OracleContractAddress = `0x48749fde6370FBfc9a45C5EFB559253D72B7Cd53`; //deployed on sepolia testnet
const ConsumerContractAddress = `0x2A271E8aE4B553e1289B6e7A3747D6cc2feEA8dC`; // deployed on goerli testnet

const OracleContractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
    ],
    name: "randomnessFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numWords",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestConfirmations",
        type: "uint256",
      },
    ],
    name: "randomnessRequested",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_randomWords",
        type: "uint256[]",
      },
    ],
    name: "fulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
    ],
    name: "getRandomness",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "numWords",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requestConfirmations",
        type: "uint256",
      },
    ],
    name: "requestRandomness",
    outputs: [
      {
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paidAmount",
        type: "uint256",
      },
    ],
    name: "setRequestData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVRFRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vrfRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fulfilled",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "numWords",
        type: "uint256",
      },
      {
        internalType: "enum VRFOracleV2.Status",
        name: "currentStatus",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ConsumerContractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_linkAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "wrapperAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payment",
        type: "uint256",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vrfID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "numWords",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "getRequestStatus",
    outputs: [
      {
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fulfilled",
        type: "bool",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_vrfId",
        type: "uint256",
      },
    ],
    name: "getVRFStatus",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vrfId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "paid",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "fulfilled",
            type: "bool",
          },
          {
            internalType: "uint256[]",
            name: "randomWords",
            type: "uint256[]",
          },
          {
            internalType: "uint32",
            name: "numWords",
            type: "uint32",
          },
        ],
        internalType: "struct VRFv2DirectFundingConsumer.VRFRequests",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requestIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "numWords",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "requestConfirmations",
        type: "uint16",
      },
    ],
    name: "requestRandomWords",
    outputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "s_requests",
    outputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fulfilled",
        type: "bool",
      },
      {
        internalType: "uint32",
        name: "numWords",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vrf_requests",
    outputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vrfId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fulfilled",
        type: "bool",
      },
      {
        internalType: "uint32",
        name: "numWords",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
};
