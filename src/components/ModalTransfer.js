import Button from "@material-ui/core/Button";
import NumericInput from "./NumericInput";
import { useState } from "react";
import AddressInput from "./AddressInput";
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
    console.log(address);
    if (!handleSubmit(address, bal)) updateErrorMsg("Insufficient balance.");
    else updateErrorMsg("Success");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openModal}>
        Transfer
      </Button>

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form onSubmit={onSumbit}>
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
              <AddressInput />
            </div>
            <div class="balanceToSend simple-modal-description">
              <NumericInput />
            </div>

            <div class="msg">
              <p>{errorMsg}</p>
            </div>


            <div class="SumbmitButton simple-modal-description">
              <Button variant="contained" color="primary" type="submit" className={classes.submitButton}>
                Transfer
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalTransfer;
