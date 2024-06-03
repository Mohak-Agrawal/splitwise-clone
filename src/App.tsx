import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import Settings from "./components/Settings";
// import Group from "./components/Group";
import ThemeProvider from "./contexts/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/group" element={<Group />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
