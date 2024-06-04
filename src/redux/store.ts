// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Assuming you have a rootReducer combining all your reducers
import { loadState, saveState } from "../utils/localStorageUtil";

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
