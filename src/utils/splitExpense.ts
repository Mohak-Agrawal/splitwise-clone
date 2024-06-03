export const splitExpense = (
  amount: number,
  friends: string[],
  splitType: string
) => {
  let splits: { [key: string]: number } = {};

  if (splitType === "equally") {
    const splitAmount = amount / (friends.length + 1);
    splits = friends.reduce((acc, friend) => {
      acc[friend] = splitAmount;
      return acc;
    }, {} as { [key: string]: number });
  }

  return splits;
};
