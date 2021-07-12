import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "universal-cookie";
import AddressInput from "./AddressInput";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

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

const ethereum_address = require("ethereum-address");

const Login = ({ onLoginSuccess, history }) => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    const address = e.target.elements.address.value.trim();
    const rememberMe = e.target.elements.rememberMe.checked;

    if (ethereum_address.isAddress(address)) {
      const cookies = new Cookies();
      onLoginSuccess(address);

      if (rememberMe) {
        console.log("login s cookiem");

        cookies.set("address", address, { path: "/" });
        //obicni request na /
      } else {
        console.log("login bez cookiem");
        cookies.remove("address");
        //post request na / sa adresom u podacima POSTa
      }

      history.push("/Dashboard");
    } else {
      e.preventDefault();
    }

    //redirect user to / where cookie will be inspected, and if valid redirect him to homepage
  };

  return (
    <Container component="main" maxWidth="sm">
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

          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                id="rememberMe"
                value="yes"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
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
