import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { BudgetsProvider } from "./contexts/BudgetsContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <CssBaseline />
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </>,
);
