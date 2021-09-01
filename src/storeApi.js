import { useStore } from "./store";

export const useStoreApi = () => {
  const { state, dispatch } = useStore();

  return {
    ethBalance: state.ethBalance,
    address: state.address,
    message: state.message,
    token:state.token,
    tokens:state.tokens,
    setAddress: newAddress => {
      dispatch({
        type: "NEW-ADDRESS",
        address: newAddress,
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