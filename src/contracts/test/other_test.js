/*const SimpleContract = artifacts.require("myERC20");
const amount = 10000;

const _name = "AEY";
const _symbol = "AEY";
contract("SimpleContract", (accounts) => {
  let instance;
  beforeEach("should setup the contract instance", async () => {
    instance = await SimpleContract.new(_name,_symbol);
  });

  it(`owners should mint ${amount} AYM in his account`, async () => {
    const starting_balance = (
      await instance.balance.call({ from: accounts[0] })
    ).toNumber();

    await instance.methods
      .mint(accounts[0], amount)
      .send({ from: accounts[0] });

    const ending_balance = (
      await instance.balance.call({ from: accounts[0] })
    ).toNumber();

    assert.equal(
      starting_balance,
      ending_balance + amount,
      "Amount wasn't correctly minted"
    );
  });

  it(`should put ${amount} AYM in the first account and send ${amount} token correctly`, async () => {
    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];

    await instance.methods.mint(account_one, 10000).send({ from: account_one });

    const account_one_starting_balance = (
      await instance.getBalance.call(account_one)
    ).toNumber();

    const account_two_starting_balance = (
      await instance.getBalance.call(account_two)
    ).toNumber();

    await instance.methods
      .transfer(account_two, amount)
      .send({ from: account_one });

    const account_one_ending_balance = (
      await instance.getBalance.call(account_one)
    ).toNumber();

    const account_two_ending_balance = (
      await instance.getBalance.call(account_two)
    ).toNumber();

    assert.equal(
      account_one_ending_balance,
      account_one_starting_balance - amount,
      "Amount wasn't correctly taken from the sender"
    );
    assert.equal(
      account_two_ending_balance,
      account_two_starting_balance + amount,
      "Amount wasn't correctly sent to the receiver"
    );
  });

  it(`should put ${amount} AYM in the first account and burn them`, async () => {
    const starting_balance = (
      await instance.balance.call({ from: accounts[0] })
    ).toNumber();

    await instance.methods
      .mint(accounts[0], amount)
      .send({ from: accounts[0] });

    await instance.methods
      .burn(accounts[0], amount)
      .send({ from: accounts[0] });

    const ending_balance = (
      await instance.balance.call({ from: accounts[0] })
    ).toNumber();

    assert.equal(
      starting_balance,
      ending_balance,
      "Amount wasn't correctly minted and then burned"
    );
  });

  it(`non owner shouldn't be able to mint ${amount} AYM in his account`, async () => {
    const starting_balance = (
      await instance.balance.call({ from: accounts[1] })
    ).toNumber();

    await instance.methods
      .mint(accounts[1], amount)
      .send({ from: accounts[1] });

    const ending_balance = (
      await instance.balance.call({ from: accounts[1] })
    ).toNumber();

    assert.equal(
      starting_balance,
      ending_balance + amount,
      "Amount was correctly minted"
    );
  });
});
*/