import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Copyright from "./components/Copyright";
import Explore from "./components/Explore";
import CreateToken from "./components/CreateToken";
import useWeb3 from "./useWeb3";
import { useStoreApi } from "./storeApi";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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
  //https://github.com/PiotrNap/YouTube-channel-source-code/blob/374a09136b302983248245284af130be4d347d34/React-metamask-intro/src/App.js
  //const { balance, address, message, setAddress, setBalance ,token, setToken, tokens, setTokens} = useStoreApi();
  const {
    address,
    setAddress,
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

  // get user account on button click
  const getUserAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();

        let addr;

        await web3.eth.getAccounts().then((accounts) => {
          setAddress(accounts[0]);
          updateBalance(accounts[0]);
          addr = accounts[0];
        });

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
              const tokenAddress = contracts[i];
              const token = await new web3.eth.Contract(abi, tokenAddress);
              const symbol = await token.methods.symbol().call();

              const contract = {
                token_address: tokenAddress,
                token_symbol: symbol,
              };
              data.push(contract);
            }
            setTokens(data);
            return true;
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
      alert("Metamask extensions not detected!");
    }
    return false;
  };

  const changeToken = async (tokenAddress) => {
    const token = await new web3.eth.Contract(abi, tokenAddress);

    const tokenName = await token.methods.name().call();
    const symbol = await token.methods.symbol().call();
    const max_supp = await token.methods
      ._maximumSupply()
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));
    const balance = await token.methods
      .balanceOf(address)
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));

    const contract = {
      address: tokenAddress,
      name: tokenName,
      symbol: symbol,
      max_supp: max_supp,
      instance: token,
      balance: balance,
    };
    setToken(contract);
  };

  const updateTokenBalance = async () => {
    const balance = await token.instance.methods
      .balanceOf(address)
      .call()
      .then((bal) => web3.utils.fromWei(bal, "ether"));

    const contract = {
      ...token,
      balance: balance,
    };
    setToken(contract);
  };

  const updateBalance = async (fromAddress) => {
    //eth balance
    const ethBalance = await web3.eth
      .getBalance(fromAddress)
      .then((value) => web3.utils.fromWei(value, "ether"));

    setBalance(ethBalance);
  };

  const sendTransaction = async (to, bal) => {
    const amount = bal + "";
    const recipient = to;
    /*    ETH
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

  const getUserBalance = async (fromAddress) => {
    //eth balance
    let data = [];

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

          const contract = {
            //address: tokenAddress,
            //name: tokenName,
            symbol: symbol,
            balance: balance,
            //max_supp: max_supp,
            //instance: token,
          };
          data.push(contract);
        }
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }

    return { eth: ethBalance, tkn: data };
  };

  const handleMint = async (bal) => {
    bal = bal + "";

    try {
      await token.instance.methods
        .mint(address, web3.utils.toWei(bal, "ether"))
        .send({ from: address });

      updateBalance(address);
      updateTokenBalance();
      return true;
    } catch (err) {
      console.log("error happened");
      console.log(err);
      console.log(JSON.parse(err.message.substring(15).trim()).message);
      return false;
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
    <Router>
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
    </Router>
  );
};

export default App;
