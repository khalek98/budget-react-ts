import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useBudgets } from "../../contexts/BudgetsContext";

type Props = {
  show: boolean;
  handleClose: () => void;
};

interface IFormInputs {
  nameField: string;
  maxSpending: number;
}

export default function AddBudgetModal({ show, handleClose }: Props) {
  const { addBudget } = useBudgets();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({});

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    addBudget({
      name: data.nameField,
      max: data.maxSpending,
    });

    reset();
    handleClose();
  };

  return (
    <Dialog fullWidth open={show} onClose={handleClose}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>New Budget</DialogTitle>
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
              name="nameField"
              rules={{
                required: "Required",
                validate: (value) => {
                  if (value && value.length < 2) {
                    return "Minimum 2 symbols";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  size="medium"
                  fullWidth
                  label="Name"
                  error={!!errors.nameField?.message}
                  helperText={errors?.nameField?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="maxSpending"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  size="medium"
                  fullWidth
                  label="Max Spending"
                  type="number"
                  error={!!errors.maxSpending?.message}
                  helperText={errors?.maxSpending?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ padding: "0 16px 12px 0" }}>
          <Button variant="contained" type="submit">
            Add new Budget
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
