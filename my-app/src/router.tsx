// src/AppRouter.tsx

import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/registro";
import { RouterLayout } from "./common/RouterLayout";
import { RecoveryPage } from "./pages/recuperacion";
import { CursoPage } from "./pages/curso";
import PrivateRoute from "././components/storageUser/privateRoute";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/curso" element={<PrivateRoute />}>
          <Route index element={<CursoPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/recovery" element={<RecoveryPage />} />
      <Route path="/login/register" element={<RegisterPage />} />
    </Routes>
  );
};
