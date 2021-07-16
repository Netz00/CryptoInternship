import NumericInput from "./NumericInput";
import { useState } from 'react';
import Button from "@material-ui/core/Button";
import { FaTimes } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";



const useStyles = makeStyles((theme) => ({
  paper: {
    height: "fit-content",
    position: "relative",
    width: 500,
    backgroundColor: "#424242",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "inline-flex",
  },
  exit: {
    color: "red",
    cursor: "pointer",
  },
  submitButton: {
    cursor: "pointer",
  },
}));



const ModalMint = ({Address,handleMint}) => {
    const classes = useStyles();
    const [modalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
      }
    
  
    
      function closeModal() {
        setIsOpen(false);
      }
    
      const handleMintSubmit = (e) => {
        e.preventDefault();
        handleMint(e.target.elements.NumericInput.value);
      };
    
  return (

    <div>
    <Button variant="contained" color="primary" onClick={openModal}>
    Mint
    </Button>

    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <form onSubmit={handleMintSubmit}>
        <div class="container">
          <div class="Transfer">
            <h2 id="simple-modal-title">Transfer</h2>
          </div>
          <div class="B">
            <FaTimes className={classes.exit} onClick={closeModal} size="40px"/>
          </div>

          <div class="balance simple-modal-description">
            <p>Current balance: {Address.balance}</p>
          </div>

          <div class="address simple-modal-description">
          
          </div>
          <div class="balanceToSend simple-modal-description">
            <NumericInput />
          </div>

          <div class="msg">
          </div>


          <div class="SumbmitButton simple-modal-description">
            <Button variant="contained" color="primary" type="submit" className={classes.submitButton}>
            Mint
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  </div>





      
   
  );
};

export default ModalMint;
