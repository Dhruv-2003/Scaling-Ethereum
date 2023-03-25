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

//1
async function RequestDataEventListener() {
  try {
    console.log("listening for requestData event");
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
    await datarequested.wait();
    console.log("fetched data is:");
    console.log(datarequested);
    // RequestDataEventListener();
  } catch (error) {
    console.log(error);
  }
}

async function SettleRequestEventListener() {
  try {
    console.log("listening for settle Request event");
    OracleContract.on("settleOORequest", (requestId, timestamp) => {
      console.log("event emit found");
      console.log(requestId, timestamp);
      RequestData(requestId, identifier, ancillaryData, timestamp, sender);
    });
  } catch (error) {
    console.log(error);
  }
}

//7
async function getResultData() {
  try {
    console.log("Fetching the resolved price from the Optimistic Oracle");
    const resultdata = await ConsumerContract.getSettledData(requestId);
    console.log(resultdata);
  } catch (error) {
    console.log(error);
  }
}

//6
async function setRequestResult() {
  try {
    console.log("setting requested data");
    const tx = await OracleContractWithSigner.setRequestResult(
      requestId,
      result
    );
    await tx.wait();
    console.log(tx);
    getResultData();
  } catch (error) {
    console.log(error);
  }
}

//5
async function settleRequestConsumer() {
  try {
    console.log("settle request function (consumer)");
    const data = await ConsumerContractWithSigner.settleRequest(requestId);
    await data.wait();
    console.log(data);
    setRequestResult();
  } catch (error) {
    console.log(error);
  }
}

//4
async function settleRequestData() {
  try {
    // called by the request creator
    console.log("settle request function by request creator");
    const settledata = await OracleContractWithSigner.settleRequest(requestId);
    await settledata.wait();
    console.log(settledata);
    settleRequestConsumer();
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  RequestDataEventListener();
}
