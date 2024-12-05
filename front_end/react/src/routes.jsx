import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./website/pages/Home/Home";
import Cadastrar from "./website/pages/Cadastro/Cadastro";
import Login from "./website/pages/Login/Login";
import RecuperarSenha from "./website/pages/RecuperarSenha/RecuperarSenha.jsx";
import Products from "./website/pages/Products/Products.jsx";
import Cliente from "./website/pages/Cliente/Cliente.jsx";
import Funcionarios from "./website/pages/Funcionarios/Funcionarios.jsx";
import Pedidos from "./website/pages/Pedidos/Pedidos.jsx";
import Ordens from "./website/pages/Ordens/Ordens.jsx";
import Carrinho from "./website/pages/CarrinhoDeCompras/CarrinhoDeCompras.jsx";
import Perfil from "./website/pages/Perfil/Perfil.jsx"



function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<Cadastrar />} />
                    <Route path="/produtos" element={<Products />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                    <Route path="/cliente" element={<Cliente />} />
                    <Route path="/funcionarios" element={<Funcionarios />} />
                    <Route path="/pedidos" element={<Pedidos />} />
                    <Route path="/ordens" element={<Ordens />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Rotas;
