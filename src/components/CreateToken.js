import { withRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { HiBackspace } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

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

  const [wait, setWait] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    //alert(JSON.stringify(data));
    console.log("Deploying contract...");
    setWait(true);
    const response = await makeNewToken(
      data.tokenName,
      data.tokenSymbol,
      data.maxSupply
    );
    //create new token
    //save token in the firebase
    console.log(response);
    console.log("Contract deployed!");
    response && history.push("/Dashboard");
    setWait(false);
  };

  //console.log(errors);

  return (
    <>
      {address === "" && <Redirect to="/" />}

      <div className="header">
        <HiBackspace
          size="40px"
          className={classes.back}
          onClick={() => {
            history.push("/Dashboard");
          }}
        />
      </div>

      <div className="generate_token_parent">
        <form
          className="generate_token_form make_token_container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="token__name">
            <label className="labelTkn" htmlFor="tokenName">
              Token name
            </label>
            <input
              className="inputTkn"
              type="text"
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
          <div className="token_symbol">
            <label className="labelTkn" htmlFor="tokenSymbol">
              Token symbol
            </label>
            <input
              className="inputTkn"
              type="text"
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

          <div className="max_supply">
            <label className="labelTkn" htmlFor="maxSupply">
              Max supply
            </label>

            <input
              className="inputTkn"
              type="number"
              placeholder="Max supply"
              {...register("maxSupply", {
                required: "this is a required",
                min: { value: 1, message: "Min value is 1" },
                maxLength: {
                  value: 30,
                  message: "Max length is 30",
                },
              })}
            />
            {errors.maxSupply && (
              <p className="errorMsg">{errors.maxSupply.message}</p>
            )}
          </div>
          <div className="submit">
          <SubmitButton wait={wait} text="Create"/>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(CreateToken);
