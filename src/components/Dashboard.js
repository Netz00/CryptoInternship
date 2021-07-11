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
  import NumericInput from './NumericInput';
  import ButtonHomemade from './Button';

  import {
    withRouter,
  } from "react-router-dom";
  import Modal from 'react-modal';


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
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: 'fit-content',
    },
  }));

 // Modal.setAppElement('main');
 Modal.setAppElement(document.getElementById('body2'));

const Dashboard = ({address, AddrHistory,history,handleMint}) => {

  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }


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

     
        const handleMintSubmit = (e) => {
          e.preventDefault();
          handleMint(e.target.elements.NumericInput.value);
       };
       const handleTransfer = (e) => {
     };

    return (
        <Container id="body2"  component="main" maxWidth="sm">
      <CssBaseline />
      {!inpectLogin() ? <Redirect to="/" /> : ''}
      <div className={classes.paper}>

















      <h>ADDRESS: {address}</h>
      <h>BALANCE: {AddrHistory.map(
        target=>{
          if(target.address===address)
              return target.balance;
          return '';
        }
      )}</h>

      <ButtonHomemade text="Mint" onClick={openModal} />

      <div >
      <Modal
      sytle={{backgroundcolor:'green'}}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={classes.content}
        contentLabel="Mint"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Mint</h2>
        <button onClick={closeModal}>close</button>
        <form onSubmit={handleMintSubmit}>

            <NumericInput 
              id="NumericInput"
            />
          <button>Mint</button>
        </form>
      </Modal>
      </div>













   <ButtonHomemade text="Explore" onClick={handleExplore}/>
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