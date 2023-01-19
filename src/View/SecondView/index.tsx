import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Link, Stack, Typography } from "@mui/material";
import { TotalBudgetCard } from "../../components";

type Props = {
  text: string;
};

const SecondView = ({ text }: Props) => {
  return (
    <>
      <Container maxWidth="md" fixed sx={{ paddingTop: 2 }}>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography component={"h1"} variant="h3">
            {text}
          </Typography>
          <Button
            sx={{ maxHeight: "50px", width: "100px" }}
            variant="contained"
            component={RouterLink}
            to="/"
          >
            ← Back
          </Button>
        </Stack>
        <TotalBudgetCard />
      </Container>
    </>
  );
};

export default SecondView;
