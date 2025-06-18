import { SET_COURTS } from "../actions/courts";

const courtsReducer = (state = { courts: [] }, action) => {
  switch (action.type) {
    case SET_COURTS:
      return { courts: action.payload };
    default:
      return state;
  }
};

export default courtsReducer;
