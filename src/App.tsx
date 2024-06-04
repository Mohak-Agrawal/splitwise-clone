import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./components/Settings";
// import Group from "./components/Group";
import ThemeProvider from "./contexts/ThemeContext";
import SidebarLayout from "./components/SidebarLayout";
import store from "./redux/store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenseFormData"));
    console.log({ data });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SidebarLayout />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/group" element={<Group />} /> */}
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
