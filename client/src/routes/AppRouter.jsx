import React, { useEffect } from "react";
import { privateRoutes, publicRoutes } from "./routes";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import { useSelector } from "react-redux";
import { setToken } from "../api/api";
import { PROFILE_ROUTE } from "./constant-route";

const AppRouter = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setToken(user.token);
  }, [user.token]);

  return user.id ? (
    <Routes>
      {privateRoutes.map(({ path, Component }, index) => (
        <Route path={path} key={index} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={PROFILE_ROUTE} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }, index) => (
        <Route path={path} key={index} element={<Component />} />
      ))}
      <Route path={"*"} element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;
