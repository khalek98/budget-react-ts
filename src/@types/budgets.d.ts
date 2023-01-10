import { ReactNode } from "react";

export type budgetId = string;

export type AddBudgetProps = {
  name: string;
  max: number;
};

export type AddExpenseProps = {
  description: string;
  amount: string;
  budgetId: budgetId;
  date: number;
};

export type BudgetContextType = {
  budgets: IBudget[];
  expenses: IExpenses[];
  getBudgetExpenses: (budgetId: budgetId) => IExpenses[];
  addExpense: ({ description, amount, budgetId }: AddExpemdeProps) => void;
  addBudget: ({ name, max }: AddBudgetProps) => void;
  deleteBudget: (id: string) => void;
  deleteExpense: (id: string) => void;
};

export interface IExpenses {
  id: string;
  budgetId: budgetId;
  amount: string;
  description: string;
  date: number;
}

export type IBudget = {
  id: string;
  name: string;
  max?: number;
};

export interface BudgetContextProps {
  children: ReactNode;
}
