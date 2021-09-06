import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { HiOutlineLogout } from "react-icons/hi";

import { Redirect } from "react-router-dom";

import ModalTransfer from "../components/modals/ModalTransfer";

import ModalMint from "../components/modals/ModalMint";
import { useStoreApi } from "../storeApi";

import { Link } from "react-router-dom";

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
  btn_selected: {
    margin: theme.spacing(2, 2, 2),
    background: "linear-gradient(45deg, #1E6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));

const Dashboard = ({ handleMint, handleTransfer, changeToken }) => {
  const classes = useStyles();
  const { address, ethBalance, token, tokens } = useStoreApi();

  return (
    <Container id="body2" component="main" maxWidth="sm">
      {address === null && <Redirect to="/" />}

      <div className="header">
        <ModalTransfer
          address={address}
          token={token}
          handleTransfer={handleTransfer}
        />
        <ModalMint token={token} handleMint={handleMint} />

        <Link to="/Explore" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" className={classes.btn}>
            Explore
          </Button>
        </Link>

        <Link to="/create-token" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" className={classes.btn}>
            Create new token
          </Button>
        </Link>

        <form action="/" className={classes.form}>
          <button type="submit" className={classes.submit}>
            <HiOutlineLogout size="40px" className={classes.icon} />
          </button>
        </form>
      </div>

      <div className={classes.paper}>
        <p key="addr">ADDRESS: {address}</p>
        <p key="ethBal">{ethBalance} ETH</p>
        {token && (
          <p key="symb">
            {token.balance} {token.symbol}
          </p>
        )}
        {token && (
          <p key="name">
            {token.symbol} - {token.name}
          </p>
        )}
        {token && (
          <p key="maxSupp">
            {token.symbol} max supply: {token.max_supp}
          </p>
        )}
        {token && (
          <p key="totSupp">
            {token.symbol} Total supply: {token.total_supp}
          </p>
        )}
      </div>

      <div className="tokens">
        {tokens.map((item) => {
          return (
            <Button
              key={item.token_address}
              variant="contained"
              color="secondary"
              className={
                token && token.address === item.token_address
                  ? classes.btn_selected
                  : classes.btn
              }
              onClick={() => changeToken(item.token_address)}
            >
              {item.token_symbol}
            </Button>
          );
        })}
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
  address: PropTypes.string,
};

export default Dashboard;
