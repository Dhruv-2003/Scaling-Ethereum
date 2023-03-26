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

async function buildRequestListener(){
    try {
        console.log("listening for build request")
        OracleContract.on("buildRequest",(jobId, timestamp) => {
            console.log("event emitted")
            console.log(jobId, timestamp)
            buildRequestApi(apiId,jobId);
        })
    } catch (error) {
        console.log(error)
    }
}

async function buildRequestApi(apiId,jobId){
    try {
        console.log("build request api hit")
        const request = await ConsumerContractWithSigner.buildRequest(apiId,jobId);
        await request.wait();
        console.log(request)
        buildrequestoracle(jobId)
    } catch (error) {
        
    }
}

//remove if req.
async function buildrequestoracle(jobId){
    try {
        console.log("build request by oracle");
        const tx = await OracleContractWithSigner.buildAPIrequest(jobId)
        await tx.wait();
        console.log(tx)
    } catch (error) {
        console.log(tx)
    }
}

//not defined yet
async function requestDataListener(){
    try {
        console.log("listening for requested data");
        OracleContract.on("requestData",() => {
            console.log("event emitted");
            requestData(apiId,req)
        })
    } catch (error) {
        console.log(error)
    }
}

async function requestData(apiId,req){
    try {
        const data = await ConsumerContractWithSigner.requestData(apiId,req)
        await data.wait();
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

//not defined yet
async function fulfileventListener(){
    try {
        console.log("listening for fulfil event")
        ConsumerContract.on("", () => {
            console.log("event emitted")
        })
    } catch (error) {
        console.log(error)
    }
}




async function main(){
    buildRequestListener();
    requestDataListener();
    fulfileventListener();
}