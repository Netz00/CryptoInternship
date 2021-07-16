import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "universal-cookie";
import ButtonHomemade from "./Button";

import { withRouter, Redirect } from "react-router-dom";

import ModalTransfer from "./ModalTransfer";

import ModalMint from "./ModalMint";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
 
  submit: {
    margin: theme.spacing(1, 1, 2),
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
      
      <div class="header">
        <form onSubmit={handleLogoutSubmit}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log out
          </Button>
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
        <ButtonHomemade text="Explore" onClick={handleExplore} />
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
  Address: PropTypes.object.isRequired,
};

export default withRouter(Dashboard);
