const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const PriceConsumerContractAddress = ``;  //deployed on sepolia testnet
const PriceOracleContractAddress = ``;    // deployes on mumbai testnet

const PriceConsumerContractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pricePairAddress",
        type: "address",
      },
    ],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const PriceOracleContractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pairAddress",
        type: "address",
      },
    ],
    name: "getLatestPrice",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pricePair",
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
        internalType: "address",
        name: "pairAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "setLatestPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = {
  BridgeWallet,
  PriceConsumerContractABI,
  PriceConsumerContractAddress,
  PriceOracleContractABI,
  PriceOracleContractAddress,
};