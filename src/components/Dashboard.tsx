import React, { useState, useContext } from "react";
import ExpenseForm from "./ExpenseForm";
import AddFriendForm from "./AddFriendForm";
import { ExpenseContext } from "../contexts/ExpenseContext";

const Dashboard: React.FC = () => {
  const { expenses, friends } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(false);

  console.log("expenses", expenses);

  const calculateAmounts = () => {
    const you = "me";

    const transactions: Record<string, { amount: number }[]> = {};

    // Iterate through expenses
    expenses.forEach((expense) => {
      const { amount, friends: expenseFriends, splitOption, paidBy } = expense;
      const splitAmount = amount / (expenseFriends.length + 1);

      // Iterate through each friend involved in the expense
      expenseFriends.forEach((friend) => {
        if (friend !== paidBy || splitOption === "equal") {
          const amountToChange = paidBy === you ? splitAmount : -splitAmount;

          // Check if the friend exists in the transactions object
          if (!transactions[friend]) {
            transactions[friend] = [];
          }

          // Add the transaction to the friend's array
          transactions[friend].push({ amount: amountToChange });
        }
      });
    });

    console.log({ transactions });

    // Calculate the net amounts for each user
    const netAmounts: Record<string, number> = {};

    // Iterate through transactions to calculate net amounts
    Object.entries(transactions).forEach(([friend, transactionsArray]) => {
      transactionsArray.forEach(({ amount }) => {
        netAmounts[friend] = (netAmounts[friend] || 0) + amount;
      });
    });

    console.log({ netAmounts });

    // Divide netAmounts into two parts: amounts you owe and amounts you are owed
    const amountsOwedByMe: Record<string, number> = {};
    const amountsOwedToMe: Record<string, number> = {};

    Object.entries(netAmounts).forEach(([friend, amount]) => {
      if (amount > 0) {
        // If amount is positive, it means you owe the friend
        amountsOwedToMe[friend] = amount;
      } else if (amount < 0) {
        // If amount is negative, it means the friend owes you
        amountsOwedByMe[friend] = Math.abs(amount);
      }
    });

    console.log({ amountsOwedByMe });
    console.log({ amountsOwedToMe });

    return {
      transactions,
      amountsOwedByMe,
      amountsOwedToMe,
    };
  };

  const { transactions, amountsOwedByMe, amountsOwedToMe } = calculateAmounts();
  console.log(transactions);

  // Calculate the absolute total amount owed by you
  const totalOwedByYou = Math.abs(
    Object.values(amountsOwedByMe).reduce((total, amount) => total + amount, 0)
  );

  // Calculate the absolute total amount owed to you
  const totalOwedToYou = Math.abs(
    Object.values(amountsOwedToMe).reduce((total, amount) => total + amount, 0)
  );

  console.log("Total amount owed by you:", totalOwedByYou);
  console.log("Total amount owed to you:", totalOwedToYou);
  const balanceAmount = totalOwedToYou - totalOwedByYou;

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex-grow bg-white shadow-xl border-x border-[#CFCFCF]">
      <div className="border-b border-[#DDDDDD] p-4 flex flex-row items-center justify-between bg-[#eeeeee]">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <div className="flex flex-row items-center">
          <ExpenseForm />
          <AddFriendForm />
          {/* SettleUpForm goes here */}
        </div>
      </div>
      <div className="border-b border-[#DDDDDD] p-2 flex flex-row items-center justify-between bg-[#eeeeee]">
        <div className="grid grid-cols-3 gap-x-4 w-full">
          <div className="border-r border-[#DDDDDD] items-center justify-center flex flex-col">
            <p className="text-[#A8A8A8] text-sm font-medium">Total balance</p>
            <p
              className={`text-[#A8A8A8] text-sm font-medium ${
                balanceAmount > 0
                  ? "text-green-500"
                  : balanceAmount < 0
                  ? "text-red-500"
                  : "text-[#A8A8A8]"
              }`}
            >
              ${balanceAmount}
            </p>
          </div>
          <div className="border-r border-[#DDDDDD] items-center justify-center flex flex-col">
            <p className="text-[#A8A8A8] text-sm font-medium">You owe</p>
            <p
              className={`text-[#A8A8A8] text-sm font-medium ${
                totalOwedByYou > 0 ? "text-red-500" : "text-[#A8A8A8]"
              }`}
            >
              ${Math.abs(totalOwedByYou)}
            </p>
          </div>
          <div className="items-center justify-center flex flex-col">
            <p className="text-[#A8A8A8] text-sm font-medium">You are owed</p>
            <p
              className={`text-[#A8A8A8] text-sm font-medium ${
                totalOwedToYou > 0 ? "text-green-500" : "text-[#A8A8A8]"
              }`}
            >
              ${Math.abs(totalOwedToYou)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between p-4">
        <div className="w-full">
          <h2 className="text-xl font-semibold text-[#a4a4a4] mb-4">You Owe</h2>
          <ul>
            {Object.entries(amountsOwedByMe).map(
              ([friendName, amount], index) => (
                <li key={index} className="border-r flex flex-col  items-start">
                  <p className="text-md text-black">{friendName}</p>
                  <p
                    className={`text-md ${
                      amount > 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    ${Math.abs(amount)}
                  </p>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold text-[#a4a4a4] mb-4 text-right">
            You Are Owed
          </h2>
          <ul>
            {Object.entries(amountsOwedToMe).map(
              ([friendName, amount], index) => (
                <li key={index} className=" flex flex-col items-end">
                  <p className="text-md text-black">{friendName}</p>
                  <p
                    className={`text-md ${
                      amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ${Math.abs(amount)}
                  </p>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
