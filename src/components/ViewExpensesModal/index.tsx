import { Fragment } from "react";
import { format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";
import { budgetId, IBudget } from "../../@types/budgets";

type Props = {
  budgetId: budgetId;
  handleClose: () => void;
};

export default function ViewExpensesModal({ budgetId, handleClose }: Props) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? ({ name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID } as IBudget)
      : budgets.find((b) => b.id === budgetId);

  return (
    <Dialog fullWidth open={budgetId !== null} onClose={handleClose}>
      <DialogTitle marginTop={1}>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "20px",
                md: "28px",
              },
              maxWidth: { xs: "50%", sm: "100%" },
            }}
            component="h3"
          >
            {budget && budget.name}
          </Typography>
          {budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <Button
              onClick={() => {
                deleteBudget(budgetId);
                handleClose();
              }}
              variant="contained"
              color="error"
              sx={{ maxHeight: "35px" }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Stack direction="column" spacing={2}>
          {expenses.length < 1 ? (
            <Typography
              sx={{
                fontSize: {
                  xs: "20px",
                  md: "26px",
                },
              }}
            >
              There are not expenses.
            </Typography>
          ) : (
            expenses.map((expense, i) => (
              <Fragment key={expense.id}>
                <Card sx={{ display: "flex" }}>
                  <CardActionArea
                    component={RouterLink}
                    to={`expense/${expense.date}`}
                    sx={{ padding: "12px 8px" }}
                  >
                    <Stack direction="row" gap={2}>
                      <Typography
                        variant="h6"
                        sx={{ display: "inline-flex", mr: "auto", alignItems: "center" }}
                      >
                        {expense.description}
                      </Typography>
                      <Stack direction="column" gap={0} alignItems="end" justifyContent={"center"}>
                        <Typography variant="h6">{+expense.amount} ₴</Typography>
                        <Typography variant="caption">
                          {format(expense.date, "dd/MM/yyyy")}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardActionArea>
                  <CardActions>
                    <Button onClick={() => deleteExpense(expense.id)} sx={{ minWidth: "30px" }}>
                      <HighlightOffIcon sx={{ color: "red" }} />
                    </Button>
                  </CardActions>
                </Card>
              </Fragment>
            ))
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
