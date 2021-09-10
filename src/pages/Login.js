import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import MetamaskHead from "../components/MetamaskHead";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#121212",
    borderRadius: 8,
    border: 0,
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  circularProgress: {
    color: "black",
  },
}));

const Login = ({ getUserAccount, history, address }) => {
  const classes = useStyles();

  const {
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async () => {
    const res = await getUserAccount();

    switch (res) {
      case "ok":
        clearErrors();
        history.push("/Dashboard");
        break;
      case "wrongNet":
        setError("LoginFailed", {
          type: "manual",
          message:
            "Your MetaMask in on the wrong network. Please switch on Ropsten test-net and try again!",
        });
        break;
      case "noMetamask":
        setError("LoginFailed", {
          type: "manual",
          message: "Metamask extensions not detected!",
        });
        break;
      default:
        setError("LoginFailed", {
          type: "manual",
          message: "Unknown error happened. Please try again later 🙈",
        });
        break;
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      {address !== null && <Redirect to="/Dashboard" />}
      <CssBaseline />
      <div className={classes.paper}>
        <MetamaskHead />

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <CircularProgress className={classes.circularProgress} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In with Metamask
            </Button>
          )}
          {errors.LoginFailed && (
            <p className="errorMsg">{errors.LoginFailed.message}</p>
          )}
        </form>
      </div>
    </Container>
  );
};

Login.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
};

export default withRouter(Login);
