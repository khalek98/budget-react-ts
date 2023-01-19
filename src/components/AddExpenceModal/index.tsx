import { Dispatch, SetStateAction, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";
import { budgetId } from "../../@types/budgets";
import { removeLeadingZeros } from "../../utils/removeLeadingZeros";

type Props = {
  show: boolean;
  handleClose: () => void;
  defaultBudgetId: budgetId;
  setAddExpenseModalBudgetId: Dispatch<SetStateAction<budgetId>>;
};

interface IFormInputs {
  description: string;
  amount: string;
}

export default function AddExpenceModal({
  show,
  handleClose,
  defaultBudgetId,
  setAddExpenseModalBudgetId,
}: Props) {
  const { addExpense, budgets } = useBudgets();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const [inputStates, setInputStates] = useState<IFormInputs>({
    description: "",
    amount: "",
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    addExpense({
      description: data.description,
      amount: data.amount,
      budgetId: defaultBudgetId,
      date: Date.now(),
    });

    reset();
    setInputStates({
      description: "",
      amount: "",
    });
    handleClose();
  };

  return (
    <Dialog fullWidth open={show} onClose={handleClose}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>New Expense</DialogTitle>
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
            <Controller
              control={control}
              name="description"
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={inputStates.description}
                  onChange={(e) => {
                    setInputStates({
                      ...inputStates,
                      description: e.target.value,
                    });
                    field.onChange(e);
                  }}
                  size="medium"
                  fullWidth
                  label="Description"
                  error={!!errors.description?.message}
                  helperText={errors?.description?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="amount"
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={inputStates.amount}
                  onChange={(e) => {
                    const value = removeLeadingZeros(e.target.value);
                    field.onChange(e);
                    setInputStates({
                      ...inputStates,
                      amount: value,
                    });
                  }}
                  size="medium"
                  fullWidth
                  label="Amount"
                  type="number"
                  InputProps={{
                    inputProps: { pattern: "[0-9*]", inputMode: "numeric", step: "0.01" },
                  }}
                  error={!!errors.amount?.message}
                  helperText={errors?.amount?.message}
                />
              )}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-select-small">Budget</InputLabel>
              <Select
                name="BudgetId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={defaultBudgetId}
                label="Budget"
                onChange={(e: SelectChangeEvent) => setAddExpenseModalBudgetId(e.target.value)}
              >
                <MenuItem value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</MenuItem>
                {budgets.map((budget) => (
                  <MenuItem value={budget.id} key={budget.id}>
                    {budget.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ padding: "0 16px 12px 0" }}>
          <Button variant="contained" type="submit">
            Add new expense
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
