import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import TodoList from "./pages/todolist";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    { path: "/todo/:id", element: <TodoList /> },
]);

export default router;
