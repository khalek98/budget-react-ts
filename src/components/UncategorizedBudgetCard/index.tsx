import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "../BudgetCard";

interface UncotegorizedProps {
  onAddExpenseClick: () => void;
  onViewExpensesClick: () => void;
}

export default function UncategorizedBudgetCard({
  onAddExpenseClick,
  onViewExpensesClick,
}: UncotegorizedProps) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (prev, cur) => prev + +cur.amount,
    0,
  );

  if (amount === 0) return null;

  return (
    <BudgetCard
      amount={amount}
      grey
      name="Uncategorized"
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
    />
  );
}
