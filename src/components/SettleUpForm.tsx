import React, { useState } from "react";
import { useModal } from "react-modal-hook";

interface SettleUpFormProps {
  friends: string[];
}

const SettleUpForm: React.FC<SettleUpFormProps> = ({ friends }) => {
  const [showModal, hideModal] = useModal(() => (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Settle Up</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="debtor"
              className="block text-gray-700 font-bold mb-2"
            >
              Debtor
            </label>
            <select
              id="debtor"
              name="debtor"
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Debtor</option>
              {friends.map((friend, index) => (
                <option key={index} value={friend}>
                  {friend}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="creditor"
              className="block text-gray-700 font-bold mb-2"
            >
              Creditor
            </label>
            <select
              id="creditor"
              name="creditor"
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Creditor</option>
              {friends.map((friend, index) => (
                <option key={index} value={friend}>
                  {friend}
                </option>
              ))}
            </select>
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
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Settle Up
            </button>
            <button
              onClick={hideModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  ));

  return (
    <div>
      <button
        onClick={showModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Settle Up
      </button>
    </div>
  );
};

export default SettleUpForm;
