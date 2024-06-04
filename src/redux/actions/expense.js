import {
  ADD_EXPENSES_REQUEST,
  ADD_EXPENSES_SUCCESS,
  ADD_EXPENSES_FAILED,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAILED,
  SPLITWISE_EXPENSE_DATA,
} from "./types";
import { v4 as uuidv4 } from "uuid";

export const addExpences = (payload) => async (dispatch) => {
  dispatch({
    type: ADD_EXPENSES_REQUEST,
  });
  try {
    payload.id = uuidv4();
    dispatch({
      type: ADD_EXPENSES_SUCCESS,
      payload,
    });
  } catch (err) {
    dispatch({
      type: ADD_EXPENSES_FAILED,
    });
  }
};

export const getExpenceSummary = () => async (dispatch) => {
  dispatch({
    type: GET_EXPENSES_REQUEST,
  });
  try {
    const expenseData = JSON.parse(
      localStorage.getItem(SPLITWISE_EXPENSE_DATA)
    );
    dispatch({
      type: GET_EXPENSES_SUCCESS,
      payload: expenseData,
    });
  } catch (err) {
    dispatch({
      type: GET_EXPENSES_FAILED,
    });
  }
};
