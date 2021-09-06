import { Redirect } from "react-router-dom";
import AddressInput from "../components/inputs/AddressInput";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { HiBackspace, HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

import mclasses from "./Explore.module.css";

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

const Explore = ({ address, newSearch }) => {
  const [balance, setBalance] = useState([0, []]);
  const classes = useStyles();
  const handleChangeText = async (e) => {
    e.preventDefault();
    const _address = e.target.elements.address.value.trim();
    const res = await newSearch(_address);
    setBalance([res.ethBalance, res.tknData]);
  };

  return (
    <>
      {address === "" && <Redirect to="/" />}

      <div className="header">
        <Link to="/Dashboard" style={{ textDecoration: "none" }}>
          <HiBackspace size="40px" className={classes.back} />
        </Link>
      </div>

      <div className={mclasses.explore_container}>
        <div className={mclasses.addressWide}>
          <form onSubmit={handleChangeText} className={classes.form}>
            <AddressInput text={address} />

            <button type="submit" className={classes.submit}>
              <HiOutlineSearch size="40px" className={classes.icon} />
            </button>
          </form>
        </div>

        <div className={mclasses.balance}>
          <Typography component="h1" variant="h5">
            <p key="ethBal">{balance[0]} ETH</p>
            {balance[1] &&
              balance[1].map((token, index) => {
                return (
                  <p key={index}>
                    {token.balance} {token.symbol}
                  </p>
                );
              })}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Explore;
