export const FETCH_BOOKINGS_START = "FETCH_BOOKINGS_START";
export const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
export const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";

export const FETCH_OCCUPIED_BOOKINGS_START = "FETCH_OCCUPIED_BOOKINGS_START";
export const FETCH_OCCUPIED_BOOKINGS_SUCCESS = "FETCH_OCCUPIED_BOOKINGS_SUCCESS";
export const FETCH_OCCUPIED_BOOKINGS_FAILURE = "FETCH_OCCUPIED_BOOKINGS_FAILURE";

export const CREATE_BOOKING_SUCCESS = "CREATE_BOOKING_SUCCESS";
export const CREATE_BOOKING_FAILURE = "CREATE_BOOKING_FAILURE";

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

export const fetchOccupiedBookings = (courtId, date) => async (dispatch, getState) => {
  dispatch({ type: FETCH_OCCUPIED_BOOKINGS_START });

  const token = getState().auth?.user?.token;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_HOST}/api/slicecourt/bookings/occupied?courtId=${courtId}&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    dispatch({ type: FETCH_OCCUPIED_BOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_OCCUPIED_BOOKINGS_FAILURE, payload: error.message });
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
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create booking");
    }
  } catch (error) {
    dispatch({ type: CREATE_BOOKING_FAILURE, payload: error.message });
    throw error;
  }
};
