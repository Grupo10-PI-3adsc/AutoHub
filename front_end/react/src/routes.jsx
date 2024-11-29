import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./website/pages/Home/Home";
import Cadastrar from "./website/pages/Cadastro/Cadastro";
import Login from "./website/pages/Login/Login"; 
import RecuperarSenha from "./website/pages/RecuperarSenha/RecuperarSenha.jsx";
import Products from "./website/pages/Products/Products.jsx";
import Cliente from"./website/pages/Cliente/Cliente.jsx";
import Carrinho from "./website/pages/CarrinhoDeCompras/CarrinhoDeCompras.jsx";

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
                    <Route path="/cliente" element={<Cliente />} /> 
                    <Route path="/carrinho" element={<Carrinho />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Rotas;
