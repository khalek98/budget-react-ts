import { FC, useState } from "react";
import { budgetId } from "../../@types/budgets";
import Container from "@mui/material/Container";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";
import {
  Header,
  BudgetCard,
  AddBudgetModal,
  UncategorizedBudgetCard,
  AddExpenceModal,
  TotalBudgetCard,
  ViewExpensesModal,
} from "../../components";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Main: FC = () => {
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
    <>
      <Container maxWidth="md" fixed sx={{ pt: 2, pb: 2 }}>
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
        <Button
          component={RouterLink}
          to="total"
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2, width: "100%", height: 70, borderRadius: 5 }}
        >
          Total Budget
        </Button>
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
    </>
  );
};

export default Main;
