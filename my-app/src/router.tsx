import React from "react";
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/sesion/login";
import { RecoveryPage } from "./pages/sesion/recuperacion";
import { RegisterPage } from "./pages/sesion/registro";
import { ProfileAdmin } from "./pages/profileAdmin";
import { RouterLayout } from "./common/RouterLayout";

export const AppRouter: React.FC<{}> = () =>{
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>}>
                <Route path="/" element={<HomePage/>} />
                <Route path="/profileAdmin" element={<ProfileAdmin/>} />
            </Route>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/login/recovery" element={<RecoveryPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            
        </Routes>
    )
};