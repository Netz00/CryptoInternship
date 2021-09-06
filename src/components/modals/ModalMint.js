import { useState } from "react";
import Button from "@material-ui/core/Button";
import { FaTimes } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SubmitButton from "../SubmitButton";
import Link from "@material-ui/core/Link";

import { useForm } from "react-hook-form";

import mclasses from "./ModalMint.module.css";

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

const ModalMint = ({ token, handleMint }) => {
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

  const handleMintSubmit = async (data) => {
    const bal = data.balance;
    if (token === null)
      setError("balance", {
        type: "manual",
        message: "Which token???",
      });
    else {
      const res = await handleMint(bal);

      switch (res) {
        case "ok":
          setError("success", {
            type: "manual",
            message: "Completed.",
          });
          break;
        case "userCanceledOperation":
          setError("balance", {
            type: "manual",
            message: "Action aborted.",
          });
          break;
        case "new error to handle :(":
          setError("balance", {
            type: "manual",
            message: "Unknown error happened. Please try again later 🙈",
          });
          break;
        default:
          setError("metamask", {
            type: "manual",
            message: res,
          });
          break;
      }
      console.log(res);
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
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form onSubmit={handleSubmit(handleMintSubmit)}>
          <div className={mclasses.mint_container}>
            <div className={mclasses.Mint}>
              <h2 id="simple-modal-title">Mint</h2>
            </div>
            <div className={mclasses.close}>
              <FaTimes
                className={classes.exit}
                onClick={closeModal}
                size="40px"
              />
            </div>
            <div className={mclasses.balance}>
              {token ? (
                <p>
                  {token.balance} {token.symbol}
                </p>
              ) : (
                <p>Pick token first</p>
              )}
            </div>
            <div className={mclasses.max_supply}>
              {token && (
                <p>
                  {token.max_supp} {token.symbol} MAX
                </p>
              )}
            </div>

            <div className={mclasses.input_balance}>
              <label className="labelTkn" htmlFor="balance">
                Balance
              </label>

              <input
                className="inputTkn"
                type="number"
                step="any"
                disabled={isSubmitting}
                placeholder="Balance"
                {...register("balance", {
                  required: "this is a required",
                  min: {
                    value: 0.00000001,
                    message: "Min value is 0.00000001",
                  },
                  max: {
                    value: token && token.max_supp - token.total_supp,
                    message:
                      token &&
                      `Max value is ${token.max_supp - token.total_supp}`,
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
            <div className={mclasses.error_msg}>
              {errors.metamask ? (
                <Link
                  rel="noopener"
                  target="_blank"
                  color="inherit"
                  href={
                    "https://ropsten.etherscan.io/tx/" + errors.metamask.message
                  }
                >
                  <p className="errorMsg">
                    Error happened, click here for more info.
                  </p>
                </Link>
              ) : errors.balance ? (
                <p className="errorMsg">{errors.balance.message}</p>
              ) : (
                errors.success && (
                  <p className="successMsg">{errors.success.message}</p>
                )
              )}
            </div>
            <div className={mclasses.submit}>
              <SubmitButton wait={isSubmitting} text="Mint" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalMint;
