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
  youOwe: Record<string, number>; // New property to store net amounts owed by you
  youAreOwed: Record<string, number>; // New property to store net amounts owed to you
  addExpense: (expense: Expense) => void;
  addFriend: (friendName: string) => void;
  toggleTheme: () => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  friends: [],
  theme: "light",
  youOwe: {},
  youAreOwed: {},
  addExpense: () => {},
  addFriend: () => {},
  toggleTheme: () => {},
});

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [theme, setTheme] = useState<string>("light");
  const [youOwe, setYouOwe] = useState<Record<string, number>>({});
  const [youAreOwed, setYouAreOwed] = useState<Record<string, number>>({});

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, expense];
      calculateNetAmounts(updatedExpenses, friends);
      return updatedExpenses;
    });
  };

  const addFriend = (friendName: string) => {
    setFriends((prevFriends) => {
      const existingFriend = prevFriends.find(
        (friend) => friend.name === friendName
      );
      if (existingFriend) {
        console.log("Friend already exists!");
        return prevFriends;
      }

      const newFriend: Friend = {
        id: `${Date.now()}-${friendName}`,
        name: friendName,
      };

      const updatedFriends = [...prevFriends, newFriend];
      return updatedFriends;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const calculateNetAmounts = (expenses: Expense[], friends: Friend[]) => {
    const you = "me";
    const owedByMe: Record<string, number> = {};
    const owedToMe: Record<string, number> = {};

    expenses.forEach((expense) => {
      const { amount, friends: expenseFriends, splitOption, paidBy } = expense;
      const splitAmount = amount / (expenseFriends.length + 1);

      expenseFriends.forEach((friend) => {
        if (friend !== paidBy || splitOption === "equal") {
          const amountToChange = paidBy === you ? splitAmount : -splitAmount;

          if (friend === you) {
            owedByMe[paidBy] = (owedByMe[paidBy] || 0) + amountToChange;
          } else if (paidBy === you) {
            owedToMe[friend] = (owedToMe[friend] || 0) + amountToChange;
          }
        }
      });
    });

    const netYouOwe: Record<string, number> = {};
    const netYouAreOwed: Record<string, number> = {};

    friends.forEach((friend) => {
      netYouOwe[friend.name] = Math.max(
        0,
        (owedByMe[friend.name] || 0) - (owedToMe[friend.name] || 0)
      );
      netYouAreOwed[friend.name] = Math.max(
        0,
        (owedToMe[friend.name] || 0) - (owedByMe[friend.name] || 0)
      );
    });

    setYouOwe(netYouOwe);
    setYouAreOwed(netYouAreOwed);
  };

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const storedFriends = localStorage.getItem("friends");
    const storedTheme = localStorage.getItem("theme");

    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    if (storedFriends) setFriends(JSON.parse(storedFriends));
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("friends", JSON.stringify(friends));
    calculateNetAmounts(expenses, friends);
  }, [expenses, friends]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        friends,
        theme,
        youOwe,
        youAreOwed,
        addExpense,
        addFriend,
        toggleTheme,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
