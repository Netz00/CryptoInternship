import Button from "@material-ui/core/Button";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SubmitButton from "../SubmitButton";
import { useForm } from "react-hook-form";

const ethereum_address = require("ethereum-address");

const useStyles = makeStyles((theme) => ({
  exit: {
    color: "red",
    cursor: "pointer",
  },
  btn: {
    margin: theme.spacing(2, 2, 2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));

const ModalTransfer = ({ address, token, handleTransfer }) => {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [wait, setWait] = useState(false);

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    clearErrors();
    setIsOpen(false);
  };

  const handleTransferSubmit = async (data) => {
    const _address = data.address;
    const bal = data.balance * 1;

    if (token === null)
      setError("balance", {
        type: "manual",
        message: "Which token???",
      });
    else if (_address === address)
      setError("address", {
        type: "manual",
        message: "This address belongs to you.",
      });
    else if (token.balance < bal)
      setError("balance", {
        type: "manual",
        message: "Insufficient balance.",
      });
    else if (!ethereum_address.isAddress(address))
      setError("address", {
        type: "manual",
        message: "Invalid etherium address.",
      });
    else {
      setWait(true);
      const res = await handleTransfer(_address, bal);
      res
        ? setError("success", {
            type: "manual",
            message: "Completed.",
          })
        : setError("balance", {
            type: "manual",
            message: "Error happened check metamask for more info.",
          });

      setWait(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className={classes.btn}
        onClick={openModal}
      >
        Transfer
      </Button>

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form onSubmit={handleSubmit(handleTransferSubmit)}>
          <div className="container">
            <div className="Transfer">
              <h2 id="simple-modal-title">Transfer</h2>
            </div>
            <div className="B simple-modal-description">
              <FaTimes
                className={classes.exit}
                onClick={closeModal}
                size="40px"
              />
            </div>

            <div className="balance simple-modal-description">
              {token ? (
                <p>
                  Current balance: {token.balance} {token.symbol}
                </p>
              ) : (
                <p>Pick token first</p>
              )}
            </div>

            <div className="address simple-modal-description">
              <label className="labelTkn" htmlFor="address">
                Address
              </label>

              <input
                className="inputTkn"
                type="text"
                placeholder="Address"
                {...register("address", {
                  required: "this is a required",
                  minLength: {
                    value: 42,
                    message: "Min length is 42",
                  },
                  maxLength: {
                    value: 42,
                    message: "Max length is 42",
                  },
                  pattern: {
                    value: /^0x[a-fA-F0-9]{40}$/,
                    message: "Invalid etherium address.",
                  },
                })}
              />

              {errors.address && (
                <p className="errorMsg">{errors.address.message}</p>
              )}
            </div>
            <div className="balanceToSend simple-modal-description">
              <label className="labelTkn" htmlFor="balance">
                Balance
              </label>

              <input
                className="inputTkn"
                type="number"
                step="any"
                placeholder="Balance"
                {...register("balance", {
                  required: "this is a required",
                  min: { value: 1, message: "Min value is 1" },
                  maxLength: {
                    value: 30,
                    message: "Max length is 30",
                  },
                  pattern: {
                    value: /^\d+(\.\d{0,8})?$/i,
                    message: "8 decimals max",
                  },
                })}
              />
            </div>

            <div className="msg">
              {errors.balance ? (
                <p className="errorMsg">{errors.balance.message}</p>
              ) : (
                errors.success && (
                  <p className="successMsg">{errors.success.message}</p>
                )
              )}
            </div>

            <div className="SumbmitButton simple-modal-description">
              <SubmitButton wait={wait} text="Transfer" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalTransfer;
