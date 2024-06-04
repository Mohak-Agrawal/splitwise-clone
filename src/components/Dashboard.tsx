import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import { ModalProvider } from "react-modal-hook";
import SettleUpForm from "./SettleUpForm";

interface Group {
  friends: string[];
}

const Dashboard: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [group, setGroup] = useState<Group>({ friends: [] });

  useEffect(() => {
    fetchGroupData();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleExpenseForm = () => {
    setIsExpenseFormOpen(!isExpenseFormOpen);
  };

  const fetchGroupData = () => {
    // Simulated API call to fetch group data
    const fetchedGroupData = {
      friends: ["Friend 1", "Friend 2", "Friend 3"],
    };
    setGroup(fetchedGroupData);
  };

  return (
    <ModalProvider>
      <div
        className={`h-screen w-screen flex flex-col ${darkMode ? "dark" : ""}`}
      >
        <header
          className={`bg-gray-800 text-white p-4 flex justify-between items-center ${
            darkMode ? "dark" : ""
          }`}
        >
          <div className="text-2xl font-bold">MyLogo</div>
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
                className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 ${
                  darkMode ? "dark" : ""
                }`}
              >
                <li className="px-4 py-2 hover:bg-gray-100">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100">Logout</li>
              </ul>
            )}
          </div>
        </header>
        <div className="flex-grow w-1/2 mx-auto bg-white shadow-md rounded-t-lg">
          <div className="border-b p-4 flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold text-center">Dashboard</h1>
            <div className="flex flex-row items-center">
              <ExpenseForm friends={group.friends} />
              <SettleUpForm friends={group.friends} />
              {/* <button>Settle Up</button> */}
            </div>
          </div>
          <div className="flex flex-row justify-between p-4">
            <div>
              <h2 className="text-xl font-semibold">You Owe</h2>
              <ul>
                {group.friends.map((friend, index) => (
                  <li key={index}>{friend}: $X</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">You Are Owed</h2>
              <ul>
                {group.friends.map((friend, index) => (
                  <li key={index}>{friend}: $X</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
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
      </div>
    </ModalProvider>
  );
};

export default Dashboard;
