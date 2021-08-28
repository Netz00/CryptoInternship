import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    background: "#121212",
    borderRadius: 8,
    border: 0,
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));

const Login = ({ getUserAccount, history, address }) => {
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getUserAccount();

    switch (res) {
      case "ok":
        history.push("/Dashboard");
        break;
      case "wrongNet":
        alert(
          "Your MetaMask in on the wrong network. Please switch on Ropsten test-net and try again!"
        );
        break;
      case "noMetamask":
        alert("Metamask extensions not detected!");
        break;
      default:
        alert("Unknown error happened. Please try again later 🙈");
        break;
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      {address !== null && <Redirect to="/Dashboard" />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
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
  getUserAccount: PropTypes.func.isRequired,
};

export default withRouter(Login);