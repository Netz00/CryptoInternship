import { withRouter, Redirect } from "react-router-dom";
import AddressInput from "./AddressInput";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { HiBackspace } from "react-icons/hi";

const initialFormData = Object.freeze({
  address: "",
  createdAt: "",
  balance: 0,
  transactions: [
    {
      to: "",
      howMany: 0,
      when: "",
    },
  ],
  transactionsIn: [
    {
      from: "",
      howMany: 0,
      when: "",
    },
  ],
});

const useStyles = makeStyles((theme) => ({
  back: {
    margin: theme.spacing(1, 1, 2),
    color: "black",
    cursor: "pointer",
  },
}));

const Explore = ({ Address, history, newAddress }) => {
  const [formData, updateFormData] = useState(initialFormData);
  const classes = useStyles();
  const handleChangeText = async (addr) => {
    const searchRes = newAddress(addr);
    console.log(formData);
    updateFormData(searchRes);
    console.log(formData);
  };

  return (
    <>

<div class="header">

<HiBackspace size="40px" className={classes.back}  onClick={() => {
            history.push("/Dashboard");
          }}/>
      </div>

    <div class="explore_container">
      {Address.address === "" ? (
        <Redirect to="/" />
      ) : (
        <Redirect to="/Explore" />
      )}


      <div class="address">
        <AddressInput onTextChange={handleChangeText} />
      </div>

      <div class="balance">
        <Typography component="h1" variant="h5">
          <p key="bal">BALANCE: {formData.balance}</p>
        </Typography>
      </div>
      <div class="createdAt">
        <Typography component="h1" variant="h5">
          <p key="date">
            CREATED AT: {new Date(formData.createdAt).toUTCString()}
          </p>
        </Typography>
      </div>
      <div class="TransactionsOUT">
        <Typography component="h1" variant="h5">
          <p key="transac">TRANSACTIONS SENT:</p>
          {formData.transactions.map((transaction, move) => {
            return (
              <p key={move}>
                TO ADDRESS: {transaction.to}
                <br></br>
                BALANCE: {transaction.howMany}
                <br></br>
                DATE: {new Date(transaction.when).toUTCString()}
              </p>
            );
          })}
        </Typography>
      </div>
      <div class="TransactionsIN">
        <Typography component="h1" variant="h5">
          <p key="transacIN">TRANSACTIONS RECEIVED:</p>
          {formData.transactionsIn.map((transaction, move) => {
            return (
              <p key={move}>
                FROM ADDRESS: {transaction.from}
                <br></br>
                BALANCE: {transaction.howMany}
                <br></br>
                DATE: {new Date(transaction.when).toUTCString()}
              </p>
            );
          })}
        </Typography>
      </div>
    </div>
    </>
  );
};

export default withRouter(Explore);
