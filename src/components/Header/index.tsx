import { Button, Stack, Typography } from "@mui/material";

type Props = {
  openAddBudgetModal: () => void;
  openAddExpenseModal: () => void;
};

export default function Header({ openAddBudgetModal, openAddExpenseModal }: Props): JSX.Element {
  return (
    <Stack direction="row">
      <Typography
        variant="h2"
        component="h1"
        sx={{ marginRight: "auto", fontSize: { xs: 50, sm: 40 } }}
      >
        Budget
      </Typography>
      <Stack gap={1} direction="row" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
        <Button onClick={openAddBudgetModal} variant="contained">
          Add Budget
        </Button>
        <Button onClick={() => openAddExpenseModal()} variant="outlined">
          Add Expense
        </Button>
      </Stack>
    </Stack>
  );
}
