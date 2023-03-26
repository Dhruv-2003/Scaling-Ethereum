const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const OracleContractAddress = `0x25d5298617C53cA2E4f4BAB91Ee3D4FF37Ac05F6`;  //deployed on sepolia testnet
const ConsumerContractAddress = `0x81ff033d362bAC8C2206d4Ed1E8F8E3f927b7902`;    // deployed on goerli testnet

const OracleContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "jobId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timeStamp",
				"type": "uint256"
			}
		],
		"name": "buildRequest",
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
		"name": "apiRequests",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "id",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "callbackAddress",
						"type": "address"
					},
					{
						"internalType": "bytes4",
						"name": "callbackFunctionId",
						"type": "bytes4"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "bytes",
								"name": "buf",
								"type": "bytes"
							},
							{
								"internalType": "uint256",
								"name": "capacity",
								"type": "uint256"
							}
						],
						"internalType": "struct BufferChainlink.buffer",
						"name": "buf",
						"type": "tuple"
					}
				],
				"internalType": "struct Chainlink.Request",
				"name": "req",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "result",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "jobId",
				"type": "string"
			}
		],
		"name": "buildAPIrequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "completeRequestBuild",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalRequests",
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
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "oracleAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "jobId",
				"type": "bytes32"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "id",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "callbackAddress",
						"type": "address"
					},
					{
						"internalType": "bytes4",
						"name": "callbackFunctionId",
						"type": "bytes4"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "bytes",
								"name": "buf",
								"type": "bytes"
							},
							{
								"internalType": "uint256",
								"name": "capacity",
								"type": "uint256"
							}
						],
						"internalType": "struct BufferChainlink.buffer",
						"name": "buf",
						"type": "tuple"
					}
				],
				"indexed": false,
				"internalType": "struct Chainlink.Request",
				"name": "req",
				"type": "tuple"
			}
		],
		"name": "requestBuilt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "apiId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "result",
				"type": "uint256"
			}
		],
		"name": "requestFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "apiId",
				"type": "uint256"
			}
		],
		"name": "requestSent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "apiIds",
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
		"name": "apiRequests",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "id",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "callbackAddress",
						"type": "address"
					},
					{
						"internalType": "bytes4",
						"name": "callbackFunctionId",
						"type": "bytes4"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "bytes",
								"name": "buf",
								"type": "bytes"
							},
							{
								"internalType": "uint256",
								"name": "capacity",
								"type": "uint256"
							}
						],
						"internalType": "struct BufferChainlink.buffer",
						"name": "buf",
						"type": "tuple"
					}
				],
				"internalType": "struct Chainlink.Request",
				"name": "req",
				"type": "tuple"
			},
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "result",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "jobId",
				"type": "bytes32"
			}
		],
		"name": "buildRequest",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "id",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "callbackAddress",
						"type": "address"
					},
					{
						"internalType": "bytes4",
						"name": "callbackFunctionId",
						"type": "bytes4"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "bytes",
								"name": "buf",
								"type": "bytes"
							},
							{
								"internalType": "uint256",
								"name": "capacity",
								"type": "uint256"
							}
						],
						"internalType": "struct BufferChainlink.buffer",
						"name": "buf",
						"type": "tuple"
					}
				],
				"internalType": "struct Chainlink.Request",
				"name": "req",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "result",
				"type": "uint256"
			}
		],
		"name": "fulfill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
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
				"name": "apiId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "id",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "callbackAddress",
						"type": "address"
					},
					{
						"internalType": "bytes4",
						"name": "callbackFunctionId",
						"type": "bytes4"
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "bytes",
								"name": "buf",
								"type": "bytes"
							},
							{
								"internalType": "uint256",
								"name": "capacity",
								"type": "uint256"
							}
						],
						"internalType": "struct BufferChainlink.buffer",
						"name": "buf",
						"type": "tuple"
					}
				],
				"internalType": "struct Chainlink.Request",
				"name": "req",
				"type": "tuple"
			}
		],
		"name": "sendRequest",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawLink",
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