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

//stores the information about current user
const initialUser = Object.freeze({
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
});

const App = () => {
  const [AddrHistory, ADD_Address] = useState(initialFormData);
  const [CurrentUser, SetUSer] = useState(initialUser);

  //cookies logic...
  if (!ethereum_address.isAddress(CurrentUser.address)) {
    const cookies = new Cookies();
    const addr = cookies.get("address");
    if (ethereum_address.isAddress(addr)) {
      let addressExists = false;
      AddrHistory.map((target, move) => {
        if (target.address === addr) addressExists = true;
        return "";
      });

      const user = {
        address: addr,
        createdAt: new Date().getTime(),
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
      };

      if (!addressExists) {
        //add address if it exists only in cookie, refresh deletes local storage
        ADD_Address([...AddrHistory, user]);
      }
      SetUSer(user);
    } else {
      cookies.remove("address");
    }
  }

  //minting
  const handleMint = (bal) => {
    const tempHistory = AddrHistory.map((element) => {
      if (element.address === CurrentUser.address) {
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
      console.log(CurrentUser.address + ": " + bal);

      return element;
    });
    ADD_Address(tempHistory);
  };

  //transfer funds
  const handleTransfer = (to, bal) => {
    let success = false;
    const tempHistory = AddrHistory.map((element) => {
      if (element.address === CurrentUser.address && element.balance >= bal) {
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
                from: CurrentUser.address.address,
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
                from: CurrentUser.address.address,
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

    AddrHistory.map((target, move) => {
      if (target.address === addr) {
        addressExists = true;
      }
      return null;
    });

    const user = {
      address: addr,
      createdAt: new Date().getTime(),
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
    };

    if (!addressExists) {
      console.log("adding user");

      ADD_Address([...AddrHistory, user]);
    }

    SetUSer(user);
  };

  return (
    <Router>
      <div className="App">
        {CurrentUser.address === "" ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/Dashboard" />
        )}

        <Switch>
          <Route exact path="/">
            <Login onLoginSuccess={onLoginSuccess} />
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
            <Explore Address={CurrentUser} AddrHistory={AddrHistory} />
          </Route>
        </Switch>

        <Copyright />
      </div>
    </Router>
  );
};

export default App;
