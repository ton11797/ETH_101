const { expect } = require("chai");

describe("sample-test",async function() {
  it("Greeter Should return the new greeting once it's changed", async function() {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    
    await greeter.deployed();
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  it("SimpleStorage Should return the correct value after set value", async function() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    
    await simpleStorage.deployed();
    await simpleStorage.set(123);
    expect(await simpleStorage.get()).to.equal(123);
  });


  it("Coin Should return the balance value 0", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const user1 = owner.address
    const Coin = await hre.ethers.getContractFactory("Coin");
    const coin = await Coin.deploy();
    await coin.deployed();
    expect(await coin.getBalance(user1)).to.equal(0);
  });

  it("Coin Should return the user1's balance value 100 after mint user1 100", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const user1 = owner.address
    const Coin = await hre.ethers.getContractFactory("Coin");
    const coin = await Coin.deploy();
    await coin.deployed();
    await coin.mint(user1,100)
    expect(await coin.getBalance(user1)).to.equal(100);
  });

  it("Should return the correct balance when send from user1 to user2 100", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const user1 = owner.address
    const user2 = addr1.address
    const Coin = await hre.ethers.getContractFactory("Coin");
    const coin = await Coin.deploy();
    await coin.deployed();
    await coin.mint(user1,100)
    await coin.send(user2,100)
    expect(await coin.getBalance(user1)).to.equal(0);
    expect(await coin.getBalance(user2)).to.equal(100);
  });
});

