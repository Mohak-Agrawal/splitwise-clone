import React, { useContext, useState } from "react";
import { ExpenseContext } from "../contexts/ExpenseContext";
import Autocomplete from "./Autocomplete";

interface ExpenseFormProps {}

interface Option {
  id: string;
  name: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = () => {
  const { friends, theme } = useContext(ExpenseContext);
  const { addExpense } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    selectedFriends: [] as string[],
    splitOption: "equal",
    paidBy: "me", // Default to "Me"
  });
  const [visible, setVisible] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const expense = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      friends: formData.selectedFriends,
      splitOption: formData.splitOption,
      paidBy: formData.paidBy as "string", // Ensure that paidBy is of type "string"
    };
    addExpense(expense);
    // Reset form data
    setFormData({
      description: "",
      amount: "",
      selectedFriends: [],
      splitOption: "equal",
      paidBy: "me", // Reset to "Me" after submission
    });
    // Close modal
    setVisible(false);
  };

  const handleSelectFriend = (selectedFriends: Option[]) => {
    const friendNames = selectedFriends.map((friend) => friend.name);
    setFormData({ ...formData, selectedFriends: friendNames });
  };

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="bg-[#ff652f] hover:bg-[#ff5216] shadow-sm text-white text-sm font-semibold py-2 px-4 rounded"
      >
        Add an Expense
      </button>
      {visible && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-2 bg-[#5ac4a6] rounded-t-lg">
              <h2 className="text-xl text-white font-bold">Add an Expense</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label
                  htmlFor="friends"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Select Friends
                </label>
                {/* Transform friends array into options */}
                <Autocomplete
                  options={friends.map((friend) => ({
                    id: friend.id,
                    name: friend.name,
                  }))}
                  onSelect={handleSelectFriend}
                />
              </div>
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
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
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
              <div className="mb-4">
                <label
                  htmlFor="splitOption"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Split Option
                </label>
                <select
                  id="splitOption"
                  name="splitOption"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.splitOption}
                  onChange={(e) =>
                    setFormData({ ...formData, splitOption: e.target.value })
                  }
                >
                  <option value="equal">Split Equally</option>
                  {/* <option value="exclude">Exclude</option>
                  <option value="me">Me</option> */}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="paidBy"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Paid By
                </label>
                <select
                  id="paidBy"
                  name="paidBy"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.paidBy}
                  onChange={(e) =>
                    setFormData({ ...formData, paidBy: e.target.value })
                  }
                >
                  <option value="me">Me</option>
                  {formData?.selectedFriends.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
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
                type="button"
                onClick={() => setVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-4"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;
