import React, { useState, useCallback } from "react";
import ProductHeader from "../../../components/ProductHeader";
import SideBar from "../../components/SideBarAdm";
import { TableClients, TableEmployees, TableOrders, TableServices } from "../../components/Table";
import RegistrarPedido from "../../components/RegistrarPedido";
import { IoTrashBin } from "react-icons/io5";
import { FaPen, FaSearch } from "react-icons/fa";
import swal from "sweetalert2";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function PedidosAdm() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const handleAdicionarPedido = useCallback(() => {
        setMostrarFormulario(true); 
    }, []);

    const handleDeletarPedido = useCallback(async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/pedidos/${id}`);

            if (response.status === 200) {
                swal.fire('Sucesso!', 'Pedido foi removido com sucesso.', 'success');
            } else {
                swal.fire('Erro', 'Não foi possível remover o pedido.', 'error');
            }
        } catch (error) {
            swal.fire('Erro!', 'Erro ao conectar com a API.', 'error');
        }
    }, []);

    return (
        <>

            {mostrarFormulario && <RegistrarPedido setMostrarFormulario={setMostrarFormulario} />}
            
            <ProductHeader />
            <div className="clients">
                <SideBar />
                <div className="clients-container">
                    <div className="title-clients">
                        <h1>Pedidos</h1>
                    </div>

                    <div className="add-clients">
                        <button className="button-add-client" onClick={handleAdicionarPedido}>Adicionar Pedido</button>
                        <div className="search">
                            <FaSearch className="icon-search" />
                            <input type="search" name="query" placeholder="Pesquise aqui..." />
                        </div>
                    </div>

                    <div className="table-container">
                        <TableOrders />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PedidosAdm;