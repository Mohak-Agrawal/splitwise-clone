import { createAsyncThunk } from "@reduxjs/toolkit";
import { Expense } from "../types/expenseTypes"; // Define Expense type if not already defined

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    try {
      const expensesData = localStorage.getItem("expenses");
      if (!expensesData) {
        throw new Error("No expenses data found in local storage");
      }
      const expenses = JSON.parse(expensesData) as Expense[];
      return expenses;
    } catch (error) {
      throw new Error("Failed to fetch expenses from local storage");
    }
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense: Expense) => {
    try {
      // Add expense to local storage
      const expensesData = localStorage.getItem("expenses");
      let expenses: Expense[] = [];
      if (expensesData) {
        expenses = JSON.parse(expensesData) as Expense[];
      }
      expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      return expense;
    } catch (error) {
      throw new Error("Failed to add expense to local storage");
    }
  }
);
