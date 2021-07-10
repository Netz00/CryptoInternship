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

 const initialFormData = Object.freeze([
   {
  address:"",
      createdAt:"",
      balance:0,
      transactions:[{
        to:"",
        howMany:0,
        when:"",
      }],
    }
    ]);

    const initialUser = Object.freeze("");


const App=({address})=> {

  const [AddrHistory, ADD_Address] = useState(initialFormData);
  const [CurrentUser, SetUSer] = useState(initialUser);

//ADD_Address([...ALLaddresses,{ NEW ADDRESS }])
/*{
  ALLaddresses.map((address,move)=>(
  <h3 key={move}>{address.address}</h3>
                                    ))
  }
*/
address=CurrentUser;

if(!ethereum_address.isAddress(address)){
  const cookies = new Cookies();
  if(ethereum_address.isAddress(cookies.get('address')))
    address = cookies.get('address');
  else
  {
    address="";
    cookies.remove("address");

  }
  
}



//after successful login add new address if it doesn't exist
const onLoginSuccess = (addr) => {
      address = addr;
      console.log("APP"+address);
      var addressExists=false;

      SetUSer(addr);


      AddrHistory.map(element => {
        if(element.address===addr)
          addressExists=true;
        return null;
      });

      if(!addressExists)
        ADD_Address([...AddrHistory,{ 
          address:addr,
          createdAt:new Date().getTime(),
          balance:0,
          transactions:[{
            to:"",
            howMany:0,
            when:"",
          }],
        }]);       
   
};

      return (
          <Router>
            <div className="App">
              

            {address!=="" ? <Redirect to="/Dashboard" /> : <Redirect to="/" />}

              <Switch>

                <Route exact path="/">
                 <Login onLoginSuccess={onLoginSuccess} />
                </Route>
                        
                <Route path="/Dashboard">
                <Dashboard address={address} AddrHistory={AddrHistory}/>
                </Route>

              </Switch>

              <Copyright />
            </div>
          </Router>
      );
    
  }

  export default App;
