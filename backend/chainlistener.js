const { ethers, formatEther } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  PriceConsumerContractABI,
  PriceConsumerContractAddress,
  PriceOracleContractABI,
  PriceOracleContractAddress,
} = require("./contracts.js");

const PriceOracleProvider = new ethers.JsonRpcProvider(
  process.env.POLYGON_RPC_URL
);
const PriceConsumerProvider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);

const privatekey = process.env.BRIDGE_PRIVATE_KEY;

const wallet_Oracle = new ethers.Wallet(privatekey, PriceOracleProvider);
const wallet_Consumer = new ethers.Wallet(privatekey, PriceConsumerProvider);

const OracleContract = new ethers.Contract(
  PriceOracleContractAddress,
  PriceOracleContractABI,
  PriceOracleProvider
);

const ConsumerContract = new ethers.Contract(
  PriceConsumerContractAddress,
  PriceConsumerContractABI,
  PriceConsumerProvider
);

const OracleContractWithSigner = OracleContract.connect(wallet_Oracle);
const ConsumerContractWithSigner = ConsumerContract.connect(wallet_Consumer);

const pairAddress = "0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22";

async function OracleContractHandler(_pricePairAddress, _price) {
  try {
    console.log("Storing the price on Polygon Mumbai , Destination chain");
    const tx = await OracleContractWithSigner.setLatestPrice(
      _pricePairAddress,
      _price
    );
    await tx.wait();
    console.log(tx);
    console.log(
      `Price set on Polygon Mumbai for ${_pricePairAddress} as ${_price}`
    );
  } catch (error) {
    console.log(error);
  }
}

async function ConsumerContractHandler(pricePairAddress) {
  try {
    console.log("Fetching price from Chainlink on Sepolia");
    const price = await ConsumerContract.getLatestPrice(pricePairAddress);
    console.log(price);
    console.log(formatEther(price.toString()));
    OracleContractHandler(pricePairAddress, price);
  } catch (error) {
    console.log(error);
  }
}

ConsumerContractHandler(pairAddress);
