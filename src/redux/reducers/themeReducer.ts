// src/redux/reducers/themeReducer.ts
import { ThemeActionTypes, ThemeState, ThemeAction } from "../types/themeTypes";

const initialState: ThemeState = {
  darkMode: false,
};

const themeReducer = (
  state = initialState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case ThemeActionTypes.TOGGLE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default themeReducer;
