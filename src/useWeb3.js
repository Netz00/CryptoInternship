import { useEffect, useState } from "react";
import Web3 from "web3";
import MyContract from "./contracts/build/contracts/myERC20.json"; //truffle project dirs
const tokenABI = MyContract.abi;
const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [tokenInst, setTokenInst] = useState(null);

  useEffect(() => {
    var instance;
    if (window.ethereum) {
      // set up a new provider
      try {
        instance = new Web3(window.ethereum);
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      instance = new Web3(window.web3);
    } else {
      // fallback on localhost provider
      const provider = new Web3.provider.HttpProvider(
        //"https://ropsten.infura.io/v3/f70dbabf3a324ede815b26eee5b9365e"
        "http://127.0.0.1:8545"
      );
      instance = new Web3(provider);
    }
    setWeb3(instance);
    setTokenInst(
      new instance.eth.Contract(
        tokenABI,
        "0xB0B18fBdd343c3088a4a35C9C4CDdE064C4B775d"
      )
    );
  }, []);
  return { web3, tokenInst };
};

export default useWeb3;
