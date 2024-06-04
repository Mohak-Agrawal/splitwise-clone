import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Settings from "./components/Settings";
// import Group from "./components/Group";
import SidebarLayout from "./components/SidebarLayout";

import { ExpenseProvider } from "./contexts/ExpenseContext";

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SidebarLayout />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* <Route path="/group" element={<Group />} /> */}
        </Routes>
      </Router>
    </ExpenseProvider>
  );
};

export default App;
