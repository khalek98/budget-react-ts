import { createContext, FC, ReactNode, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  AddBudgetProps,
  AddExpenseProps,
  BudgetContextProps,
  BudgetContextType,
  IBudget,
  IExpenses,
} from "../@types/budgets";
import useLocalStorage from "../hooks/useLocalStorage";

export const BudgetsContext = createContext<BudgetContextType | null>(null);

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext) as BudgetContextType;
}

export const BudgetsProvider: FC<BudgetContextProps> = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage<IBudget[]>("budgets", [
    { id: uuidV4(), name: "Eat", max: 1200 },
  ]);
  const [expenses, setExpenses] = useLocalStorage<IExpenses[]>("expenses", []);

  const getBudgetExpenses = (budgetId: string): IExpenses[] => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };
  const addExpense = ({ description, amount, budgetId }: AddExpenseProps) => {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        {
          amount,
          budgetId,
          date: Date.now(),
          description,
          id: uuidV4(),
        },
      ];
    });
  };
  const addBudget = ({ name, max }: AddBudgetProps) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };
  const deleteBudget = (id: string) => {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  };
  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
