import { useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "../BudgetCard";
import { totalExpenses } from "./totalExpenses";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const total = totalExpenses(expenses);

  const max =
    budgets.length > 0
      ? budgets.reduce((total, budget) => total + +(budget.max ? budget.max : 0), 0)
      : 0;

  // if (max === 0) return null;

  return <BudgetCard amount={total} grey name="Total" max={max} hideButtons />;
}
