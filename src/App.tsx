import { useState } from "react";
import { budgetId } from "./@types/budgets";
import Container from "@mui/material/Container";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import Header from "./components/Header";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import AddExpenceModal from "./components/AddExpenceModal";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App(): JSX.Element {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viweExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState<budgetId | null>(null);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] =
    useState<budgetId>(UNCATEGORIZED_BUDGET_ID);
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId: string) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <div className="App">
      <Container maxWidth="xl" fixed>
        <Header
          openAddBudgetModal={() => setShowAddBudgetModal(true)}
          openAddExpenceModal={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
        />
        {budgets.map(({ name, max, id }) => {
          const amount = getBudgetExpenses(id).reduce((prev, cur) => prev + +cur.amount, 0);
          return (
            <BudgetCard
              name={name}
              amount={amount}
              max={max}
              key={id}
              onAddExpenseClick={() => openAddExpenseModal(id)}
              onViewExpensesClick={() => setViewExpensesModalBudgetId(id)}
            />
          );
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
          onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
        />
        <TotalBudgetCard />
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenceModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
        setAddExpenseModalBudgetId={setAddExpenseModalBudgetId}
      />
      {viweExpensesModalBudgetId && (
        <ViewExpensesModal
          budgetId={viweExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId(null)}
        />
      )}
    </div>
  );
}

export default App;
