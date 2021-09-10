import { useStore } from "./store";

export const useStoreApi = () => {
  const { state, dispatch } = useStore();

  return {
    ethBalance: state.ethBalance,
    address: state.address,
    message: state.message,
    token:state.token,
    tokens:state.tokens,
    setAccount: (newAddress, newBalance, newTokens) => {
      dispatch({
        type: "NEW-ACCOUNT",
        address: newAddress,
        balance: newBalance,
        tokens: newTokens,
        message: "New address added successfully!"
      });
    },
    setBalance: newBalance => {
      dispatch({
        type: "SET-BALANCE",
        balance: newBalance
      });
    },
    setToken: newToken => {
      dispatch({
        type: "SET-TOKEN",
        token: newToken
      });
    },
    setTokens: newTokens => {
      dispatch({
        type: "SET-TOKENS",
        tokens: newTokens
      });
    },
  };
};