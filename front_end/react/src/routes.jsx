import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./website/pages/Home/Home";
import Cadastrar from "./website/pages/Cadastro/Cadastro";
import Login from "./website/pages/Login/Login"; 
import RecuperarSenha from "./website/pages/RecuperarSenha/RecuperarSenha.jsx";
import Products from "./website/pages/Products/Products.jsx";
import Dashboard from "./website/pages/Dashboard/Dashboard.jsx";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<Cadastrar />} />
                    <Route path="/produtos" element={<Products />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Rotas;
