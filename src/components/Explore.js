import { withRouter, Redirect } from "react-router-dom";
import AddressInput from "./inputs/AddressInput";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { HiBackspace, HiOutlineSearch } from "react-icons/hi";

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

const Explore = ({ address, history, newSearch }) => {
  const [balance, setBalance] = useState([0, []]);
  const classes = useStyles();
  const handleChangeText = async (e) => {
    e.preventDefault();
    const _address = e.target.elements.address.value.trim();
    const res = await newSearch(_address);
    setBalance([res.eth, res.tkn]);
  };

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

      <div className="explore_container">
        <div className="addressWide">
          <form onSubmit={handleChangeText} className={classes.form}>
            <AddressInput text={address} />

            <button type="submit" className={classes.submit}>
              <HiOutlineSearch size="40px" className={classes.icon} />
            </button>
          </form>
        </div>

        <div className="balance">
          <Typography component="h1" variant="h5">
            <p key="ethBal">{balance[0]} ETH</p>
            {balance[1]&&balance[1].map((token,index)=>{
              return <p key={index}>{token.balance} {token.symbol}</p>;
            })}
            
          </Typography>
        </div>
      </div>
    </>
  );
};

export default withRouter(Explore);

/**  <div className="createdAt">
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
      </div> */
