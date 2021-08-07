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
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "initial",

    color:"aliceblue",
    fontFamily:"cursive",

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
  btn:{
    margin: "8px",

    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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

<<<<<<< Updated upstream
  console.log("adresa: " + Address.address);
  console.log(AddrHistory);
=======
  const { balance, address,ethBalance } = useStoreApi();



  console.log("adresa: " + address);
>>>>>>> Stashed changes

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

      <ModalTransfer address={address} balance={balance} handleSubmit={handleTransfer} />
      <ModalMint balance={balance} handleMint={handleMint} />
      <Button variant="contained" color="secondary" className={classes.btn} onClick={handleExplore}>
          Explore
        </Button>
        <form onSubmit={handleLogoutSubmit} className={classes.form}>
          <button type="submit" className={classes.submit}>
            <HiOutlineLogout size="40px" className={classes.icon} />
          </button>
        </form>
      </div>

      <div className={classes.paper}>
<<<<<<< Updated upstream
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
=======
        <p key="addr">ADDRESS: {address}</p>
        <p key="ethBal">ETH BALANCE: {ethBalance}</p>
        <p key="bal">TOKEN BALANCE: {balance}</p>
>>>>>>> Stashed changes
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
<<<<<<< Updated upstream
  Address: PropTypes.object.isRequired,
=======
  address: PropTypes.string,
>>>>>>> Stashed changes
};

export default withRouter(Dashboard);
