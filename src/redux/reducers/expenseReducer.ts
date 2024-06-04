// src/redux/reducers/expenseReducer.ts
import {
  ExpenseActionTypes,
  ExpenseState,
  ExpenseAction,
} from "../types/expenseTypes";

const initialState: ExpenseState = {
  expenses: [],
};

const expenseReducer = (
  state = initialState,
  action: ExpenseAction
): ExpenseState => {
  switch (action.type) {
    case ExpenseActionTypes.ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case ExpenseActionTypes.REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default expenseReducer;
