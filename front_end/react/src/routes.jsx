import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./website/context/NavigationContext.jsx";

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
import Perfil from "./website/pages/Perfil/Perfil.jsx";
import Dashboard from "./website/Admin/pages/Dashboard/Dashboard.jsx";
import CheckoutPage from "./website/pages/Checkout/CheckoutPage.jsx";
import AgendamentoServico from "./website/pages/AgendamentoServico/AgendamentoServico.jsx";

// Importando as páginas do Admin
import Usuarios from "./website/Admin/Pages/UsuariosFuncionarios/Usuarios.jsx";
import ProdutosAdm from "./website/Admin/Pages/Produtos/ProdutosAdm.jsx";
import PedidosAdm from "./website/Admin/pages/Pedidos/PedidosAdm.jsx";
import AgendamentosAdm from "./website/Admin/Pages/Agendamentos/AgendamentosAdm.jsx";

function Rotas() {
  return (
    <BrowserRouter>
      <NavigationProvider>
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
          <Route path="/finalizar-compra" element={<CheckoutPage />} /> 
          <Route path="/agendamento-servico" element={<AgendamentoServico />} />

          {/* Rotas do Admin */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/produtosAdm" element={<ProdutosAdm />} />
          <Route path="/pedidosAdm" element={<PedidosAdm />} />
          <Route path="/agendamento-servicoAdm" element={<AgendamentosAdm />} />

          {/* Rotas de fallback */}
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default Rotas;