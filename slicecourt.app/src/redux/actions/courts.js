export const SET_COURTS = "SET_COURTS";
export const fetchCourts = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth?.user?.token;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/slicecourt/courts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const courts = await res.json();
    dispatch({ type: SET_COURTS, payload: courts });

    return courts;
  } catch (err) {
    console.error("ERRORE FETCH COURTS:", err);
    throw err;
  }
};
