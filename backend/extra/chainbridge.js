const BridgeWalletlink = `0x3fdF69DA53299Cf8c179B19A644664a3bb6b7bBf`;

const linksepoliaContractAddress = `0x3F6E1c528fDfBfB88aF257D11f38EeabC61c863d`;
const linkpolygonContractAddress = `0x0bA7a2f5FD0943ccd5a6dEFC99f9a5e2D62Ed9f1`;

const linksepoliaContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
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
];
const linkpolygonContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "request",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
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
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

module.exports = {
    BridgeWalletlink,
    linkpolygonContractABI,
    linkpolygonContractAddress,
    linksepoliaContractABI,
    linksepoliaContractAddress,
}