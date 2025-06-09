import React, { useState, useCallback } from "react";
import ProductHeader from "../../../components/ProductHeader";
import SideBar from "../../components/SideBarAdm";
import { TableClients, TableEmployees } from "../../components/Table";
import EmployeeRegister from "../../components/RegisterFuncionario";
import { FaSearch } from "react-icons/fa";
import swal from "sweetalert2";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function Usuarios() {
  const estiloBotao = {
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: '#e5e7eb',
    color: '#111827', 
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '0 5px', 
    transition: 'all 0.2s ease-in-out', 
};

const estiloBotaoAtivo = {
    backgroundColor: '#ffcc00', 
    color: '#000', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transform: 'scale(1.05)', 
};
    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [visualizar, setVisualizar] = useState("clientes");

    const handleAdicionarCliente = useCallback(() => {
        setMostrarCadastro((prevState) => !prevState);
    }, []);

    const handleDeletarCliente = useCallback(async (id) => {
        try {
            const response = await axios.put(`${apiUrl}/api/inativar/${id}`);
            if (response.status === 204) {
                swal.fire('Sucesso', 'Cliente foi inativado com sucesso', 'success');
            } else {
                swal.fire('Erro', 'Erro ao executar o pedido', 'error');
            }
        } catch (error) {
            swal.fire('Erro', 'Erro ao conectar com a API \n errn Connect', 'error');
        }
    }, []);

    return (
        <>
            {mostrarCadastro && <EmployeeRegister setMostrarCadastro={setMostrarCadastro} />}
            <ProductHeader />
            <div className="clients">
                <SideBar />
                <div className="clients-container">
                    <div className="title-clients">
                        <h1>Usuários</h1>
                    </div>

                    <div className="add-clients">
                        <button className="button-add-client" onClick={handleAdicionarCliente}>
                            Adicionar Funcionários
                        </button>
                        <div className="search">
                            <FaSearch className="icon-search" />
                            <input type="search" name="query" placeholder="Pesquise aqui..." />
                        </div>
                    </div>

                    <div className="view-toggle" style={{ display: 'flex', margin: '1.5rem 0' }}>
    <button
        // Usamos o spread operator (...) para combinar os estilos.
        // O estilo 'ativo' sobrescreve o 'base' quando a condição é verdadeira.
        style={{
            ...estiloBotao,
            ...(visualizar === "clientes" ? estiloBotaoAtivo : {})
        }}
        onClick={() => setVisualizar("clientes")}
    >
        Clientes
    </button>
    <button
        style={{
            ...estiloBotao,
            ...(visualizar === "funcionarios" ? estiloBotaoAtivo : {})
        }}
        onClick={() => setVisualizar("funcionarios")}
    >
        Funcionários
    </button>
</div>

                    <div className="table-container">
                        {visualizar === "clientes" ? <TableClients /> : <TableEmployees />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Usuarios;
