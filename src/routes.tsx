import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import TodoList from "./pages/todolist";
import App from "./App";
import { NotFound } from "./pages/notfound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    { path: "/todo/:id", element: <TodoList /> },
    { path: "*", element: <NotFound /> },
]);

export default router;
