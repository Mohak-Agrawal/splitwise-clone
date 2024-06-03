import React from "react";
import { useModal } from "react-modal-hook";

interface ExpenseFormProps {
  friends: string[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ friends }) => {
  // Logic for handling form submission

  const [showModal, hideModal] = useModal(() => (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add an Expense</h2>
        {/* Form content goes here */}
        <form>
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
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add an Expense
      </button>
    </div>
  );
};

export default ExpenseForm;
