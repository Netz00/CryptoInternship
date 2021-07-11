import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Copyright from "./components/Copyright";
import Explore from "./components/Explore";

import "./index.css";

import { useState } from "react";

import Cookies from "universal-cookie";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const ethereum_address = require("ethereum-address");

//stores information about entire "blockhain"
const initialFormData = Object.freeze([
  {
    address: "",
    createdAt: "",
    balance: 0,
    transactions: [
      {
        to: "",
        howMany: 0,
        when: "",
      },
    ],
    transactionsIn: [
      {
        from: "",
        howMany: 0,
        when: "",
      },
    ],
  },
]);

//stores the "pointer" to current user in blockchain
const initialUser = Object.freeze(0);

const App = ({ Address }) => {
  const [AddrHistory, ADD_Address] = useState(initialFormData);
  const [CurrentUser, SetUSer] = useState(initialUser);

  Address = AddrHistory[CurrentUser];
  if (CurrentUser !== 0)
    if (!ethereum_address.isAddress(Address.address)) {
      const cookies = new Cookies();
      const addr = cookies.get("address");
      if (ethereum_address.isAddress(addr)) {
        let i = 0;
        AddrHistory.map((target, move) => {
          if (target.address === addr) i = move;
          return "";
        });
        Address = AddrHistory[i];
      } else {
        Address = AddrHistory[0];
        cookies.remove("address");
      }
    }

  const handleMint = (bal) => {
    const tempHistory = AddrHistory.map((element) => {
      if (element.address === Address.address) {
        element.balance = +bal;
        element.transactions = [
          ...element.transactions,
          {
            to: "MINT",
            howMany: bal,
            when: new Date().getTime(),
          },
        ];
      }
      console.log(CurrentUser + ": " + bal);

      return element;
    });
    ADD_Address(tempHistory);
  };

  const handleTransfer = (to, bal) => {
    let success = false;
    const tempHistory = AddrHistory.map((element) => {
      if (element.address === Address.address && element.balance >= bal) {
        success = true;
        element.balance -= bal;
        element.transactions = [
          ...element.transactions,
          {
            to: to,
            howMany: bal,
            when: new Date().getTime(),
          },
        ];
      }
      return element;
    });
    if (!success) return false;
    else {
      ADD_Address(tempHistory);
      var addressExists = false;

      AddrHistory.map((target, move) => {
        if (target.address === to) {
          addressExists = true;
        }
        return null;
      });

      if (!addressExists) {
        ADD_Address([
          ...AddrHistory,
          {
            address: to,
            createdAt: new Date().getTime(),
            balance: bal,
            transactions: [
              {
                to: "",
                howMany: 0,
                when: "",
              },
            ],
            transactionsIn: [
              {
                from: Address.address,
                howMany: bal,
                when: new Date().getTime(),
              },
            ],
          },
        ]);
      } else {
        const tempHistory2 = AddrHistory.map((element) => {
          if (element.address === to) {
            element.balance += bal;
            element.transactionsIn = [
              ...element.transactionsIn,
              {
                from: Address.address,
                howMany: bal,
                when: new Date().getTime(),
              },
            ];
          }
          return element;
        });

        ADD_Address(tempHistory2);
      }
      //add balance to otheracc
      return true;
    }
  };

  //after successful login add new address if it doesn't exist
  const onLoginSuccess = (addr) => {
    var addressExists = false;
    var i = 0;

    AddrHistory.map((target, move) => {
      if (target.address === addr) {
        i = move;
        addressExists = true;
      }
      return null;
    });

    if (!addressExists)
      ADD_Address([
        ...AddrHistory,
        {
          address: addr,
          createdAt: new Date().getTime(),
          balance: 100,
          transactions: [
            {
              to: "",
              howMany: 0,
              when: "",
            },
          ],
          transactionsIn: [
            {
              from: "",
              howMany: 0,
              when: "",
            },
          ],
        },
      ]);

    AddrHistory.map((target, move) => {
      if (target.address === addr) {
        i = move;
      }

      return null;
    });

    Address = AddrHistory[i];

    SetUSer(i);
  };

  return (
    <Router>
      <div className="App">
        {Address.address !== "" ? (
          <Redirect to="/Dashboard" />
        ) : (
          <Redirect to="/" />
        )}

        <Switch>
          <Route exact path="/">
            <Login onLoginSuccess={onLoginSuccess} />
          </Route>

          <Route path="/Dashboard">
            <Dashboard
              Address={Address}
              AddrHistory={AddrHistory}
              handleMint={handleMint}
              handleTransfer={handleTransfer}
            />
          </Route>

          <Route path="/Explore">
            <Explore Address={Address} AddrHistory={AddrHistory} />
          </Route>
        </Switch>

        <Copyright />
      </div>
    </Router>
  );
};

export default App;
