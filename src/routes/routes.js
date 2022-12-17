import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "../modules/layout";
import LoginPage from "../modules/auth/LoginPage";
import Page404 from "../modules/error/Page404";
import MoviesPage from "../modules/movie/MoviesPage";

const Router = () => {
  const users = useSelector((state) => state.users);
  const IsAuth = users.userList.length;

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
          element: !IsAuth ? <LoginPage /> : <Navigate to="/Movies" replace />,
        },
        {
          path: "Movies",
          element: !!IsAuth ? <MoviesPage /> : <Navigate to="/Login" replace />,
        },
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
