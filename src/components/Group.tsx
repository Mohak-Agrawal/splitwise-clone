import React, { useState } from "react";
import FriendAutocomplete from "./FriendAutocomplete";
import ExpenseForm from "./ExpenseForm";
import useLocalStorage from "../hooks/useLocalStorage";

interface Group {
  name: string;
  friends: string[];
}

const Group: React.FC = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [groupFriends, setGroupFriends] = useState<string[]>([]);
  const [groups, setGroups] = useLocalStorage<Group[]>("groups", []);

  const handleCreateGroup = () => {
    if (groupName.trim() && groupFriends.length > 0) {
      const newGroup = { name: groupName, friends: groupFriends };
      setGroups([...groups, newGroup]);
      setGroupName("");
      setGroupFriends([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Groups</h1>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border p-2 my-2 w-full"
        />
        <FriendAutocomplete
          friends={groupFriends}
          setFriends={setGroupFriends}
        />
        <button
          onClick={handleCreateGroup}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Create Group
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Groups</h2>
        {groups.map((group, index) => (
          <div key={index} className="border p-4 my-2">
            <h3 className="text-lg font-bold">{group.name}</h3>
            <p>Friends: {group.friends.join(", ")}</p>
            <ExpenseForm />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;
