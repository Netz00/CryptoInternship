import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn';
import './index.css';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'

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

class Application extends React.Component {

    handleLogin(adr){

        
    }
    render () {
      return (
          <div className="application">
              <Helmet>
                  <title>{ TITLE }</title>
                  <style>{'html, body{min-height:100%;} body {  height:100vh;   background: #4DA0B0;  /* fallback for old browsers */background: -webkit-linear-gradient(to bottom, #D39D38, #4DA0B0);  /* Chrome 10-25, Safari 5.1-6 */background: linear-gradient(to bottom, #D39D38, #4DA0B0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ }; height=100%'}</style>
              </Helmet>
              <SignIn 
              onSuccessfullLogin={(adr) => this.handleLogin(adr)}
              />
                <Box mt={8}>
        <Copyright />
      </Box>
          </div>
      );
    }
  };

ReactDOM.render(
    <Application />,
    document.getElementById('root')
  );
