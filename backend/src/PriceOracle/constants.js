const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const PriceConsumerContractAddress = `0x9eDf5612D5108dD5BcCb2da086a2C52ef58b03a0`;  //deployed on goerli testnet
const PriceOracleContractAddress = `0xE610b3deC76EDdBcbB985c47279752B001eE3Dc2`;    // deployes on sepolia testnet

const PriceConsumerContractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pricePairAddress",
				"type": "address"
			}
		],
		"name": "getLatestPrice",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const PriceOracleContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "pricePair",
				"type": "address"
			}
		],
		"name": "requestPrice",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pairAddress",
				"type": "address"
			}
		],
		"name": "getLatestPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "pricePairs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pricePair",
				"type": "address"
			}
		],
		"name": "requestPairPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pairAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "setLatestPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

module.exports = {
  BridgeWallet,
  PriceConsumerContractABI,
  PriceConsumerContractAddress,
  PriceOracleContractABI,
  PriceOracleContractAddress,
};