import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import SettleUpForm from "./SettleUpForm";
import AddFriendForm from "./AddFriendForm";

interface Group {
  friends: string[];
}

const Dashboard: React.FC = () => {
  const [group, setGroup] = useState<Group>({ friends: [] });
  const [loading, setLoading] = useState(false);

  const amountsOwed: Record<string, number> = {
    "Friend 1": 10,
    "Friend 2": 5,
    "Friend 3": 0,
  };

  const amountsOwing: Record<string, number> = {
    "Friend 1": 0,
    "Friend 2": 15,
    "Friend 3": 5,
  };

  const totalOwed = Object.values(amountsOwed).reduce(
    (acc, amount) => acc + amount,
    0
  );
  const totalOwing = Object.values(amountsOwing).reduce(
    (acc, amount) => acc + amount,
    0
  );

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex-grow bg-white shadow-xl border-x border-[#CFCFCF]">
      <div className="border-b border-[#DDDDDD] p-4 flex flex-row items-center justify-between bg-[#eeeeee]">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <div className="flex flex-row items-center">
          <ExpenseForm friends={group.friends} />
          <AddFriendForm />
          <SettleUpForm friends={group.friends} />
        </div>
      </div>
      <div className="border-b border-[#DDDDDD] p-2 flex flex-row items-center justify-between bg-[#eeeeee]">
        <div className="grid grid-cols-3 gap-x-4 w-full">
          <div className="border-r border-[#DDDDDD] items-center justify-center flex flex-col">
            <p className="text-[#A8A8A8] text-sm font-medium">total balance</p>
            <p className="text-[#A8A8A8] text-sm font-medium">
              ${totalOwing - totalOwed}
            </p>
          </div>
          <div className="border-r border-[#DDDDDD] items-center justify-center flex flex-col">
            <p className="text-[#A8A8A8] text-sm font-medium">you owe</p>
            <p className="text-[#A8A8A8] text-sm font-medium">${totalOwed}</p>
          </div>
          <div className="items-center justify-center flex flex-col">
            <p className="text-[#A8A8A8] text-sm font-medium">you are owed</p>
            <p className="text-[#A8A8A8] text-sm font-medium">${totalOwing}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between p-4">
        <div className="w-full">
          <h2 className="text-xl font-semibold text-[#a4a4a4] mb-4">You Owe</h2>
          <ul>
            {group.friends.map((friend, index) => (
              <li key={index} className="border-r mr-2 flex flex-col">
                <p className="text-md text-black">{friend}</p>
                <p>${amountsOwed[friend] ?? 0}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold text-[#a4a4a4] mb-4">
            You Are Owed
          </h2>
          <ul>
            {group.friends.map((friend, index) => (
              <li key={index} className="">
                {friend}: ${amountsOwing[friend] ?? 0}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
