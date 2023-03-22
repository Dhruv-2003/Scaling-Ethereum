const { ethers } = require("ethers");
require("dotenv").config();

const {
  BridgeWallet,
  sepoliaContractABI,
  sepoliaContractAddress,
  polygonContractABI,
  polygonContractAddress,
} = require("./contracts.js");

const polygonProvider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const sepoliaProvider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

const privatekey = process.env.BRIDGE_PRIVATE_KEY;

const wallet_polygon = new ethers.Wallet(privatekey, polygonProvider);
const wallet_sepolia = new ethers.Wallet(privatekey, sepoliaProvider);

const polygonContract = new ethers.Contract(
  polygonContractAddress,
  polygonContractABI,
  polygonProvider
);

const sepoliaContract = new ethers.Contract(
  sepoliaContractAddress,
  sepoliaContractABI,
  sepoliaProvider
);

const polygonContractWithSigner = polygonContract.connect(wallet_polygon);
const sepoliaContractWithSigner = sepoliaContract.connect(wallet_sepolia);

async function handleChainlink(_price) {
  try {
    console.log("chainlink");
    const tx = await polygonContractWithSigner.setPrice(_price);
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

async function handlePolygon(_price) {
  try {
    console.log("polygon");
    const tx = await sepoliaContractWithSigner.getLatestPrice(_price);
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

async function listener(){
    console.log("listening polygon");
    polygonContract.on("request", (value,timestamp) => {
        console.log("event on mumbai");
        console.log(value,timestamp);
        handlePolygon(value);
    })

    console.log("listening chainlink");

}

listener();