export interface Expense {
  id: string;
  description: string;
  amount: number;
  payer: string;
  participants: string[];
}

export interface ExpenseState {
  expenses: Expense[];
}

export enum ExpenseActionTypes {
  FETCH_EXPENSES_REQUEST = "FETCH_EXPENSES_REQUEST",
  FETCH_EXPENSES_SUCCESS = "FETCH_EXPENSES_SUCCESS",
  FETCH_EXPENSES_FAILURE = "FETCH_EXPENSES_FAILURE",
  ADD_EXPENSE = "ADD_EXPENSE",
  REMOVE_EXPENSE = "REMOVE_EXPENSE",
}

interface FetchExpensesRequestAction {
  type: ExpenseActionTypes.FETCH_EXPENSES_REQUEST;
}

interface FetchExpensesSuccessAction {
  type: ExpenseActionTypes.FETCH_EXPENSES_SUCCESS;
  payload: Expense[];
}

interface FetchExpensesFailureAction {
  type: ExpenseActionTypes.FETCH_EXPENSES_FAILURE;
  error: string;
}

interface AddExpenseAction {
  type: ExpenseActionTypes.ADD_EXPENSE;
  payload: Expense;
}

interface RemoveExpenseAction {
  type: ExpenseActionTypes.REMOVE_EXPENSE;
  payload: string; // ID of the expense to remove
}

export type ExpenseAction =
  | FetchExpensesRequestAction
  | FetchExpensesSuccessAction
  | FetchExpensesFailureAction
  | AddExpenseAction
  | RemoveExpenseAction;
