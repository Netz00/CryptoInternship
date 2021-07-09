import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Copyright from './components/Copyright';

import './index.css';

import { useState } from 'react';


import Cookies from 'universal-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


 const ethereum_address = require('ethereum-address');

 function inpectCookie(){
    const cookies = new Cookies();
    if( ethereum_address.isAddress( cookies.get('address'))){
       return true;
    }
    else{
      cookies.remove("address");
      return false;
    }
  }



const App=()=> {


  const [ALLaddresses, ADD_Address]=useState([
    {
      address:"",
      createdAt:"",
      balance:0,
      transactions:[{
        to:"",
        howMany:0,
        when:"",
      }],
    },
  ]);
//ADD_Address([...ALLaddresses,{ NEW ADDRESS }])
/*{
  ALLaddresses.map((address,move)=>(
  <h3 key={move}>{address.address}</h3>
                                    ))
  }
*/

//after successful login add new address if it doesnt exist
const onLoginSuccess = (addr) => {
  var addressExists=false;

  ALLaddresses.map((address,move)=>{
    if(address.address===addr)
      addressExists=true;
    return null;
  })
if(!addressExists)
  ADD_Address([...ALLaddresses,{ 
    address:addr,
    createdAt:new Date().getTime(),
    balance:0,
    transactions:[{
      to:"",
      howMany:0,
      when:"",
    }],
  }]);
}

      return (
          <Router>
            <div className="App">
              
              <Switch>

                <Route exact path="/">
                {inpectCookie() ? <Redirect to="/Dashboard" /> : <Login loginCallback={(adr) => onLoginSuccess(adr)} />}
                </Route>
                        
                <Route path="/Dashboard">
                  <Dashboard address="0xd10a56a2d84e1f223d6a5289146ded8b649b1377" ALLaddresses={ALLaddresses}/>
                </Route>

              </Switch>

              <Copyright />
            </div>
          </Router>
      );
    
  }

  export default App;
