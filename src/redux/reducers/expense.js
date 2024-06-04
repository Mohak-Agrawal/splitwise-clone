import {
  ADD_EXPENSES_REQUEST,
  ADD_EXPENSES_SUCCESS,
  ADD_EXPENSES_FAILED,
  SPLITWISE_TRACK_USERS,
  SPLITWISE_EXPENSE_DATA,
  SPLITWISE_EXPENSES,
} from "../actions/types";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  loading: false,
  list: [],
};

const countDifferences = (obj, KEY1, KEY2, key, amount) => {
  const difference =
    obj[KEY1][key] > amount ? obj[KEY1][key] - amount : amount - obj[KEY1][key];

  if (difference > 0) {
    if (obj[KEY1][key] > amount) {
      obj[KEY1][key] = difference;
      delete obj[KEY2][key];
    } else {
      obj[KEY2][key] = difference;
      delete obj[KEY1][key];
    }
  } else {
    delete obj[KEY1][key];
  }
};

const updateFriends = async (expenseObj) => {
  const transactions = expenseObj.splits.map((split) => {
    return {
      ...expenseObj,
      paidBy: expenseObj.paidBy,
      paidFor: split.id,
      amount: split.balance,
      id: uuidv4(),
    };
  });

  let transactionsLocal = JSON.parse(localStorage.getItem(SPLITWISE_EXPENSES));
  if (transactionsLocal) {
    localStorage.setItem(
      SPLITWISE_EXPENSES,
      JSON.stringify([...transactionsLocal, ...transactions])
    );
  } else {
    localStorage.setItem(SPLITWISE_EXPENSES, JSON.stringify(transactions));
  }
  let storedTransactions = JSON.parse(localStorage.getItem(SPLITWISE_EXPENSES));

  /**
   * Track the transactions with users either youOwe/youOwed.
   */
  let trackUsers = {
    youOwe: [],
    youOwed: [],
  };
  /**
   * @youOwe // you'll give
   * @youOwed // you'll get
   */
  let expenseData = {
    youOwe: {},
    youOwed: {},
  };

  storedTransactions.forEach((trans) => {
    let { paidBy, paidFor, amount } = trans;
    if (
      paidBy === expenseObj.createdBy.id &&
      paidFor === expenseObj.createdBy.id
    )
      return;

    if (paidBy === expenseObj.createdBy.id) {
      if (trackUsers.youOwed.indexOf(paidFor) === -1) {
        expenseData.youOwed[paidFor] = amount;
        trackUsers.youOwed.push(paidFor);
      } else expenseData.youOwed[paidFor] += amount;
      // here our condition
      if (expenseData.youOwe[paidFor]) {
        countDifferences(expenseData, "youOwe", "youOwed", paidFor, amount);
      }
    }
    if (paidFor === expenseObj.createdBy.id) {
      if (trackUsers.youOwe.indexOf(paidBy) === -1) {
        expenseData.youOwe[paidBy] = amount;
        trackUsers.youOwe.push(paidBy);
      } else expenseData.youOwe[paidBy] += amount;
      // here will write the condition
      if (expenseData.youOwed[paidBy]) {
        countDifferences(expenseData, "youOwed", "youOwe", paidBy, amount);
      }
    }
  });
  localStorage.setItem(SPLITWISE_EXPENSE_DATA, JSON.stringify(expenseData));
  localStorage.setItem(SPLITWISE_TRACK_USERS, JSON.stringify(trackUsers));
};

const expenseReducer = (state = initialState, action) => {
  const { type, payload, message } = action;
  switch (type) {
    case ADD_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EXPENSES_SUCCESS:
      updateFriends(payload);
      return {
        ...state,
        loading: false,
        message: "Expence Added Successfully",
        list: [...state.list, payload],
      };
    case ADD_EXPENSES_FAILED:
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
