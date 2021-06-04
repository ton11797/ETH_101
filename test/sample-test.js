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

describe("Ballot",async function() {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addr4;

  beforeEach(async function () {
    Ballot = await ethers.getContractFactory("Ballot");
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    ballot = await Ballot.deploy(["0x7465737400000000000000000000000000000000000000000000000000000000","0x4e69636b00000000000000000000000000000000000000000000000000000000"]);
    await ballot.deployed();
  });

  it("giveRightToVote to user 1", async function() {
    await ballot.giveRightToVote(addr1.address)
  });

  it("user 1 delegate to user 2", async function() {
    await ballot.giveRightToVote(addr1.address)
    await ballot.connect(addr1).delegate(addr2.address)
    let voterDetail = await ballot.voters(addr1.address)
    expect(voterDetail.delegate).to.equal(addr2.address)
  });

  it("vote to proposal 1", async function() {
    await ballot.giveRightToVote(addr1.address)
    await ballot.giveRightToVote(addr2.address)
    let proposal1 = await ballot.proposals(0)
    expect(proposal1.voteCount).to.equal(0)
    await ballot.connect(addr1).vote(0)
    proposal1 = await ballot.proposals(0)
    expect(proposal1.voteCount).to.equal(1)
  });

  it("vote to proposal 1 and count vote", async function() {
    await ballot.giveRightToVote(addr1.address)
    await ballot.giveRightToVote(addr2.address)
    await ballot.connect(addr1).vote(0)
    await ballot.connect(addr2).vote(0)
    let result = await ballot.winningProposal()
    expect(result).to.equal(0)
  });

  it("get winner name", async function() {
    await ballot.giveRightToVote(addr1.address)
    await ballot.giveRightToVote(addr2.address)
    await ballot.connect(addr1).vote(0)
    await ballot.connect(addr2).vote(0)
    let result = await ballot.winnerName()
    expect(result).to.equal("0x7465737400000000000000000000000000000000000000000000000000000000")
  });
});