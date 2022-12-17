import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "../modules/layout";
import LoginPage from "../modules/auth/LoginPage";
import Page404 from "../modules/error/Page404";
import MoviesPage from "../modules/movie/MoviesPage";

const Router = () => {
  const users = useSelector((state) => state.users);

  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/Login" replace />,
        },
        {
          path: "Login",
          element: !users.userList.length ? (
            <LoginPage />
          ) : (
            <Navigate to="/Movies" replace />
          ),
        },
        { path: "Movies", element: <MoviesPage /> },
        { path: "404", element: <Page404 /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};

export { Router };
