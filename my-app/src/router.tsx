import React from "react";
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/registro";
import { RouterLayout } from "./common/RouterLayout";
import { RecoveryPage } from "./pages/recuperacion";

export const AppRouter: React.FC<{}> = () =>{
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                <Route path="/" element={<HomePage/>} />
            </Route>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/login/recovery" element={<RecoveryPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
        </Routes>
    )
};