const { expect } = require("chai");

describe("Greeter", function() {
  it("Should return the new greeting once it's changed", async function() {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    
    await greeter.deployed();
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("SimpleStorage", function() {
  it("Should return the correct value after set value", async function() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    
    await simpleStorage.deployed();
    await simpleStorage.set(123);
    expect(await simpleStorage.get()).to.equal(123);
  });
});

