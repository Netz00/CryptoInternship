import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "universal-cookie";
import ButtonHomemade from "./Button";

import { withRouter } from "react-router-dom";

import ModalTransfer from "./ModalTransfer";

import ModalMint from "./ModalMint";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundcolor: theme.palette.secondary.main,
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

  function inpectLogin() {
    return true;
  }
  console.log("adresa: " + Address.address);
  console.log(AddrHistory);

  var i = 0;
  AddrHistory.map((target, move) => {
    if (target.address === Address.address) i = move;
    return "";
  });

  const thisUser = AddrHistory[i];



  const handleLogoutSubmit = (e) => {
    e.preventDefault();
    cookies.remove("address");
    history.push("/");
  };

  const handleExplore = (e) => {
    history.push("/Explore");
  };





  const handleTransfer2 = (adr,bal) => {
    handleTransfer(adr,bal);
  };

  return (
    <Container id="body2" component="main" maxWidth="sm">
      <CssBaseline />
      {!inpectLogin() ? <Redirect to="/" /> : ""}

      <div className={classes.paper}>

        <p key="addr">ADDRESS: {Address.address}</p>
        <p key="bal">BALANCE: {thisUser.balance}</p>
        <p key="date">CREATED AT: {new Date(thisUser.createdAt).toUTCString()}</p>
        <p key="transac">TRANSACTIONS:</p>
        {thisUser.transactions.map((transaction,move) => {
          return (
            <p key={move}>
              TO ADDRESS: {transaction.to}
              <br></br>
              BALANCE: {transaction.howMany}
              <br></br>
              DATE: {transaction.when}
            </p>
          );
        })}


        <ModalTransfer handleSubmit={handleTransfer2}/>

        <ModalMint handleMint={handleMint}/>


        <ButtonHomemade text="Explore" onClick={handleExplore} />

        <form className={classes.form} onSubmit={handleLogoutSubmit}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log out
          </Button>
        </form>
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
  Address: PropTypes.object.isRequired,
};

export default withRouter(Dashboard);
