import { withRouter } from "react-router-dom";
import ButtonHomemade from "./Button";
import AddressInput from "./AddressInput";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";

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

const Explore = ({ Address, AddrHistory, history, newAddress }) => {
  const [formData, updateFormData] = useState(initialFormData);

  const handleChangeText = async (addr) => {
    const searchRes = newAddress(addr);
    console.log(formData);
    updateFormData(searchRes);
    console.log(formData);
  };

  return (
    <div>
      <ButtonHomemade
        text="Back"
        onClick={() => {
          history.push("/Dashboard");
        }}
      />
      <AddressInput onTextChange={handleChangeText} />
      <Typography component="h1" variant="h5">
        <p key="addr">ADDRESS: {formData.address}</p>
        <p key="bal">BALANCE: {formData.balance}</p>
        <p key="date">
          CREATED AT: {new Date(formData.createdAt).toUTCString()}
        </p>
        <p key="transac">TRANSACTIONS SEND:</p>
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
  );
};

export default withRouter(Explore);
