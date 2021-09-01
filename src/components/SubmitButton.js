import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
    submitButton: {
      cursor: "pointer",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    circularProgress: {
      color: "white",
    },
  }));


const SubmitButton = ({wait,text}) => {

    const classes = useStyles();
    return (
        <>
            {wait ? (
              <CircularProgress className={classes.circularProgress} />
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submitButton}
              >
                {text}
              </Button>
            )}
        </>
    )
}

SubmitButton.defaultProps = {
  wait: false,
};

export default SubmitButton
