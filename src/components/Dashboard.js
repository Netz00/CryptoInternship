import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { HiOutlineLogout } from "react-icons/hi";

import { withRouter, Redirect } from "react-router-dom";

import ModalTransfer from "./modals/ModalTransfer";

import ModalMint from "./modals/ModalMint";
import { useStoreApi } from "../storeApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "initial",

    color: "aliceblue",
    fontFamily: "cursive",

    background: "#121212",
    width: "fit-content",
    height: "fit-content",
    borderRadius: "20px",
    padding: "10px",
  },

  submit: {
    margin: theme.spacing(1, 1),
    background: "transparent",
    border: "0px",
  },
  icon: {
    color: "aliceblue",
    cursor: "pointer",
  },

  form: {
    marginLeft: "auto",
    width: "fit-content",
    height: "fit-content",
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

const Dashboard = ({ history, handleMint, handleTransfer }) => {
  const classes = useStyles();

  const { balance, address, ethBalance } = useStoreApi();




  return (
    <Container id="body2" component="main" maxWidth="sm">
      {address === null && <Redirect to="/" />}

      <div className="header">
        <ModalTransfer
          address={address}
          balance={balance}
          handleSubmit={handleTransfer}
        />
        <ModalMint balance={balance} handleMint={handleMint} />
        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => {
            history.push("/Explore");
          }}
        >
          Explore
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => {
            history.push("/create-token");
          }}
        >
          Create new token
        </Button>

        <form action="/" className={classes.form}>
          <button type="submit" className={classes.submit}>
            <HiOutlineLogout size="40px" className={classes.icon} />
          </button>
        </form>
      </div>

      <div className={classes.paper}>
        <p key="addr">ADDRESS: {address}</p>
        <p key="ethBal">ETH balance: {ethBalance}</p>
        <p key="bal">AYM token balance: {balance}</p>
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
  address: PropTypes.string,
};

export default withRouter(Dashboard);
