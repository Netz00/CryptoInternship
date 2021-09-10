import { withRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { HiBackspace } from "react-icons/hi";
import { useForm } from "react-hook-form";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";
import mclasses from "./CreateToken.module.css";

const useStyles = makeStyles((theme) => ({
  back: {
    margin: theme.spacing(1, 1, 2),
    color: "aliceblue",
    cursor: "pointer",
  },
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

const CreateToken = ({ address, history, makeNewToken }) => {
  const classes = useStyles();

  const {
    register,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    //alert(JSON.stringify(data));
    console.log("Deploying contract...");
    const res = await makeNewToken(
      data.tokenName,
      data.tokenSymbol,
      data.maxSupply
    );
    //create new token
    //save token in the firebase

    console.log("res:" + res);
    if (res) {
      setError("success", {
        type: "manual",
        message: "Completed.",
      });
      setTimeout(() => {
        clearErrors();
        history.push("/Dashboard");
      }, 800);
    } else {
      setError("maxSupply", {
        type: "manual",
        message: "Error happened check metamask for more info.",
      });
    }
  };

  //console.log(errors);

  return (
    <>
      {address === "" && <Redirect to="/" />}

      <div className="header">
        <Link to="/Dashboard" style={{ textDecoration: "none" }}>
          <HiBackspace size="40px" className={classes.back} />
        </Link>
      </div>

      <div className={mclasses.generate_token_parent}>
        <form
          className={mclasses.make_token_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={mclasses.token__name}>
            <label className="labelTkn" htmlFor="tokenName">
              Token name
            </label>
            <input
              disabled={isSubmitting}
              className="inputTkn"
              type="text"
              maxLength="31"
              placeholder="Token name"
              {...register("tokenName", {
                required: "this is a required",
                maxLength: {
                  value: 30,
                  message: "Max length is 30",
                },
              })}
            />
            {errors.tokenName && (
              <p className="errorMsg">{errors.tokenName.message}</p>
            )}
          </div>
          <div className={mclasses.token_symbol}>
            <label className="labelTkn" htmlFor="tokenSymbol">
              Token symbol
            </label>
            <input
              disabled={isSubmitting}
              className="inputTkn"
              type="text"
              maxLength="5"
              placeholder="Token symbol"
              {...register("tokenSymbol", {
                required: "this is required",
                maxLength: {
                  value: 4,
                  message: "Max length is 4",
                },
              })}
            />
            {errors.tokenSymbol && (
              <p className="errorMsg">{errors.tokenSymbol.message}</p>
            )}
          </div>

          <div className={mclasses.max_supply}>
            <label className="labelTkn" htmlFor="maxSupply">
              Max supply
            </label>

            <input
              className="inputTkn"
              type="number"
              disabled={isSubmitting}
              step="any"
              placeholder="Max supply"
              {...register("maxSupply", {
                required: "this is a required",
                min: { value: 1, message: "Min value is 1" },
                maxLength: {
                  value: 30,
                  message: "Max length is 30",
                },
                pattern: {
                  value: /^\d+(\.\d{0,8})?$/i,
                  message: "8 decimals max",
                },
              })}
            />
            {errors.maxSupply ? (
              <p className="errorMsg">{errors.maxSupply.message}</p>
            ) : (
              errors.success && (
                <p className="successMsg">{errors.success.message}</p>
              )
            )}
          </div>
          <div className={mclasses.submit}>
            <SubmitButton wait={isSubmitting}>Create</SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(CreateToken);
