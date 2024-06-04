import React, { useState, useContext } from "react";
import { ExpenseContext } from "../contexts/ExpenseContext";

interface AddFriendFormProps {}

const AddFriendForm: React.FC<AddFriendFormProps> = () => {
  const { addFriend } = useContext(ExpenseContext); // Access the addFriend function from ExpenseContext
  const [name, setName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() !== "") {
      addFriend(name); // Call the addFriend function from ExpenseContext
      setName("");
      setShowModal(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#5ac5a6] hover:bg-[#47bf9d] shadow-sm text-white text-sm font-semibold py-2 px-4 rounded ml-2"
      >
        Add Friend
      </button>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add Friend</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Friend
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFriendForm;
