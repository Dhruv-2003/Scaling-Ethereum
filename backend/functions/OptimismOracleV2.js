const { ethers, formatEther } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
} = require("../src/OptimismOracleV2/constants.js");

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

//3
async function consumerRequest(){
    try {
        console.log("getting data from requestCreated(OOV2) and adding request to OOConsumerV2");
        const data = await ConsumerContractWithSigner.requestData(requestId,identifier,ancillaryData,bondCurrencyAddress,rewardAmount,livenessTime,requester);
        await data.wait();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

//2
async function RequestDataEventListener() {
  try {
    console.log("listening for requestData event");
    OracleContract.on(
      "requestCreated",
      (requestId, identifier, ancillaryData, timestamp, sender) => {
        console.log("event emit found");
        console.log(requestId, identifier, ancillaryData, timestamp, sender);
      },
      consumerRequest()
    );
  } catch (error) {
    console.log(error);
  }
}

//1
async function RequestData(
  identifier,
  ancillaryData,
  bondCurrencyAddress,
  rewardAmount,
  livenessTime
) {
  try {
    console.log("requesting data from OOV2");
    const datarequested = await OracleContractWithSigner.requestData(
      identifier,
      ancillaryData,
      bondCurrencyAddress,
      rewardAmount,
      livenessTime
    );
    await datarequested.wait();
    console.log("fetched data is:");
    console.log(datarequested);
    RequestDataEventListener();
  } catch (error) {
    console.log(error);
  }
}

async function settleRequestData() {
  try {
  } catch (error) {}
}


RequestData();