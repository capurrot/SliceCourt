import {
  CREATE_BOOKING_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  FETCH_BOOKINGS_START,
  FETCH_BOOKINGS_SUCCESS,
} from "../actions/bookings";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_START:
      return { ...state, loading: true, error: null };

    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, loading: false, bookings: action.payload };

    case FETCH_BOOKINGS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    default:
      return state;
  }
};

export default bookingReducer;
