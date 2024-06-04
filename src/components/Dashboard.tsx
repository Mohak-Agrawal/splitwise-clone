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

    const owedByMe: Record<string, number> = {};
    const owedToMe: Record<string, number> = {};
    const youOwe: Record<string, number> = {};
    const youAreOwed: Record<string, number> = {};
    const allFriends: Record<string, number> = {};

    expenses.forEach((expense) => {
      const { amount, friends: expenseFriends, splitOption, paidBy } = expense;
      const splitAmount = amount / (expenseFriends.length + 1);

      expenseFriends.forEach((friend) => {
        if (friend !== paidBy || splitOption === "equal") {
          const amountToChange = paidBy === you ? splitAmount : -splitAmount;

          if (friend === you) {
            owedByMe[paidBy] = (owedByMe[paidBy] || 0) + amountToChange;
            if (amountToChange > 0) youOwe[paidBy] = amountToChange;
          } else if (paidBy === you) {
            owedToMe[friend] = (owedToMe[friend] || 0) + amountToChange;
            if (amountToChange > 0) youAreOwed[friend] = amountToChange;
          } else {
            owedByMe[friend] = (owedByMe[friend] || 0) + amountToChange;
            owedToMe[paidBy] = (owedToMe[paidBy] || 0) + amountToChange;
            if (amountToChange > 0) allFriends[friend] = amountToChange;
            if (amountToChange < 0) allFriends[paidBy] = -amountToChange;
          }
        }
      });
    });

    const totalBalance =
      Object.values(owedByMe).reduce((acc, amount) => acc + amount, 0) -
      Object.values(owedToMe).reduce((acc, amount) => acc + amount, 0);

    return {
      totalBalance,
      owedByMe,
      owedToMe,
      youOwe,
      youAreOwed,
      allFriends,
    };
  };

  const {
    owedByMe: amountsOwedByMe,
    owedToMe: amountsOwedToMe,
    totalBalance: totalNetAmount,
  } = calculateAmounts();

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
                <li key={index} className="border-r mr-2 flex flex-col">
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
          <h2 className="text-xl font-semibold text-[#a4a4a4] mb-4">
            You Are Owed
          </h2>
          <ul>
            {Object.entries(amountsOwedToMe).map(
              ([friendName, amount], index) => (
                <li key={index} className="border-r mr-2 flex flex-col">
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
