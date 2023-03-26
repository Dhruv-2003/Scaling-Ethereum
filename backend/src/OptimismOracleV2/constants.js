const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const OracleContractAddress = `0x692af671F96bcC1a2Ec4B01C8F1454D1395eC4bB`;  //deployed on sepolia testnet
const ConsumerContractAddress = `0x0bA7a2f5FD0943ccd5a6dEFC99f9a5e2D62Ed9f1`;    // deployes on goerli testnet

const OracleContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "identifier",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "ancillaryData",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			}
		],
		"name": "requestCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "result",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "resultAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "settleOORequest",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ooRequests",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "identifier",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "ancillaryData",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "bondCurrencyAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "livenessTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "requestTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"internalType": "int256",
				"name": "result",
				"type": "int256"
			},
			{
				"internalType": "enum OptimisticOracleV2.Status",
				"name": "currentStatus",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "identifier",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "ancillaryData",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "bondCurrencyAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rewardAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "livenessTime",
				"type": "uint256"
			}
		],
		"name": "requestData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "result",
				"type": "int256"
			}
		],
		"name": "setRequestResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"name": "settleRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalOORequests",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const ConsumerContractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ooContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "identifier",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "ancillaryData",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			}
		],
		"name": "requestCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "requestSettled",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"name": "getRequest",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "identifier",
						"type": "bytes32"
					},
					{
						"internalType": "bytes",
						"name": "ancillaryData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "bondCurrencyAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "livenessTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "requestTime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "requester",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "oracle",
						"type": "address"
					}
				],
				"internalType": "struct OOConsumerV2.Request",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"name": "getSettledData",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
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
		"name": "ooRequests",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "identifier",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "ancillaryData",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "bondCurrencyAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "livenessTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "requestTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "oracle",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "identifier",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "ancillaryData",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "bondCurrencyAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rewardAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "livenessTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "requester",
				"type": "address"
			}
		],
		"name": "requestData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"name": "settleRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


module.exports = {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
};