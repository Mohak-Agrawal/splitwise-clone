import { combineReducers } from "redux";
import friends from "./friend";
import user from "./user";
import expenses from "./expense";
import expenseSummary from "./expenseSummary";
import theme from "./theme";
export default combineReducers({
  friends,
  user,
  expenses,
  expenseSummary,
  theme,
});
