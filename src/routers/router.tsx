import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import SchedulePage from "../pages/SchedulePage";
import AnimeInfoPage from "../pages/AnimeInfoPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />
            },
            {
                path: '/home',
                element: <HomePage />
            },
            {
                path: '/schedule',
                element: <SchedulePage />
            },
            {
                path: '/:animeId',
                element: <AnimeInfoPage />
            },
        ]
    }
])