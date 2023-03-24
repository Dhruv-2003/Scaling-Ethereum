const BridgeWallet = `0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f`;
// addresses of the deployed contracts
const OracleContractAddress = `0x692af671F96bcC1a2Ec4B01C8F1454D1395eC4bB`;  //deployed on sepolia testnet
const ConsumerContractAddress = ``;    // deployes on mumbai testnet

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

const ConsumerContractABI = 


module.exports = {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
};