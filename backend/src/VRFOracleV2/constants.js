const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const OracleContractAddress = `0xB0c88342471a299e5D8E9D925aB6E956D941232f`;  //deployed on sepolia testnet
const ConsumerContractAddress = ``;    // deployes on mumbai testnet

const OracleContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "vrfId",
				"type": "uint256"
			}
		],
		"name": "randomnessFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "vrfId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "numWords",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestConfirmations",
				"type": "uint256"
			}
		],
		"name": "randomnessRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vrfId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_randomWords",
				"type": "uint256[]"
			}
		],
		"name": "fulfillRandomness",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vrfId",
				"type": "uint256"
			}
		],
		"name": "getRandomness",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numWords",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "requestConfirmations",
				"type": "uint256"
			}
		],
		"name": "requestRandomness",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "vrfId",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vrfId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paidAmount",
				"type": "uint256"
			}
		],
		"name": "setRequestData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVRFRequests",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vrfRequests",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paid",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "fulfilled",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "numWords",
				"type": "uint256"
			},
			{
				"internalType": "enum VRFOracleV2.Status",
				"name": "currentStatus",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const ConsumerContractABI =

module.exports = {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
};