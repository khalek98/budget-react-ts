import { FC } from "react";
import { RouterProvider, createBrowserRouter, Route } from "react-router-dom";
import { MainView, SecondView } from "./View";

const router = createBrowserRouter([
  { path: "/", element: <MainView /> },
  { path: "total", element: <SecondView text="Total Budget" /> },
]);

const App: FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
