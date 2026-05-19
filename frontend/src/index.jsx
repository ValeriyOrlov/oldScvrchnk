import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./app/App";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
])

container.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)