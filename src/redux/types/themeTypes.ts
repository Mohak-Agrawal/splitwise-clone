// src/redux/types/themeTypes.ts
export interface ThemeState {
  darkMode: boolean;
}

export enum ThemeActionTypes {
  TOGGLE_THEME = "TOGGLE_THEME",
}

interface ToggleThemeAction {
  type: typeof ThemeActionTypes.TOGGLE_THEME;
}

export type ThemeAction = ToggleThemeAction;
