import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <label className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="mr-2"
        />
        Dark Mode
      </label>
    </div>
  );
};

export default Settings;
