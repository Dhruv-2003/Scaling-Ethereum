const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const PriceConsumerContractAddress = `0x5E78843ceDb34760AD057ccfE3eB1A5806A523CF`;
const PriceOracleContractAddress = `0xC7803Ea35615f9ebCa019276AE5290D9E0616e48`;

const PriceConsumerContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
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
		"name": "pricePair",
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
  PriceOracleContractAddress
};
