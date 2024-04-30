import * as actionTypes from "./actionsType";

export const login = (user) => {
  return {
    type: actionTypes.LOGIN,
    user: user,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    user: {},
  };
};