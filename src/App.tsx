import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";

import { ExpenseProvider } from "./contexts/ExpenseContext";

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SidebarLayout />} />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
};

export default App;
