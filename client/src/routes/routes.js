import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import UsersPage from "../pages/UsersPage";
import { LOGIN_ROUTE, PROFILE_ROUTE, USERS_ROUTE } from "./constant-route";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
];

export const privateRoutes = [
  {
    path: USERS_ROUTE,
    Component: UsersPage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
];
