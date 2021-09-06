import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Copyright from "./components/layout/Copyright";
import Explore from "./pages/Explore";
import CreateToken from "./pages/CreateToken";
import useWeb3 from "./useWeb3";
import { useStoreApi } from "./storeApi";

import { Switch, Route, Redirect } from "react-router-dom";

import MyContract from "./contracts/build/contracts/myERC20.json"; //truffle project dirs

import firebase from "firebase/app";
require("firebase/database");

const abi = MyContract.abi;
const bytecode = MyContract.bytecode;

var firebaseConfig = {
  apiKey: "AIzaSyAXs9virC0ONM8mSPokucpo2fEIj7ZGilg",
  authDomain: "blank-internship.firebaseapp.com",
  databaseURL:
    "https://blank-internship-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blank-internship",
  storageBucket: "blank-internship.appspot.com",
  messagingSenderId: "695300655998",
  appId: "1:695300655998:web:00fa7af41e13fedf6dc12f",
};

const App = () => {
  //const { balance, address, message, setAccount, setBalance ,token, setToken, tokens, setTokens} = useStoreApi();
  const {
    address,
    setAccount,
    setBalance,
    token,
    setToken,
    tokens,
    setTokens,
  } = useStoreApi();
  const web3 = useWeb3();

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  // get user account on button click and update address, EthBalance, tokens
  const getUserAccount = async () => {
    if (window.ethereum) {
      if (window.ethereum.networkVersion !== "3") {
        console.log(
          window.ethereum.networkVersion,
          "window.ethereum.networkVersion"
        );
        return "wrongNet";
      }

      try {
        await window.ethereum.enable();

        const addr = await web3.eth
          .getAccounts()
          .then((accounts) => accounts[0]);

        const ethBalance = await web3.eth
          .getBalance(addr)
          .then((value) => web3.utils.fromWei(value, "ether"));

        try {
          const snapshot = await firebase
            .database()
            .ref(`usersAndContracts/${addr}/contracts`)
            .get();
          if (snapshot.exists()) {
            var contracts = [];
            var data = [];

            snapshot.forEach(function (item) {
              const tokenAddress = item.val();
              contracts.push(tokenAddress);
            });

            for (let i = 0; i < contracts.length; i++) {
              const token_address = contracts[i];
              const token = await new web3.eth.Contract(abi, token_address);
              const token_symbol = await token.methods.symbol().call();

              const contract = {
                token_address,
                token_symbol,
              };
              data.push(contract);
            }

            setAccount(addr, ethBalance, data);

            return "ok";
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      return "noMetamask";
    }
    return "newErrorToHandle";
  };

  const changeToken = async (tokenAddress) => {
    const token = await new web3.eth.Contract(abi, tokenAddress);

    const name = await token.methods.name().call();
    const symbol = await token.methods.symbol().call();
    const max_supp = await token.methods
      ._maximumSupply()
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));
    const balance = await token.methods
      .balanceOf(address)
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));

    const total_supp = await token.methods
      .totalSupply()
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));

    const contract = {
      address: tokenAddress,
      name,
      symbol,
      max_supp,
      total_supp,
      instance: token,
      balance,
    };
    setToken(contract);
  };

  //update current token balance
  const updateTokenBalance = async () => {
    const balance = await token.instance.methods
      .balanceOf(address)
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));

    const contract = {
      ...token,
      balance,
    };
    setToken(contract);
  };

  //update current token balance and total supply
  const updateTokenBalances = async () => {
    const balance = await token.instance.methods
      .balanceOf(address)
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));

    const total_supp = await token.instance.methods
      .totalSupply()
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));

    const contract = {
      ...token,
      total_supp,
      balance,
    };
    setToken(contract);
  };

  //update eth balance
  const updateBalance = async (fromAddress) => {
    const ethBalance = await web3.eth
      .getBalance(fromAddress)
      .then((value) => web3.utils.fromWei(value, "ether"));

    setBalance(ethBalance);
  };

  //transfer current token
  const sendTransaction = async (to, bal) => {
    const amount = bal + "";
    const recipient = to;
    /*   SEND ETH
    await web3.eth.sendTransaction({
      from: address,
      to: recipient,
      value: web3.utils.toWei(amount, "ether")
    });
    updateBalance(address);
    */
    try {
      await token.instance.methods
        .transfer(recipient, web3.utils.toWei(amount, "ether"))
        .send({ from: address });

      updateBalance(address);
      updateTokenBalance();
      return true;
    } catch (error) {
      console.log("error happened");
      console.error(error);
      return false;
    }
  };

  //get user eth balance, current token balance and symbol
  const getUserBalance = async (fromAddress) => {
    //eth balance
    let tknData = [];

    const ethBalance = await web3.eth
      .getBalance(fromAddress)
      .then((value) => web3.utils.fromWei(value, "ether"));

    //get all tokens stored in firebase
    //extract data for each token

    try {
      const snapshot = await firebase
        .database()
        .ref(`usersAndContracts/`)
        .get();
      if (snapshot.exists()) {
        var contracts = [];

        snapshot.forEach(function (item) {
          item.forEach(function (item) {
            item.forEach(function (item) {
              const tokenAddress = item.val();
              contracts.push(tokenAddress);
            });
          });
        });

        for (let i = 0; i < contracts.length; i++) {
          const tokenAddress = contracts[i];

          const token = await new web3.eth.Contract(abi, tokenAddress);

          //const tokenName = await token.methods.name().call();
          const symbol = await token.methods.symbol().call();
          /*const max_supp = await token.methods
            ._maximumSupply()
            .call()
            .then((bal) => web3.utils.fromWei(bal, "ether"));*/
          const balance = await token.methods
            .balanceOf(fromAddress)
            .call()
            .then((bal) => web3.utils.fromWei(bal, "ether"));

          //don't show tokens which user does not possess
          if (balance !== "0") {
            const contract = {
              //address: tokenAddress,
              //name: tokenName,
              symbol: symbol,
              balance: balance,
              //max_supp: max_supp,
              //instance: token,
            };
            tknData.push(contract);
          }
        }
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }

    return { ethBalance, tknData };
  };

  //mint current token
  const handleMint = async (bal) => {
    bal = bal + "";

    try {
      await token.instance.methods
        .mint(address, web3.utils.toWei(bal, "ether"))
        .send({ from: address });

      updateBalance(address);
      updateTokenBalances();
      return "ok";
    } catch (error) {
      console.log(error.message);
      const reverterErrorMsg = "Transaction has been reverted by the EVM:";
      const userCanceledOperation =
        "MetaMask Tx Signature: User denied transaction signature.";
      if (error.message.startsWith(reverterErrorMsg)) {
        const receiptString = error.message.slice(reverterErrorMsg.length);

        const receiptJSON = JSON.parse(receiptString);

        console.log(receiptJSON.transactionHash);
        return receiptJSON.transactionHash;
      } else if (error.message.startsWith(userCanceledOperation)) {
        return "userCanceledOperation";
      }
      return "new error to handle :(";
    }
  };

  const makeNewToken = async (name, symbol, max_supp) => {
    let deploy_contract = new web3.eth.Contract(abi, address);
    let account = address;

    // Function Parameter
    let payload = {
      data: bytecode,
      arguments: [name, symbol, web3.utils.toWei(max_supp, "ether")],
    };

    let parameter = {
      from: account,
      //gas: web3.utils.toHex(80000),
      //gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
    };

    // Function Call
    try {
      const newContractInstance = await deploy_contract
        .deploy(payload)
        .send(parameter, (err, transactionHash) => {
          console.log("Transaction Hash :", transactionHash);
        })
        .on("confirmation", () => {});

      console.log(
        "Deployed Contract Address : ",
        newContractInstance.options.address
      );

      setTokens([
        ...tokens,
        {
          token_address: newContractInstance.options.address,
          token_symbol: symbol,
        },
      ]);

      //save token to firebase

      // Create a new post reference with an auto-generated id
      var postListRef = firebase
        .database()
        .ref(`usersAndContracts/${address}/contracts`);

      var newPostRef = postListRef.push();
      newPostRef.set(newContractInstance.options.address);
      return true;
    } catch (error) {
      console.log("error happened");
      console.error(error);

      return false;
    }
  };

  return (
    <div id="main" className="App">
      {address === null && <Redirect to="/" />}

      <Switch>
        <Route exact path="/">
          <Login getUserAccount={getUserAccount} address={address} />
        </Route>

        <Route path="/Dashboard">
          <Dashboard
            handleMint={handleMint}
            handleTransfer={sendTransaction}
            changeToken={changeToken}
          />
        </Route>

        <Route path="/Explore">
          <Explore newSearch={getUserBalance} address={address} />
        </Route>

        <Route path="/create-token">
          <CreateToken address={address} makeNewToken={makeNewToken} />
        </Route>
      </Switch>

      <Copyright />
    </div>
  );
};

export default App;
