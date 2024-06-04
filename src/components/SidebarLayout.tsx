import React, { useContext, useState } from "react";
import { ModalProvider } from "react-modal-hook";
import Dashboard from "./Dashboard";
import { ExpenseContext } from "../contexts/ExpenseContext";

const SidebarLayout: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { friends, addFriend, toggleTheme, theme } = useContext(ExpenseContext);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const Header = () => (
    <header
      className={`bg-[#5ac4a6] text-white p-1 flex justify-center items-center shadow-lg ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="flex flex-row w-2/3 self-center justify-between items-center">
        <div className="text-xl font-bold flex flex-row">
          <img
            src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
            className="h-8 w-28"
          />
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
          >
            <span className="mr-2">My Name</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {dropdownOpen && (
            <ul
              className={`absolute right-0 mt-2 w-48 bg-white border rounded-sm shadow-lg z-10 ${
                darkMode ? "dark" : ""
              }`}
            >
              <li className="p-1 px-2 text-black text-sm hover:bg-[#5ac5a6] hover:text-white cursor-pointer">
                Profile
              </li>
              <li className="p-1 px-2 text-black text-sm hover:bg-[#5ac5a6] hover:text-white cursor-pointer">
                Settings
              </li>
              <li className="p-1 px-2 text-black text-sm hover:bg-[#5ac5a6] hover:text-white cursor-pointer">
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 bg-white shadow-lg border p-2 text-white rounded-full w-12 h-12 flex items-center justify-center"
    >
      {theme == "dark" ? (
        <img src="https://cdn-icons-png.freepik.com/512/9937/9937122.png" />
      ) : (
        <img src="https://cdn-icons-png.freepik.com/512/6714/6714978.png" />
      )}
    </button>
  );

  return (
    <ModalProvider>
      <div className={`h-screen w-screen flex flex-col ${theme ? "dark" : ""}`}>
        <Header />
        <div className="w-2/3 flex flex-row self-center h-screen">
          <div
            className={`w-48 bg-${
              theme === "dark" ? "gray-800" : "gray-100"
            } p-4 flex flex-col items-center`}
          >
            <div
              className={`border-b mb-2 text-${
                theme === "dark" ? "white" : "black"
              }`}
            >
              My Friends
            </div>
            <ul>
              {friends.map((friend, index) => (
                <li
                  key={index}
                  className={`text-${theme === "dark" ? "white" : "black"}`}
                >
                  {friend.name}
                </li>
              ))}
            </ul>
          </div>
          <Dashboard />
          <div
            className={`w-48 bg-${
              theme === "dark" ? "gray-800" : "gray-100"
            } p-4 flex flex-col items-center`}
          ></div>
        </div>

        <Footer />
      </div>
    </ModalProvider>
  );
};

export default SidebarLayout;
