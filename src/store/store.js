import React, { useReducer, useContext, createContext } from "react";

const StoreContext = createContext();
const initialState = {
  message: "",
  ethBalance:0,
  address: null,
  token: null,
  tokens:[],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW-ACCOUNT":
      return {
        ...state,
        address: action.address,
        message: action.message,
        ethBalance: action.balance,
        tokens: action.tokens,
      };
    case "SET-BALANCE":
      return {
        ...state,
        ethBalance: action.balance,
      };
      case "SET-TOKEN":
        return {
          ...state,
          token: action.token,
        };
        case "SET-TOKENS":
          return {
            ...state,
            tokens: action.tokens,
          };
    default:
      throw new Error(`Unknown type of action: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);