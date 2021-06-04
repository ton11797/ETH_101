// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.deployed();
  console.log("simpleStorage deployed to:", simpleStorage.address);


  const Coin = await hre.ethers.getContractFactory("Coin");
  const coin = await Coin.deploy();

  await coin.deployed();
  console.log("Coin deployed to:", coin.address);

  const Ballot = await hre.ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(["0x7465737400000000000000000000000000000000000000000000000000000000","0x4e69636b00000000000000000000000000000000000000000000000000000000"]);

  await ballot.deployed();
  console.log("Ballot deployed to:", ballot.address);

  
  const SimpleAuction = await hre.ethers.getContractFactory("SimpleAuction");
  const simpleAuction = await SimpleAuction.deploy();

  await simpleAuction.deployed();
  console.log("SimpleAuction deployed to:", simpleAuction.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
