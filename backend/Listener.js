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

// console.log(polygonProvider, sepoliaProvider, privatekey);

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

const polygoContractWithSigner = polygonContract.connect(wallet_polygon);
const sepoliaContractWithSigner = sepoliaContract.connect(wallet_sepolia);

async function handleSepoliaEvent(_value) {
  try {
    console.log("Value Changed on Sepolia Contract");
    const tx = await polygoContractWithSigner.set(_value);
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

async function handlePolygonEvent(_value) {
  try {
    console.log("Value changed on Mumbai");
    const tx = await sepoliaContractWithSigner.set(_value);
    await tx.wait();
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

async function listener() {
  console.log("Listening to Events on Sepolia");
  sepoliaContract.on("valueSet", (value, timestamp) => {
    console.log("Contract Event emitted on Sepolia");
    console.log(value, timestamp);
    handleSepoliaEvent(value);
  });

  console.log("Listening to Events on Polygon Mumbai");
  polygonContract.on("valueChanged", (value, timestamp) => {
    console.log("Contract Event emitted on Polygon Mumbai");
    console.log(value, timestamp);
    handlePolygonEvent(value);
  });
}

listener();
