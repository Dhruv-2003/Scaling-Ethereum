const { ethers, formatEther } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
} = require("../src/VRFOracleV2/constants.js");

const OracleProvider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const ConsumerProvider = new ethers.JsonRpcProvider(
  process.env.POLYGON_RPC_URL
);

const privatekey = process.env.BRIDGE_PRIVATE_KEY;

const wallet_Oracle = new ethers.Wallet(privatekey, OracleProvider);
const wallet_Consumer = new ethers.Wallet(privatekey, ConsumerProvider);

const OracleContract = new ethers.Contract(
  OracleContractAddress,
  OracleContractABI,
  OracleProvider
);

const ConsumerContract = new ethers.Contract(
  ConsumerContractAddress,
  ConsumerContractABI,
  ConsumerProvider
);

const OracleContractWithSigner = OracleContract.connect(wallet_Oracle);
const ConsumerContractWithSigner = ConsumerContract.connect(wallet_Consumer);

