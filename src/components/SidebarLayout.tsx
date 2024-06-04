import React, { useContext, useState } from "react";
import { ModalProvider } from "react-modal-hook";
import Dashboard from "./Dashboard";
import { ExpenseContext } from "../contexts/ExpenseContext";

const SidebarLayout: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { friends, addFriend } = useContext(ExpenseContext);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center"
    >
      {darkMode ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 1v2m0 18v2m-5-5H1m18 0h-6m5 0a9 9 0 01-9-9c0-3.683 2.214-6.956 5.623-8.348a1 1 0 011.237.829V6.5a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5V4.98a1 1 0 011.237-.828C18.786 4.544 21 7.817 21 11a9 9 0 01-9 9z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10h14a1 1 0 010 2H5a1 1 0 010-2zM5 6h14a1 1 0 010 2H5a1 1 0 010-2zM5 14h14a1 1 0 010 2H5a1 1 0 010-2zM19 16a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8z"
          />
        </svg>
      )}
    </button>
  );

  return (
    <ModalProvider>
      <div
        className={`h-screen w-screen flex flex-col ${darkMode ? "dark" : ""}`}
      >
        <Header />
        <div className="w-2/3 flex flex-row self-center h-screen">
          <div className="w-48 bg-gray-100">
            <button onClick={() => addFriend("New Friend")}>Add Friend</button>
            <ul>
              {friends.map((friend, index) => (
                <li key={index}>{friend.name}</li>
              ))}
            </ul>
          </div>
          <Dashboard />
          <div className="w-48 bg-gray-100"></div>
        </div>

        <Footer />
      </div>
    </ModalProvider>
  );
};

export default SidebarLayout;
