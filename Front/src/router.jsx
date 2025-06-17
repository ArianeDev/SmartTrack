import { createBrowserRouter } from "react-router-dom";
import { DataSensor } from "./Page/DataSensor";
import { DataHistory } from "./Page/History";
import { HomePage } from "./Page/HomePage";
import { HomeUser } from "./Page/HomeUser";
import { Login } from "./Page/Login";
import { Register } from "./Page/Register";

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
    {
        path: '/history',
        element: <DataHistory />
    },
])

export default router;