// contexts/ExpenseContext.tsx
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
}

interface ExpenseContextType {
  expenses: Expense[];
  friends: string[];
  theme: string;
  addExpense: (expense: Expense) => void;
  addFriend: (friend: string) => void;
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
  const [friends, setFriends] = useState<string[]>(() => {
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

  const addFriend = (friend: string) => {
    setFriends((prevFriends) => [...prevFriends, friend]);
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
