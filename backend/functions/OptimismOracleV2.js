const { ethers, formatEther } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
} = require("../src/OptimismOracleV2/constants.js");

const OracleProvider = new ethers.JsonRpcProvider(process.env.DEST_RPC_URL);
const ConsumerProvider = new ethers.JsonRpcProvider(process.env.ORIGIN_RPC_URL);

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
const bondCurrencyAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";

//1
async function RequestDataEventListener() {
  try {
    console.log("listening for requestData event ...");
    OracleContract.on(
      "requestCreated",
      (requestId, identifier, ancillaryData, timestamp, sender) => {
        console.log("event emit found");
        console.log(requestId, identifier, ancillaryData, timestamp, sender);
        RequestData(requestId, identifier, ancillaryData, timestamp, sender);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

//2
async function RequestData(
  requestId,
  identifier,
  ancillaryData,
  timestamp,
  sender
) {
  try {
    console.log(
      "getting data from requestCreated(OOV2) and adding request to OOConsumerV2"
    );
    const data = await ConsumerContractWithSigner.requestData(
      requestId,
      identifier,
      ancillaryData,
      bondCurrencyAddress,
      0,
      30,
      sender
    );
    await data.wait();
    console.log("fetched data is:");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// 3
async function SettleRequestEventListener() {
  try {
    console.log("listening for settle Request event");
    OracleContract.on("settleOORequest", (requestId, timestamp) => {
      console.log("event emit found");
      console.log(requestId, timestamp);
      settleRequestConsumer(requestId);
    });
  } catch (error) {
    console.log(error);
  }
}

//4
async function settleRequestConsumer(requestId) {
  try {
    console.log("Settling request in OO in CONSUMER ....");
    const data = await ConsumerContractWithSigner.settleRequest(requestId);
    await data.wait();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//5
async function RequestSettledEventListener() {
  try {
    console.log("listening for settle Request event in CONSUMER ...");
    ConsumerContract.on("requestSettled", (requestId, timestamp) => {
      console.log("event emit found");
      console.log(requestId, timestamp);
      getResultData(requestId);
    });
  } catch (error) {
    console.log(error);
  }
}

//6
async function getResultData(requestId) {
  try {
    console.log(
      "Fetching the resolved price from the Optimistic Oracle Consumer"
    );
    const resultdata = await ConsumerContract.getSettledData(requestId);
    console.log(resultdata);
    setRequestResult(requestId, resultdata);
  } catch (error) {
    console.log(error);
  }
}

//7
async function setRequestResult(requestId, result) {
  try {
    console.log("Setting requested data in CONSUMER ...");
    const tx = await OracleContractWithSigner.setRequestResult(
      requestId,
      result
    );
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

async function OptimismOracleV2() {
  RequestDataEventListener();
  SettleRequestEventListener();
  RequestSettledEventListener();
}

module.exports = OptimismOracleV2;
