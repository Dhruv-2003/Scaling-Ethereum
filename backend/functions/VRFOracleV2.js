const { ethers, formatEther } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
} = require("../src/VRFOracleV2/constants.js");

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

async function requestRandomnessListener() {
  try {
    console.log("listening to request randomness event");
    OracleContract.on(
      "randomnessRequested",
      (vrfId, numWords, requestConfirmations) => {
        console.log("event emitted");
        console.log(vrfId, numWords, requestConfirmations);
        requestRandomWords(vrfId, numWords, requestConfirmations);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// async function requestRandomness(numWords, requestConfirmations) {
//   try {
//     console.log("requesting random");
//     const random = await OracleContractWithSigner.requestRandomness(
//       numWords,
//       requestConfirmations
//     );
//     await random.wait();
//     console.log(random);
//     requestRandomWords();
//   } catch (error) {
//     console.log(error);
//   }
// }

async function requestRandomWords(vrfId, numWords, requestConfirmations) {
  try {
    console.log("adding details to consumer contract");
    const tx = await ConsumerContractWithSigner.requestRandomWords(
      vrfId,
      numWords,
      requestConfirmations
    );
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

async function requestSentListener() {
  try {
    console.log("listening to request sent event");
    ConsumerContract.on(
      "RequestSent",
      (requestId, vrfId, numWords, paidAmount) => {
        console.log("event emitted");
        console.log(requestId, vrfId, numWords, paidAmount);
        setRequestData(vrfId, requestId, paidAmount);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function setRequestData(vrfId, requestId, paidAmount) {
  try {
    console.log("setting data into oracle");
    const tx = await OracleContractWithSigner.setRequestData(
      vrfId,
      requestId,
      paidAmount
    );
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

async function requestFulfilListener() {
  try {
    console.log("listeneing to request fulfil event");
    ConsumerContract.on(
      "RequestFulfilled",
      (vrfId, _requestId, _randomWords, paidAmount) => {
        console.log("event emitted");
        console.log(vrfId, _requestId, _randomWords);
        fulfillRandomness(vrfId, _randomWords);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function fulfillRandomness(vrfId, _randomWords) {
  try {
    console.log("calling fulfilrandomness from oracle");
    const fulran = await OracleContractWithSigner.fulfillRandomness(
      vrfId,
      _randomWords
    );
    await fulran.wait();
    console.log(fulran);
  } catch (error) {
    console.log(error);
  }
}

async function VRFOracleV2() {
  requestRandomnessListener();
  requestSentListener();
  requestFulfilListener();
}

module.exports = VRFOracleV2;
