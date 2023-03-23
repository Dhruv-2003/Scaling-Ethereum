const { ethers } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  PriceConsumerContractABI,
  PriceConsumerContractAddress,
  PriceOracleContractABI,
  PriceOracleContractAddress
} = require("./contracts.js");

const PriceOracleProvider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const PriceConsumerProvider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

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

async function listener(_pricePairAddress,_price){
  try {
    console.log("consumer");
    const pricefeed = await ConsumerContractWithSigner.getLatestPrice(_pricePairAddress);
    await pricefeed.wait();
    console.log(pricefeed);
    const settingvalue = await OracleContractWithSigner.setLatestPrice(_pricePairAddress,_price);
    await settingvalue.wait();
    console.log(settingvalue)
  } catch (error) {
    console.log(error);
  }
}

async function consumerContractHandler(pricePairAddress){
  try {
    console.log("oracle");
    const tx = await ConsumerContractWithSigner.getLatestPrice(pricePairAddress);
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}


// async function listener(){


// }

// listener();
consumerContractHandler()