import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./Page/HomePage";
import { HomeUser } from "./Page/HomeUser";
import { Login } from "./Page/Login";
import { Register } from "./Page/Register";
import { DataSensor } from "./Page/DataSensor";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <HomeUser />
    },
    {
        path: '/sensor',
        element: <DataSensor />
    },
])

export default router;