import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink, useParams } from "react-router-dom";
import { EditExpenseProps } from "../../@types/budgets";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";
import { removeLeadingZeros } from "../../utils/removeLeadingZeros";

type Props = {};
interface IFormInputs {
  description: string;
  amount: string;
  budgetId: string;
}

const ExpenseInfo: FC<Props> = ({}) => {
  const { id } = useParams();
  const { expenses, budgets, editExpense } = useBudgets();
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

  const expense = expenses.find((exp) => exp.date.toString() === id);

  const [inputStates, setInputStates] = useState<EditExpenseProps>({
    description: "",
    date: 0,
    amount: "",
    budgetId: UNCATEGORIZED_BUDGET_ID,
  });

  useEffect(() => {
    if (!expense) return;
    setInputStates({
      ...expense,
    });
  }, []);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (!expense) return;
    editExpense(expense.id, { ...inputStates });
  };

  return (
    <>
      <Container fixed maxWidth="md" sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Stack direction="row" justifyContent={"space-between"} mb={4}>
          <Typography component={"h1"} variant="h4" fontWeight={"bold"}>
            Expence info
          </Typography>
          <Button
            sx={{ maxHeight: "50px", width: "110px" }}
            variant="contained"
            component={RouterLink}
            to="/"
          >
            ← Back
          </Button>
        </Stack>
        <Card variant="outlined">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Stack direction="column" spacing={2}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="standard-basic"
                      variant="standard"
                      value={inputStates.description}
                      InputLabelProps={{ shrink: true }}
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
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="standard-number"
                      variant="standard"
                      value={inputStates.amount}
                      onChange={(e) => {
                        const value = e.target.value;
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
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        inputProps: { inputMode: "numeric", step: "0.01" },
                      }}
                      error={!!errors.amount?.message}
                      helperText={errors?.amount?.message}
                    />
                  )}
                />
                <FormControl fullWidth variant="standard" sx={{ marginTop: "25px!important" }}>
                  <InputLabel id="demo-simple-select-standard-label">Budget</InputLabel>
                  <Controller
                    name="budgetId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant="standard"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={inputStates.budgetId}
                        label="Budget"
                        onChange={(e: SelectChangeEvent) =>
                          setInputStates((prev) => {
                            field.onChange(e);
                            return { ...prev, budgetId: e.target.value };
                          })
                        }
                      >
                        <MenuItem value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</MenuItem>
                        {budgets.map((budget) => (
                          <MenuItem value={budget.id} key={budget.id}>
                            {budget.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Stack>
            </CardContent>
            <CardActions>
              <Button type="submit">Save</Button>
            </CardActions>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default ExpenseInfo;
