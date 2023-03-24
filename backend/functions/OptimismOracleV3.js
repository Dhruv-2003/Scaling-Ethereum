const { ethers, formatEther } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  OracleContractABI,
  OracleContractAddress,
  ConsumerContractABI,
  ConsumerContractAddress,
} = require("../src/OptimismOracleV3/constants.js");

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
async function assertTruth(){
  try {
    console.log("listening to assert truth event")
    OracleContract.on("assertTruth",(assertId,sender,claim,timestamp) => {
      console.log("event emitted, asserted truth values:");
      console.log(assertId,sender,claim,timestamp);
      storingAssertion();
    })
  } catch (error) {
    console.log(error)
  }
}

//2
async function storingAssertion(assertId,assertedClaim,requester){
  try {
    console.log("storing assertion on node side")
    const assertion = await ConsumerContractWithSigner.assertTruth(assertId,assertedClaim,requester)
    await assertion.wait();
    console.log(assertion)
    setAssertionId();
  } catch (error) {
    
  }
}

//3
async function setAssertionId(assertId,assertionId){
  try {
    console.log("storing assertion id in oov3")
    const id = await OracleContractWithSigner.setAssertionId(assertId,assertionId)
    await id.wait();
    console.log(id)
    settleRequestListener();
  } catch (error) {
    console.log(error)
  }
}

//4
async function settleRequestListener(){
  try {
    console.log("listening for settle request event");
    OracleContract.on("settleRequest",(assertId,timestamp) => {
      console.log("event emitted")
      console.log(assertId,timestamp);
      settleRequest();
    })
  } catch (error) {
    console.log(error)
  }
}

//5
async function settleRequest(){
  try {
    console.log("settling the request using consumer");
    const tx = await OracleContract.settleAndgetAssertionResult(assertId);
    console.log(tx);
    storingresult();
  } catch (error) {
    console.log(error);
  }
}

//6
async function storingresult(){
  try {
    console.log("setting assert result in oov3")
    const storeddata = await OracleContractWithSigner.setAssertResult(assertId,assertResult);
    await storeddata.wait();
    console.log(storeddata);
    gettingResult();
  } catch (error) {
    console.log(error)
  }
}

//7
async function gettingResult(){
  try {
    console.log("getting result")
    const data = await ConsumerContract.getAssertion(assertId);
    console.log(data);
  } catch (error) {
    console.log(error)
  }
} 

function main(){
  assertTruth();
}