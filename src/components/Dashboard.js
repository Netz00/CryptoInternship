import  PropTypes  from 'prop-types'

import {
    Redirect,
  } from "react-router-dom";
  import React from 'react';
  import Button from '@material-ui/core/Button';
  import CssBaseline from '@material-ui/core/CssBaseline';
  import { makeStyles } from '@material-ui/core/styles';
  import Container from '@material-ui/core/Container';
  import Cookies from 'universal-cookie';

  import ButtonHomemade from './Button';

  import {
    withRouter,
  } from "react-router-dom";
  

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


const Dashboard = ({address, AddrHistory,history}) => {

     const classes = useStyles();
     const cookies = new Cookies();

     function inpectLogin(){
         return true;
     }
     console.log("adresa: "+address);
     console.log(AddrHistory);

    


        const handleSubmit = (e) => {
          e.preventDefault();
           cookies.remove("address");
           history.push("/"); 
        };

        const handleExplore = (e) => {
           history.push("/Explore"); 
        };
        const handleMint = (e) => {
       };
       const handleTransfer = (e) => {
     };

    return (
        <Container component="main" maxWidth="sm">
      <CssBaseline />
      {!inpectLogin() ? <Redirect to="/" /> : ''}
      <div className={classes.paper}>

   <ButtonHomemade text="Explore" onClick={handleExplore}/>
      <ButtonHomemade text="Mint" onClick={handleMint}/>
      <ButtonHomemade text="Transfer" onClick={handleTransfer}/>


  <form className={classes.form} onSubmit={handleSubmit}>
   
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

export default withRouter(Dashboard)