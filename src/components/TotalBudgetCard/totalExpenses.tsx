import { IExpenses } from "../../@types/budgets";

export const totalExpenses = (expensesArr: IExpenses[]) => {
  const total = expensesArr.reduce((total, expense) => total + +expense.amount, 0);

  return +total.toFixed(2);
};
