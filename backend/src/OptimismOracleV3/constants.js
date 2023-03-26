const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const OracleContractAddress = `0x73EdC9841B96b08D1E1952466bfC0c3ce2F6fa3F`;  //deployed on sepolia testnet
const ConsumerContractAddress = `0xC7803Ea35615f9ebCa019276AE5290D9E0616e48`;    // deployed on goerli testnet

const OracleContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "assertId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "claim",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "assertTruth",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "assertId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "settleRequest",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "claim",
				"type": "bytes"
			}
		],
		"name": "assertTruthWithDefaults",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "assertId",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "assertionRequests",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "assertionId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "assertedClaim",
				"type": "bytes"
			},
			{
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "result",
				"type": "bool"
			},
			{
				"internalType": "enum OptimisticOracleV3.Status",
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
				"internalType": "uint256",
				"name": "assertId",
				"type": "uint256"
			}
		],
		"name": "getAssertion",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "assertionId",
						"type": "bytes32"
					},
					{
						"internalType": "bytes",
						"name": "assertedClaim",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "requester",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "result",
						"type": "bool"
					},
					{
						"internalType": "enum OptimisticOracleV3.Status",
						"name": "currentStatus",
						"type": "uint8"
					}
				],
				"internalType": "struct OptimisticOracleV3.AssertionRequest",
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
				"name": "assertId",
				"type": "uint256"
			}
		],
		"name": "getAssertionResult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "assertId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "assertResult",
				"type": "bool"
			}
		],
		"name": "setAssertResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "assertId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "assertionId",
				"type": "bytes32"
			}
		],
		"name": "setAssertionId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "assertId",
				"type": "uint256"
			}
		],
		"name": "settleAssertion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalAssertions",
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

const ConsumerContractABI = 


module.exports = {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
};