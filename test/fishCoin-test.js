const { expect } = require("chai");

describe("fishCoin-test",async function() {
    let Fishcoin;
    let fishcoin;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addr4;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        Fishcoin = await hre.ethers.getContractFactory("Fishcoin");
        fishcoin = await Fishcoin.deploy("Fishcoin","FHC", 1000000000 );
        await fishcoin.deployed();
      });

      
    it("Greeter Should return the new greeting once it's changed", async function() {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        
        await greeter.deployed();
        expect(await greeter.greet()).to.equal("Hello, world!");
    
        await greeter.setGreeting("Hola, mundo!");
        expect(await greeter.greet()).to.equal("Hola, mundo!");
      });
});