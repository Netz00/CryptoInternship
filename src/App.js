import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Copyright from "./components/Copyright";
import Explore from "./components/Explore";

import useWeb3 from "./useWeb3";
import { useStoreApi } from "./storeApi";

import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  //https://github.com/PiotrNap/YouTube-channel-source-code/blob/374a09136b302983248245284af130be4d347d34/React-metamask-intro/src/App.js
  const { balance, address, message, setAddress, setBalance } = useStoreApi();
  const [searchRes, setResultBalance] = useState(0);

  const WEB3 = useWeb3();

  // get user account on button click
  const getUserAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();

        WEB3.web3.eth.getAccounts().then((accounts) => {
          setAddress(accounts[0]);
          updateBalance(accounts[0]);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Metamask extensions not detected!");
    }
  };

  const updateBalance = async (fromAddress) => {
    //eth balance
    /* await web3.eth.getBalance(fromAddress).then(value => {
      setBalance(web3.utils.fromWei(value, "ether"));
    });*/

    //erc20 token balance
    await WEB3.tokenInst.methods
      .balanceOf(fromAddress)
      .call()
      .then(function (bal) {
        setBalance(WEB3.web3.utils.fromWei(bal, "ether"));
      });
  };

  const sendTransaction = async (to, bal) => {
    const amount = bal;
    const recipient = to;
    /*    ETH
    await WEB3.web3.eth.sendTransaction({
      from: address,
      to: recipient,
      value: WEB3.web3.utils.toWei(amount, "ether")
    });
    updateBalance(address);
*/

    await WEB3.tokenInst.methods
      .transfer(recipient, WEB3.web3.utils.toWei(amount, "ether"))
      .send({ from: address });

    updateBalance(address);
  };

  const getUserBalance = async (fromAddress) => {
    /* await web3.eth.getBalance(fromAddress).then(wei => {
      setResultBalance(web3.utils.fromWei(wei, "ether"));
    });
*/
    await WEB3.tokenInst.methods
      .balanceOf(fromAddress)
      .call()
      .then(function (bal) {
        setResultBalance(WEB3.web3.utils.fromWei(bal, "ether"));
      });
  };


  //minting
  const handleMint = async (bal) => {
    bal = bal + "";
    await WEB3.tokenInst.methods
      .mint(address, WEB3.web3.utils.toWei(bal, "ether"))
      .send({ from: address });

      updateBalance(address);

    return true;
  };

  return (
    <Router>
      <div id="main" className="App">
        {address === null ? <Redirect to="/" /> : <Redirect to="/Dashboard" />}

        <Switch>
          <Route exact path="/">
            <Login getUserAccount={getUserAccount} address={address} />
          </Route>

          <Route path="/Dashboard">
            <Dashboard
              handleMint={handleMint}
              handleTransfer={sendTransaction}
            />
          </Route>

          <Route path="/Explore">
            <Explore
              newSearch={getUserBalance}
              balance={searchRes}
              address={address}
            />
          </Route>
        </Switch>

        <Copyright />
      </div>
    </Router>
  );
};

export default App;
