import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Expense {
  description: string;
  amount: number;
  friends: string[];
  paidBy: string;
  splitOption: string;
}

interface Friend {
  id: string;
  name: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  friends: Friend[];
  theme: string;
  addExpense: (expense: Expense) => void;
  addFriend: (friendName: string) => void;
  toggleTheme: () => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  friends: [],
  theme: "light",
  addExpense: () => {},
  addFriend: () => {},
  toggleTheme: () => {},
});

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [friends, setFriends] = useState<Friend[]>(() => {
    const storedFriends = localStorage.getItem("friends");
    return storedFriends ? JSON.parse(storedFriends) : [];
  });
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const addFriend = (friendName: string) => {
    // Check if the friend already exists
    const existingFriend = friends.find((friend) => friend.name === friendName);
    if (existingFriend) {
      console.log("Friend already exists!");
      return;
    }

    // Generate a unique ID for the new friend
    const newFriend: Friend = {
      id: `${Date.now()}-${friendName}`, // Using current timestamp as a part of ID
      name: friendName,
    };

    // Update the friends list
    setFriends((prevFriends) => [...prevFriends, newFriend]);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  return (
    <ExpenseContext.Provider
      value={{ expenses, friends, theme, addExpense, addFriend, toggleTheme }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);
