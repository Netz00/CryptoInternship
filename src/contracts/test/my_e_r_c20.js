const myERC20 = artifacts.require("myERC20");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
const _name = "AEY";
const _symbol = "AEY";
contract("myERC20", accounts => {


/*
  beforeEach('setup contract for each test', async function () {
    contract = await myERC20.new(_name,_symbol)
});

*/

   it("should assert true", async () => {
    await myERC20.deployed();
    return assert.isTrue(true);
  });

  it("owners should mint 10000 AYM in his account", () => {

    let meta;
    let starting_balance;
    let ending_balance;

    const amount = 10000;

    myERC20
      .new(_name,_symbol)


      .then((instance) => {
        meta = instance;
        return meta.balance.call({ from: accounts[0] });
      })
      .then(balance => {
        starting_balance = balance.toNumber();
        return meta.methods.mint(accounts[0], amount).send({ from: accounts[0] });
      })
      .then(() => {
        return meta.balance.call({ from: accounts[0] });
      })
      .then((balance) => {
        ending_balance = balance.toNumber();

        assert.equal(
          starting_balance,
          ending_balance + amount,
          "Amount wasn't correctly minted"
        );
      });
  });



  it("should put 10000 AYM in the first account and send 10000 coin correctly", () => {
    let meta;

    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];

    let account_one_starting_balance;
    let account_two_starting_balance;
    let account_one_ending_balance;
    let account_two_ending_balance;

    const amount = 10000;

    myERC20
    .new(_name,_symbol)

      .then((instance) => {
        meta = instance;
        return meta.methods.mint(account_one, 10000).send({ from: account_one });
      })
      .then(() => {
        return meta.getBalance.call(account_one);
      })
      .then((balance) => {
        account_one_starting_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      })
      .then((balance) => {
        account_two_starting_balance = balance.toNumber();
        //return meta.sendCoin(account_two, amount, { from: account_one });

        return meta.methods
          .transfer(account_two, amount)
          .send({ from: account_one });
      })
      .then(() => meta.getBalance.call(account_one))
      .then((balance) => {
        account_one_ending_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      })
      .then((balance) => {
        account_two_ending_balance = balance.toNumber();

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
  });



  it("should put 10000 AYM in the first account and burn them", () => {

    let meta;

    let starting_balance;
    let ending_balance;

    const amount = 10000;

    myERC20
    .new(_name,_symbol)
    .then((instance) => {
        meta = instance;
        return meta.balance.call({ from: accounts[0] });
      })
      .then(balance => {
        starting_balance = balance.toNumber();
        return meta.methods.mint(accounts[0], amount).send({ from: accounts[0] });
      })
      .then(() => {
        return meta.methods.burn(accounts[0], amount).send({ from: accounts[0] });
      })
      .then(() => {
        return meta.balance.call({ from: accounts[0] });
      })

      .then(() => {
        ending_balance = balance.toNumber();
        assert.equal(
          starting_balance,
          ending_balance,
          "Amount wasn't correctly minted and then burned"
        );
      });
  });




  it("non owner should mint 10000 AYM in his account", () => {

    let meta;
    let starting_balance;
    let ending_balance;

    const amount = 10000;

    myERC20
      .new(_name,_symbol)


      .then((instance) => {
        meta = instance;
        return meta.balance.call({ from: accounts[1] });
      })
      .then(balance => {
        starting_balance = balance.toNumber();
        return meta.methods.mint(accounts[1], amount).send({ from: accounts[1] });
      })
      .then(() => {
        return meta.balance.call({ from: accounts[1] });
      })
      .then((balance) => {
        ending_balance = balance.toNumber();

        assert.equal(
          starting_balance,
          ending_balance + amount,
          "Amount was correctly minted"
        );
      });
  });



  
 
});