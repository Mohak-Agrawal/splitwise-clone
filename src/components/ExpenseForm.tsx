import React, { useState, useEffect } from "react";
import { useModal } from "react-modal-hook";

interface ExpenseFormProps {
  friends: string[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ friends }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "", // Changed from number to string to correctly handle input
    selectedFriends: [] as string[],
  });

  // Logic for handling form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Save form data to local storage
    localStorage.setItem("expenseFormData", JSON.stringify(formData));
    // Close modal
    hideModal();
  };

  // Load form data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("expenseFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const [showModal, hideModal] = useModal(() => (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-2 bg-[#5ac4a6] rounded-t-lg">
          <h2 className="text-xl text-white font-bold">Add an Expense</h2>
        </div>

        {/* Form content goes here */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-bold mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>
          {/* Add more form fields as needed */}
          <div className="mb-4">
            <label
              htmlFor="friend"
              className="block text-gray-700 font-bold mb-2"
            >
              Select Friends
            </label>
            <select
              id="friend"
              name="friend"
              multiple
              className="w-full border border-gray-300 p-2 rounded-md"
              value={formData.selectedFriends}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  selectedFriends: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
            >
              {friends.map((friend, index) => (
                <option key={index} value={friend}>
                  {friend}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={hideModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-4"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  ));

  return (
    <div>
      {/* Button to show modal */}
      <button
        onClick={showModal}
        className="bg-[#ff652f] hover:bg-[#ff5216] shadow-sm text-white text-sm font-semibold py-2 px-4 rounded"
      >
        Add an Expense
      </button>
    </div>
  );
};

export default ExpenseForm;
