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
        "https://ropsten.infura.io/v3/f70dbabf3a324ede815b26eee5b9365e"
      );
      instance = new Web3(provider);
    }
    setWeb3(instance);
    setTokenInst(
      new instance.eth.Contract(
        tokenABI,
        "0x50df9a120c8608381C55f533AEc9Af158F92bfE2"
      )
    );
  }, []);
  return { web3, tokenInst };
};

export default useWeb3;
