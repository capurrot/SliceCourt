import { loginStart, loginSuccess, loginFailure } from "../reducers/authSlice";
import { fetchUserData } from "./user"; // nuova action

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/slicecourt/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Errore durante il login");
    }

    const data = await res.json(); // { token: "..." }
    dispatch(loginSuccess(data)); // salva il token
    await dispatch(fetchUserData()); // fetch dei dati utente

    return data;
  } catch (err) {
    dispatch(loginFailure(err.message));
    throw err;
  }
};
