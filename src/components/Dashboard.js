import  PropTypes  from 'prop-types'

import {
    Redirect,
  } from "react-router-dom";
  import React from 'react';
  import Button from '@material-ui/core/Button';
  import CssBaseline from '@material-ui/core/CssBaseline';
  import { makeStyles } from '@material-ui/core/styles';
  import Container from '@material-ui/core/Container';

  import ButtonHomemade from './Button';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundcolor: theme.palette.secondary.main,
    },
    form: {
      width: '80%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const Dashboard = ({address, ALLaddresses}) => {

     const classes = useStyles();
     const handleSubmit = (e) => {
     };
     function inpectLogin(){
         return true;
     }
   /*   


        const handleSubmit = (e) => {
           cookies.remove("address");
        };
 const url_string = window.location.href;
  
    const url_object = new URL(url_string);
    const address = url_object.searchParams.get("address");

  const cookies = new Cookies();
  const ethereum_address = require('ethereum-address');

 

  function inpectLogin(){
    if( ethereum_address.isAddress(address)){
       return true;
    }
    else{
      return true;
    }
  }

*/
const onClick = () => {
    console.log("click");
}
    return (
        <Container component="main" maxWidth="sm">
      <CssBaseline />
      {!inpectLogin() ? <Redirect to="/" /> : ''}
      <div className={classes.paper}>

  <form className={classes.form} onSubmit={handleSubmit}>
      <ButtonHomemade text="button" onClick={onClick}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log out
          </Button>
        </form>

      <p>Welcome to dashboard {address}</p> 
     
      </div>
      </Container>
    )
}

Dashboard.propTypes = {
    address: PropTypes.string.isRequired,
}

export default Dashboard
