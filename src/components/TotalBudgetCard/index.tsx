import { useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "../BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const total = expenses.reduce((total, expense) => total + +expense.amount, 0);
  const max =
    budgets.length > 0
      ? budgets.reduce((total, budget) => total + +(budget.max ? budget.max : 0), 0)
      : 0;

  // if (max === 0) return null;

  return <BudgetCard amount={+total.toFixed(2)} grey name="Total" max={max} hideButtons />;
}
