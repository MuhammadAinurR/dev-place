import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <HomePage />
            }
        ]
    },
])

export default router;