const { ethers } = require("ethers");

const polygonProvider = new ethers.JsonRpcProvider();
const sepoliaProvider = new ethers.JsonRpcProvider();

const polygonAddress = '';
const sepoliaAddress = '';

const polygonABI = [];
const sepoliaABI = [];

const privatekey = '';

const wallet_polygon = new ethers.Wallet(privatekey,polygonProvider);
const wallet_sepolia =  new ethers.Wallet(privatekey,sepoliaProvider);

const polygonContract = new ethers.Contract(polygonAddress,polygonABI,polygonProvider);
const sepoliaContract = new ethers.Contract(sepoliaAddress,sepoliaABI,sepoliaProvider);

