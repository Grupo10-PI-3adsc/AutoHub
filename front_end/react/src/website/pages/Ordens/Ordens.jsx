import React, { useState, useCallback } from "react";
import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";
import { TableClients, TableEmployees, TableOrders, TableServices } from "../../components/Table";
import EmployeeRegister from "../../components/EmployeeRegister";
import { IoTrashBin } from "react-icons/io5";
import { FaPen, FaSearch } from "react-icons/fa";
import swal from "sweetalert2";
import axios from "axios";

const apiUrl = import.meta.env.VITE_CLOUD_API_URL;

function Ordens() {
    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    const handleAdicionarCliente = useCallback(() => {
        setMostrarCadastro((prevState) => !prevState);
    }, []);

    // Não deletamos o cliente, apenas inativamos!
    const handleDeletarCliente = useCallback(async (id) => {
        try {
            const response = await axios.put(`${apiUrl}/inativar/${id}`);

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
                        <h1>Ordens de Serviço</h1>
                    </div>

                    <div className="add-clients">
                        <button className="button-add-client" onClick={handleAdicionarCliente}>Criar Ordem de Serviço</button>
                        <div className="search">
                            <FaSearch className="icon-search" />
                            <input type="search" name="query" placeholder="Pesquise aqui..." />
                        </div>
                    </div>

                    <div className="table-container">
                        <TableServices />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ordens;