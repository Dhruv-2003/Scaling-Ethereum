const BridgeWallet = `0x62C43323447899acb61C18181e34168903E033Bf`;
// addresses of the deployed contracts
const OracleContractAddress = `0xa197690c527C4015e557185E42997d65348fD377`; //deployed on sepolia testnet
const ConsumerContractAddress = `0xC7803Ea35615f9ebCa019276AE5290D9E0616e48`; // deployed on goerli testnet

const OracleContractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "claim",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "assertTruth",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "claim",
        type: "bytes",
      },
    ],
    name: "assertTruthWithDefaults",
    outputs: [
      {
        internalType: "uint256",
        name: "assertId",
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
        name: "assertId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "assertionId",
        type: "bytes32",
      },
    ],
    name: "setAssertionId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "assertResult",
        type: "bool",
      },
    ],
    name: "setAssertResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
    ],
    name: "settleAssertion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "settleRequest",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "assertionRequests",
    outputs: [
      {
        internalType: "bytes32",
        name: "assertionId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "assertedClaim",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
      {
        internalType: "enum OptimisticOracleV3.Status",
        name: "currentStatus",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
    ],
    name: "getAssertion",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "assertionId",
            type: "bytes32",
          },
          {
            internalType: "bytes",
            name: "assertedClaim",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "requester",
            type: "address",
          },
          {
            internalType: "bool",
            name: "result",
            type: "bool",
          },
          {
            internalType: "enum OptimisticOracleV3.Status",
            name: "currentStatus",
            type: "uint8",
          },
        ],
        internalType: "struct OptimisticOracleV3.AssertionRequest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
    ],
    name: "getAssertionResult",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssertions",
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
];

const ConsumerContractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "ooContractAddress",
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
        indexed: false,
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "assertionID",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "assertedClaim",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "truthAsserted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "assertedClaim",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
    ],
    name: "assertTruth",
    outputs: [
      {
        internalType: "bytes32",
        name: "assertionId",
        type: "bytes32",
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
    name: "assertionRequests",
    outputs: [
      {
        internalType: "bytes32",
        name: "assertionId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "assertedClaim",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        internalType: "address",
        name: "oracle",
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
        name: "assertId",
        type: "uint256",
      },
    ],
    name: "getAssertion",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bool",
                name: "arbitrateViaEscalationManager",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "discardOracle",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "validateDisputers",
                type: "bool",
              },
              {
                internalType: "address",
                name: "assertingCaller",
                type: "address",
              },
              {
                internalType: "address",
                name: "escalationManager",
                type: "address",
              },
            ],
            internalType:
              "struct OptimisticOracleV3Interface.EscalationManagerSettings",
            name: "escalationManagerSettings",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "asserter",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "assertionTime",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "settled",
            type: "bool",
          },
          {
            internalType: "contract IERC20",
            name: "currency",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "expirationTime",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "settlementResolution",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "domainId",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "identifier",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "bond",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "callbackRecipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "disputer",
            type: "address",
          },
        ],
        internalType: "struct OptimisticOracleV3Interface.Assertion",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
    ],
    name: "getAssertionResult",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assertId",
        type: "uint256",
      },
    ],
    name: "settleAndGetAssertionResult",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
