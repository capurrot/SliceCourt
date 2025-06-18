import {
  CREATE_BOOKING_FAILURE,
  CREATE_BOOKING_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  FETCH_BOOKINGS_START,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_OCCUPIED_BOOKINGS_FAILURE,
  FETCH_OCCUPIED_BOOKINGS_START,
  FETCH_OCCUPIED_BOOKINGS_SUCCESS,
} from "../actions/bookings";

const initialState = {
  bookings: [],
  occupiedBookings: [],
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
        bookings: action.payload ? [...state.bookings, action.payload] : state.bookings,
      };
    case FETCH_OCCUPIED_BOOKINGS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_OCCUPIED_BOOKINGS_SUCCESS:
      return {
        ...state,
        occupiedBookings: action.payload,
      };
    case FETCH_OCCUPIED_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_BOOKING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
