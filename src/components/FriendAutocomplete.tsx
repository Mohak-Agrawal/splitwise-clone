import React, { useState } from "react";

interface FriendAutocompleteProps {
  friends: string[];
  setFriends: (friends: string[]) => void;
}

const FriendAutocomplete: React.FC<FriendAutocompleteProps> = ({
  friends,
  setFriends,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [allFriends, setAllFriends] = useState<string[]>([]); // Fetch or add all friends here

  const handleAddFriend = () => {
    if (!friends.includes(inputValue) && inputValue.trim()) {
      setFriends([...friends, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add Friends"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <button
        onClick={handleAddFriend}
        className="bg-green-500 text-white p-2 rounded"
      >
        Add
      </button>
      <div>
        {friends.map((friend, index) => (
          <span
            key={index}
            className="bg-gray-200 p-1 rounded m-1 inline-block"
          >
            {friend}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FriendAutocomplete;
