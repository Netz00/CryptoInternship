import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "universal-cookie";
import { HiOutlineLogout } from "react-icons/hi";

import { withRouter, Redirect } from "react-router-dom";

import ModalTransfer from "./modals/ModalTransfer";

import ModalMint from "./modals/ModalMint";

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
  Address,
  AddrHistory,
  history,
  handleMint,
  handleTransfer,
}) => {
  const classes = useStyles();
  const cookies = new Cookies();

  console.log("adresa: " + Address.address);
  console.log(AddrHistory);

  const handleLogoutSubmit = (e) => {
    //e.preventDefault();
    cookies.remove("address");
    //history.push("/");
  };

  const handleExplore = (e) => {
    history.push("/Explore");
  };

  return (
    <Container id="body2" component="main" maxWidth="sm">
      {Address.address === "" ? (
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
        <p key="addr">ADDRESS: {Address.address}</p>
        <p key="bal">BALANCE: {Address.balance}</p>
        <br></br>
        <ModalTransfer Address={Address} handleSubmit={handleTransfer} />
        <br></br>
        <ModalMint Address={Address} handleMint={handleMint} />
        <br></br>
        <Button variant="contained" color="primary" onClick={handleExplore}>
          Explore
        </Button>
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
  Address: PropTypes.object.isRequired,
};

export default withRouter(Dashboard);
