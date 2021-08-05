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
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  submit: {
    margin: theme.spacing(1, 1),
    background: "transparent",
    border: "0px",
  },
  icon: {
    color: "black",
    cursor: "pointer",
  },

  form: {
    marginLeft: "auto",
    width: "fit-content",
    height: "fit-content",
  },
}));

const Dashboard = ({
  history,
  handleMint,
  handleTransfer
}) => {
  const classes = useStyles();

  const { balance, address } = useStoreApi();



  console.log("adresa: " + address);

  const handleLogoutSubmit = (e) => {
    //e.preventDefault();
  };

  const handleExplore = (e) => {
    history.push("/Explore");
  };

  return (
    <Container id="body2" component="main" maxWidth="sm">
      {address === null ? (
        <Redirect to="/" />
      ) : (
        <Redirect to="/Dashboard" />
      )}

      <div className="header">
        <form onSubmit={handleLogoutSubmit} className={classes.form}>
          <button type="submit" className={classes.submit}>
            <HiOutlineLogout size="40px" className={classes.icon} />
          </button>
        </form>
      </div>

      <div className={classes.paper}>
        <p key="addr">ADDRESS: {address}</p>
        <p key="bal">BALANCE: {balance}</p>
        <br></br>
        <ModalTransfer address={address} balance={balance} handleSubmit={handleTransfer} />
        <br></br>
        <ModalMint balance={balance} handleMint={handleMint} />
        <br></br>
        <Button variant="contained" color="primary" onClick={handleExplore}>
          Explore
        </Button>
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
  address: PropTypes.string.isRequired,
};

export default withRouter(Dashboard);
