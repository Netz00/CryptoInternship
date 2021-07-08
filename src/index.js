import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import './index.css';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Cookies from 'universal-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";



const TITLE = 'ScamTrade';


const useStyles = makeStyles((theme) => ({
  Typography: {
    position: 'fixed',
    bottom: '2%',
    width: '100%',
  },
}));


function Copyright() {
  const classes = useStyles();
  return (
    <Typography className={classes.Typography} variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        {TITLE}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

class Application extends React.Component {

 

    render () {
      return (
        <React.StrictMode>
          <Router>

            <div className="application">

              <Helmet>
                <title>{ TITLE }</title>
                <style>{'html, body{min-height:100%;} body {  height:100vh;   background: #4DA0B0;  /* fallback for old browsers */background: -webkit-linear-gradient(to bottom, #D39D38, #4DA0B0);  /* Chrome 10-25, Safari 5.1-6 */background: linear-gradient(to bottom, #D39D38, #4DA0B0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ }; height=100%'}</style>
              </Helmet>

              <Box mt={8}>
                <Copyright />
              </Box>



              <Switch>

                <Route exact path="/">
                {inpectCookie() ? <Redirect to="/Dashboard" /> : <SignIn />}
                </Route>
                        
                <Route path="/Dashboard">
                  <Dashboard />
                </Route>

              </Switch>
            </div>
          </Router>
          </React.StrictMode>
      );
    }
  };

const rootElement = document.getElementById("root");
ReactDOM.render(
      <Application />,
  rootElement
);