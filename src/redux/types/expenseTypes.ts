// src/redux/types/expenseTypes.ts
export interface Expense {
  id: string;
  description: string;
  amount: number;
  friends: string[];
}

export interface ExpenseState {
  expenses: Expense[];
}

export enum ExpenseActionTypes {
  ADD_EXPENSE = "ADD_EXPENSE",
  REMOVE_EXPENSE = "REMOVE_EXPENSE",
}

interface AddExpenseAction {
  type: typeof ExpenseActionTypes.ADD_EXPENSE;
  payload: Expense;
}

interface RemoveExpenseAction {
  type: typeof ExpenseActionTypes.REMOVE_EXPENSE;
  payload: string; // Expense ID
}

export type ExpenseAction = AddExpenseAction | RemoveExpenseAction;
