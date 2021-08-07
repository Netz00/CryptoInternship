import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "universal-cookie";
import AddressInput from "./inputs/AddressInput";

import PropTypes from "prop-types";

import { withRouter, Redirect } from "react-router-dom";

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
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}));

const ethereum_address = require("ethereum-address");

const Login = ({ onLoginSuccess, history, CurrentUser }) => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    const address = e.target.elements.address.value.trim();

    if (ethereum_address.isAddress(address)) {
      const cookies = new Cookies();

      onLoginSuccess(address);
      cookies.set("address", address, { path: "/" });

      history.push("/Dashboard");
    } else {
      e.preventDefault();
    }

    //redirect user to / where cookie will be inspected, and if valid redirect him to homepage
  };

  return (
    <Container component="main" maxWidth="sm">
      {CurrentUser.address === "" ? (
        <Redirect to="/" />
      ) : (
        <Redirect to="/Dashboard" />
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          action="/Dashboard"
          onSubmit={handleSubmit}
        >
          <AddressInput />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In with Metamask
          </Button>
        </form>
      </div>
    </Container>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default withRouter(Login);
