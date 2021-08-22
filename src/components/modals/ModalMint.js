import { useState } from "react";
import Button from "@material-ui/core/Button";
import { FaTimes } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SubmitButton from "../SubmitButton";

import { useForm } from "react-hook-form";

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

const ModalMint = ({ token, handleMint }) => {
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

  const handleMintSubmit = async (data) => {
    const bal = data.balance * 1;
    if (token === null)
      setError("balance", {
        type: "manual",
        message: "Which token???",
      });
    else {
      setWait(true);
      const res = await handleMint(bal);
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
        Mint
      </Button>

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form onSubmit={handleSubmit(handleMintSubmit)}>
          <div class="mint_container">
            <div class="Mint">
              <h2 id="simple-modal-title">Mint</h2>
            </div>
            <div class="close simple-modal-description">
              <FaTimes
                className={classes.exit}
                onClick={closeModal}
                size="40px"
              />
            </div>
            <div class="balance simple-modal-description">
              {token ? (
                <p>
                  {token.balance} {token.symbol}
                </p>
              ) : (
                <p>Pick token first</p>
              )}
            </div>
            <div class="max_supply simple-modal-description">
              {token && (
                <p>
                  {token.max_supp} {token.symbol} MAX
                </p>
              )}
            </div>

            <div class="input_balance simple-modal-description">
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
            <div class="error_msg simple-modal-description">
              {errors.balance ? (
                <p className="errorMsg">{errors.balance.message}</p>
              ) : (
                errors.success && (
                  <p className="successMsg">{errors.success.message}</p>
                )
              )}
            </div>
            <div class="submit simple-modal-description">
              <SubmitButton wait={wait} text="Mint" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalMint;
