import { Button, Stack, Typography } from "@mui/material";

type Props = {
  openAddBudgetModal: () => void;
  openAddExpenceModal: () => void;
};

export default function Header({ openAddBudgetModal, openAddExpenceModal }: Props): JSX.Element {
  return (
    <Stack direction="row" marginTop={2}>
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
        <Button onClick={() => openAddExpenceModal()} variant="outlined">
          Add Expence
        </Button>
      </Stack>
    </Stack>
  );
}
