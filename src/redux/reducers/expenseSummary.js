import {
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAILED,
} from "../actions/types";

const initialState = {
  loading: false,
  summary: {},
};

const expenseReducer = (state = initialState, action) => {
  const { type, payload, message } = action;
  switch (type) {
    case GET_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Summary loaded Successfully",
        summary: payload,
      };
    case GET_EXPENSES_FAILED:
      return {
        ...state,
        message,
        loading: false,
      };
    default:
      return state;
  }
};

export default expenseReducer;
