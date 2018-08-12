import axios from "axios";
const ROOT_URL = "http://localhost:3030";

export function signInUser({ email, password }, history) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(res => {
        dispatch({ type: "AUTH_USER" });
        localStorage.setItem("token", res.data.token);
        history.push("/feature");
      })
      .catch(err => {
        console.log("error in signin");
        dispatch({ type: "AUTH_ERROR", payload: "Bad User Info" });
      });
  };
}

export function signOutUser(history) {
  localStorage.removeItem("token");

  return {
    type: "UNAUTH_USER"
  };
}

export function signUpUser({ email, password }, history) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(res => {
        dispatch({ type: "AUTH_USER" });
        localStorage.setItem("token", res.data.token);
        history.push("/feature");
      })
      .catch(err => {
        console.log("error in signin");
        dispatch({ type: "AUTH_ERROR", payload: "Invalid" });
      });
  };
}
