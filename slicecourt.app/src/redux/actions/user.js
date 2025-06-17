import { userDataStart, userDataSuccess, userDataFailure } from "../reducers/authSlice";

export const fetchUserData = () => async (dispatch, getState) => {
  dispatch(userDataStart());

  try {
    const state = getState();
    const token = state.auth?.user?.token;

    console.log("TOKEN USATO:", token);

    if (!token) {
      throw new Error("Token non disponibile");
    }

    const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/slicecourt/auth/current-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("ERRORE FETCH USER DATA:", res.status, errorText);
      throw new Error("Errore nel recupero dati utente");
    }

    const data = await res.json();
    console.log("Dati utente:", data);
    dispatch(userDataSuccess(data));
  } catch (error) {
    dispatch(userDataFailure(error.message));
  }
};
