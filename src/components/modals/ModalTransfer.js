import Button from "@material-ui/core/Button";
import NumericInput from "../inputs/NumericInput";
import { useState } from "react";
import AddressInput from "../inputs/AddressInput";
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
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  btn:{
    margin: "8px",

    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',

  },
}));

const ModalTransfer = ({ Address, handleSubmit }) => {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorMsg, updateErrorMsg] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onSumbit = (e) => {
    e.preventDefault();
    const address = e.target.elements.address.value.trim();
    const bal = e.target.elements.NumericInput.value.trim();

    if (bal * 1 === 0) updateErrorMsg("Pick value >0 to send.");
    else if (address === Address.address)
      updateErrorMsg("This address belongs to you.");
    else if (!handleSubmit(address, bal))
      updateErrorMsg("Insufficient balance.");
    else updateErrorMsg("Success");
  };

  return (
    <>
      <Button variant="contained" color="secondary" className={classes.btn} onClick={openModal} >
        Transfer
      </Button>

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form onSubmit={onSumbit}>
          <div className="container">
            <div className="Transfer">
              <h2 id="simple-modal-title">Transfer</h2>
            </div>
            <div className="B">
              <FaTimes
                className={classes.exit}
                onClick={closeModal}
                size="40px"
              />
            </div>

            <div className="balance simple-modal-description">
              <p>Current balance: {Address.balance}</p>
            </div>

            <div className="address simple-modal-description">
              <AddressInput />
            </div>
            <div className="balanceToSend simple-modal-description">
              <NumericInput />
            </div>

            <div className="msg">
              <p>{errorMsg}</p>
            </div>

            <div className="SumbmitButton simple-modal-description">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submitButton}
              >
                Transfer
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalTransfer;
