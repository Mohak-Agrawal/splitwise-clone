// src/redux/reducers/index.ts
import { combineReducers } from "redux";
import expenseReducer from "./expenseReducer";
import friendReducer from "./friendReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  expenses: expenseReducer,
  friends: friendReducer,
  theme: themeReducer,
});

export default rootReducer;
