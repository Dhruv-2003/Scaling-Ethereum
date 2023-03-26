const { ethers, formatEther } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  PriceConsumerContractABI,
  PriceConsumerContractAddress,
  PriceOracleContractABI,
  PriceOracleContractAddress,
} = require("../src/PriceOracle/constants.js");

const PriceOracleProvider = new ethers.JsonRpcProvider(
  process.env.DEST_RPC_URL
);
const PriceConsumerProvider = new ethers.JsonRpcProvider(
  process.env.ORIGIN_RPC_URL
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

async function RequestPriceEventListener() {
  try {
    console.log("listening for requestPrice event ...");
    OracleContract.on("requestPrice", (pricePair) => {
      console.log("event emit found");
      console.log(pricePair);
      getPriceConsumer(pricePair);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getPriceConsumer(pricePairAddress) {
  try {
    console.log("Fetching price from Chainlink on Sepolia");
    const price = await ConsumerContract.getLatestPrice(pricePairAddress);
    console.log(price);
    console.log(formatEther(price.toString()));
    setPriceOracle(pricePairAddress, price);
  } catch (error) {
    console.log(error);
  }
}

async function setPriceOracle(_pricePairAddress, _price) {
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

async function PriceOracle() {
  RequestPriceEventListener();
}

module.exports = PriceOracle;
