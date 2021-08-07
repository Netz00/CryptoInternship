import { withRouter, Redirect } from "react-router-dom";
import AddressInput from "./inputs/AddressInput";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { HiBackspace, HiOutlineSearch } from "react-icons/hi";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  back: {
    margin: theme.spacing(1, 1, 2),
    color: "aliceblue",
    cursor: "pointer",
  },
  submit: {
    margin: theme.spacing(1, 1),
    background: "transparent",
    border: "0px",
  },
  icon: {
    cursor: "pointer",
    marginTop: "16px",
  },

  form: {
    marginLeft: "auto",
    width: "inherit",
    height: "inherit",
    display: "inline-flex",
    alignItems: "flex-start",
    justifySelf: "center",
    alignSelf: "center",
  },
}));

<<<<<<< Updated upstream
const Explore = ({ Address, history, newAddress }) => {
  const [formData, updateFormData] = useState(Address);
  const classes = useStyles();
  const handleChangeText = async (e) => {
    e.preventDefault();
    const address = e.target.elements.address.value.trim();
    const searchRes = newAddress(address);
    updateFormData(searchRes);
=======
const Explore = ({ address, history, newSearch }) => {
  const [balance, setBalance] = useState([0,0]);
  const classes = useStyles();
  const handleChangeText = async (e) => {
    e.preventDefault();
    const _address = e.target.elements.address.value.trim();
    const res= await newSearch(_address);
    setBalance([res.eth,res.tkn]);
>>>>>>> Stashed changes
  };


  return (
    <>
      <div className="header">
        <HiBackspace
          size="40px"
          className={classes.back}
          onClick={() => {
            history.push("/Dashboard");
          }}
        />
      </div>

      <div className="explore_container">
        {Address.address === "" ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/Explore" />
        )}

        <div className="addressWide">
          <form onSubmit={handleChangeText} className={classes.form}>
            <AddressInput text={Address.address} />

            <button type="submit" className={classes.submit}>
              <HiOutlineSearch size="40px" className={classes.icon} />
            </button>
          </form>
        </div>

        <div className="balance">
          <Typography component="h1" variant="h5">
<<<<<<< Updated upstream
            <p key="bal">Balance: {formData.balance}</p>
=======
            <p key="ethBal">ETH BALANCE: {balance[0]}</p>
        <p key="bal">TOKEN BALANCE: {balance[1]}</p>
>>>>>>> Stashed changes
          </Typography>
        </div>
        <div className="createdAt">
          <Typography component="h1" variant="h5">
            <p key="date">
              Created at: {new Date(formData.createdAt).toUTCString()}
            </p>
          </Typography>
        </div>
        <div className="TransactionsOUT">
          <Typography component="h1" variant="h5">
            <p key="transac">Transfer:</p>
            {formData.transactions.map((transaction, move) => {
              return (
                <p key={move}>
                  To address: {transaction.to}
                  <br></br>
                  Amount: {transaction.howMany}
                  <br></br>
                  Date: {new Date(transaction.when).toUTCString()}
                </p>
              );
            })}
          </Typography>
        </div>
        <div className="TransactionsIN">
          <Typography component="h1" variant="h5">
            <p key="transacIN">Deposit:</p>
            {formData.transactionsIn.map((transaction, move) => {
              return (
                <p key={move}>
                  From address: {transaction.from}
                  <br></br>
                  Amount: {transaction.howMany}
                  <br></br>
                  Date: {new Date(transaction.when).toUTCString()}
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
