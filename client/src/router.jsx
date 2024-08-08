import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import TagsPage from "./pages/TagsPage";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            if (!localStorage.getItem('token')) return null;
            return redirect('/')
        }
    },
    {
        path: '/register',
        element: <RegisterPage />,
        loader: () => {
            if (!localStorage.getItem('token')) return null;
            return redirect('/')
        }
    },
    {
        path: '',
        element: <MainLayout />,
        loader: () => {
            if (localStorage.getItem('token')) return null;
            return redirect('/login')
        },
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'tags',
                element: <TagsPage />
            }
        ]
    },
])

export default router;