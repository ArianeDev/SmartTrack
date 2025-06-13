import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Page/Home";
import { Register } from "./Page/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/register',
        element: <Register />
    }
])