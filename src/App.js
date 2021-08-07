import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Copyright from "./components/Copyright";
import Explore from "./components/Explore";

import useWeb3 from "./useWeb3";
import { useStoreApi } from "./storeApi";

import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  //https://github.com/PiotrNap/YouTube-channel-source-code/blob/374a09136b302983248245284af130be4d347d34/React-metamask-intro/src/App.js
  //const { balance, address, message, setAddress, setBalance } = useStoreApi();
  const {  address, setAddress, setBalance } = useStoreApi();
  const WEB3 = useWeb3();


  const updateBalance = async (fromAddress) => {
    //eth balance

    let ethBalance,tokenBalance;
     await WEB3.web3.eth.getBalance(fromAddress).then(value => {
      ethBalance=WEB3.web3.utils.fromWei(value, "ether");
    });

    //erc20 token balance
    await WEB3.tokenInst.methods
      .balanceOf(fromAddress)
      .call()
      .then(function (bal) {
        tokenBalance= WEB3.web3.utils.fromWei(bal, "ether");
      });
      console.log({eth:ethBalance,tkn:tokenBalance});
      setBalance({eth:ethBalance,tkn:tokenBalance});
  };


  const getUserBalance = async (fromAddress) => {

//eth balance
let ethBalance,tokenBalance;
await WEB3.web3.eth.getBalance(fromAddress).then(value => {
 ethBalance=WEB3.web3.utils.fromWei(value, "ether");
});

//erc20 token balance
await WEB3.tokenInst.methods
 .balanceOf(fromAddress)
 .call()
 .then(function (bal) {
   tokenBalance= WEB3.web3.utils.fromWei(bal, "ether");
 });
 console.log({eth:ethBalance,tkn:tokenBalance});


      return {eth:ethBalance,tkn:tokenBalance};
  };


  return (
    <Router>
      <div id="main" className="App">
        {CurrentUser.address === "" ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/Dashboard" />
        )}

        <Switch>
          <Route exact path="/">
            <Login onLoginSuccess={onLoginSuccess} CurrentUser={CurrentUser} />
          </Route>

          <Route path="/Dashboard">
            <Dashboard
              Address={CurrentUser}
              AddrHistory={AddrHistory}
              handleMint={handleMint}
              handleTransfer={handleTransfer}
            />
          </Route>

          <Route path="/Explore">
            <Explore
              newSearch={getUserBalance}
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
