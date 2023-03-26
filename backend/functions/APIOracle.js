const { ethers, formatEther } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
} = require("../src/APIOracle/constants.js");

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

async function buildRequestListener() {
  try {
    console.log("listening for build request");
    OracleContract.on("buildRequest", (jobId, timestamp) => {
      console.log("event emitted");
      console.log(jobId, timestamp);
      buildRequestApi(apiId, jobId);
    });
  } catch (error) {
    console.log(error);
  }
}

async function buildRequestApi(apiId, jobId) {
  try {
    console.log("build request api hit");
    const request = await ConsumerContractWithSigner.buildRequest(apiId, jobId);
    await request.wait();
    console.log(request);
  } catch (error) {}
}

async function RequestBuiltListener() {
  try {
    console.log("listening to request built event");
    ConsumerContract.on("requestBuilt", (jobId, req) => {
      console.log("event emitted");
      console.log(jobId, req);
      completeBuildRequest(jobId, req);
    });
  } catch (error) {
    console.log(error);
  }
}

async function completeBuildRequest(jobId, req) {
  try {
    console.log("setting data in oracle");
    const data = await OracleContractWithSigner.completeRequestBuild(
      jobId,
      req
    );
    await data.wait();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function requestSentOracleListener() {
  try {
    console.log("Listening to request sent from oracle");
    OracleContract.on("requestSent", (req, apiId, timeStamp) => {
      console.log("event emitted");
      console.log(req, apiId, timeStamp);
      sendRequest(apiId, req);
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendRequest(apiId, req) {
  try {
    const request = await ConsumerContractWithSigner.sendRequest(apiId, req);
    await request.wait();
    console.log(request);
  } catch (error) {
    console.log(error);
  }
}

async function requestSentConsumerListener() {
  try {
    console.log("Listening to request sent from consumer");
    ConsumerContract.on("requestSent", (requestId, apiId) => {
      console.log("event emitted");
      console.log(requestId, apiId);
      setRequestData(apiId, requestId);
    });
  } catch (error) {
    console.log(error);
  }
}

async function setRequestData(apiId, requestId) {
  try {
    const request = await OracleContractWithSigner.setRequestData(
      apiId,
      requestId
    );
    await request.wait();
    console.log(request);
  } catch (error) {
    console.log(error);
  }
}

async function requestFulfilledListener() {
  try {
    console.log("Listening to request fulfil from consumer");
    ConsumerContract.on("requestFulfilled", (result) => {
      console.log("event emitted");
      console.log(result);
      fulfillRequest(apiId, result);
    });
  } catch (error) {
    console.log(error);
  }
}

async function fulfillRequest(apiId, result) {
  try {
    const request = await OracleContractWithSigner.setRequestData(
      apiId,
      result
    );
    await request.wait();
    console.log(request);
  } catch (error) {
    console.log(error);
  }
}

async function APIOracle() {
  buildRequestListener();
  RequestBuiltListener();
  requestSentOracleListener();
  requestSentConsumerListener();
  requestFulfilledListener();
}

module.exports = APIOracle;
