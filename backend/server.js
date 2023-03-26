const OptimismOracleV2 = require("./functions/OptimismOracleV2");
const OptimismOracleV3 = require("./functions/OptimismOracleV3");
const PriceOracle = require("./functions/PriceOracle");
const VRFOracleV2 = require("./functions/VRFOracleV2");
const APIOracle = require("./functions/APIOracle");

async function main() {
  console.log("Listening to OOV2 events ...");
  OptimismOracleV2();

  console.log("Listening to OOV3 events ...");
  OptimismOracleV3();

  console.log("Listening to Price Oracle Events ...");
  PriceOracle();

  console.log("Listening to VRF Oracle Events ...");
  VRFOracleV2();

  console.log("Listening to API Oracle Events ...");
  // APIOracle()
}

main();
