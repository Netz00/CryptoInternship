import Button from "@material-ui/core/Button";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SubmitButton from "../SubmitButton";
import { useForm } from "react-hook-form";

import mclasses from "./ModalTranfer.module.css";

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

  modal: {
    backgroundColor: "rgb(45 13 13 / 91%)",
  },
}));

const ModalTransfer = ({ address, token, handleTransfer }) => {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    register,
    setError,
    formState: { errors, isSubmitting },
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
    const bal = data.balance;

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
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form onSubmit={handleSubmit(handleTransferSubmit)}>
          <div className={mclasses.container}>
            <div className={mclasses.Transfer}>
              <h2 id="simple-modal-title">Transfer</h2>
            </div>
            <div className={mclasses.B}>
              <FaTimes
                className={classes.exit}
                onClick={closeModal}
                size="40px"
              />
            </div>

            <div className={mclasses.balance}>
              {token ? (
                <p>
                  Current balance: {token.balance} {token.symbol}
                </p>
              ) : (
                <p>Pick token first</p>
              )}
            </div>

            <div className={mclasses.address}>
              <label className="labelTkn" htmlFor="address">
                Address
              </label>

              <input
                className="inputTkn"
                type="text"
                disabled={isSubmitting}
                maxlength="43"
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
            <div className={mclasses.balanceToSend}>
              <label className="labelTkn" htmlFor="balance">
                Balance
              </label>

              <input
                className="inputTkn"
                type="number"
                disabled={isSubmitting}
                step="any"
                placeholder="Balance"
                {...register("balance", {
                  required: "this is a required",
                  min: {
                    value: 0.00000001,
                    message: "Min value is 0.00000001",
                  },
                  max: {
                    value: token && token.balance,
                    message: token && `Max value is ${token.balance}`,
                  },
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

            <div className={mclasses.msg}>
              {errors.balance ? (
                <p className="errorMsg">{errors.balance.message}</p>
              ) : (
                errors.success && (
                  <p className="successMsg">{errors.success.message}</p>
                )
              )}
            </div>

            <div className={mclasses.SumbmitButton}>
              <SubmitButton wait={isSubmitting} text="Transfer" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalTransfer;
