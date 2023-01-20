import {
  Card,
  CardContent,
  Typography,
  Stack,
  LinearProgress,
  LinearProgressProps,
  CardActions,
  Button,
} from "@mui/material";

export interface BudgetCardPropsType {
  name: string;
  amount: number;
  max?: number;
  grey?: boolean;
  onAddExpenseClick?: () => void;
  onViewExpensesClick?: () => void;
  hideButtons?: boolean;
}

export default function BudgetCard({
  name,
  amount,
  max,
  grey,
  onAddExpenseClick,
  onViewExpensesClick,
  hideButtons,
}: BudgetCardPropsType): JSX.Element {
  const ratio = (max && (amount / max) * 100) || amount;

  const setBgColor = (): string | null => {
    if (max && amount > max) {
      return "rgba(211, 47, 47, .15)";
    } else if (grey) {
      return "rgba(0,0,0,0.05)";
    } else {
      return null;
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ marginTop: 3, padding: 1, borderRadius: 4, bgcolor: setBgColor }}
    >
      <CardContent>
        <Stack direction="row" marginBottom={max && 2}>
          <Typography
            fontSize={(!max && 24) || 20}
            variant="h6"
            component="h2"
            marginRight={"auto"}
          >
            {name}
          </Typography>
          <Typography fontSize={(!max && 24) || 20} variant="h6" component="div">
            {amount} ₴{" "}
            {max && max > 0 ? (
              <Typography variant="body1" component="span" color="grey">
                / {max} ₴
              </Typography>
            ) : null}
          </Typography>
        </Stack>
        {max && max > 0 ? (
          <LinearProgress
            variant="determinate"
            color={getProgressBarColor(ratio)}
            value={ratio > 100 ? 100 : ratio}
            sx={{ height: "30px", borderRadius: "20px", bgcolor: "rgba(0,0,0,.1)" }}
          />
        ) : null}
      </CardContent>
      {!hideButtons && (
        <CardActions sx={{ justifyContent: "end" }}>
          <Stack
            direction={"row"}
            gap={1}
            sx={{
              flexDirection: "row",
              "@media (max-width: 375px)": {
                flexDirection: "column",
                width: "100%",
              },
            }}
          >
            <Button
              sx={{
                width: "none",
                "@media (max-width: 375px)": {
                  width: "100%",
                },
              }}
              variant="outlined"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button
              variant="outlined"
              onClick={onViewExpensesClick}
              sx={{ filter: "grayscale(100%)" }}
            >
              View Expenses
            </Button>
          </Stack>
        </CardActions>
      )}
    </Card>
  );
}

// ₴ UAH Symbol

function getProgressBarColor(ratio: number): LinearProgressProps["color"] {
  if (ratio < 50) return "primary";
  if (ratio < 75) return "warning";

  return "error";
}
