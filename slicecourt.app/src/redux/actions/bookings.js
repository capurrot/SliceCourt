export const FETCH_BOOKINGS_START = "FETCH_BOOKINGS_START";
export const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
export const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";

export const CREATE_BOOKING_SUCCESS = "CREATE_BOOKING_SUCCESS";

export const fetchBookings = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_BOOKINGS_START });

  const token = getState().auth?.user?.token;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/slicecourt/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BOOKINGS_FAILURE, payload: error.message });
  }
};

export const createBooking = (bookingData) => async (dispatch, getState) => {
  const token = getState().auth?.user?.token;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/slicecourt/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Errore nella prenotazione");
    }

    const newBooking = await res.json();
    dispatch({ type: CREATE_BOOKING_SUCCESS, payload: newBooking });

    return newBooking;
  } catch (error) {
    dispatch({ type: FETCH_BOOKINGS_FAILURE, payload: error.message });
    throw error;
  }
};
