import React, { useState, useCallback } from "react";
import ProductHeader from "../../../components/ProductHeader";
import SideBar from "../../components/SideBarAdm";
import { TableClients, TableEmployees, TableOrders, TableServices, TableProducts } from "../../components/Table";
import AdicionarAgendamento from "../../components/AdicionarAgendamento";
import { IoTrashBin } from "react-icons/io5";
import { FaPen, FaSearch } from "react-icons/fa";
import swal from "sweetalert2";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function AgendamentosAdm() {
    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    const handleAdicionarAgendamento = useCallback(() => {
        setMostrarCadastro((prevState) => !prevState);
    }, []);

    // Não deletamos o Agendamento, apenas inativamos!
    const handleDeletarAgendamento = useCallback(async (id) => {
        try {
            const response = await axios.put(`${apiUrl}/api/inativar/${id}`);

            if (response.status === 204) {
                swal.fire('Sucesso', 'Agendamento foi inativado com sucesso', 'success');
            } else {
                swal.fire('Erro', 'Erro ao executar o pedido', 'error');
            }
        } catch (error) {
            swal.fire('Erro', 'Erro ao conectar com a API \n errn Connect', 'error');
        }
    }, []);

    return (
        <>
            {mostrarCadastro && <AdicionarAgendamento setMostrarCadastro={setMostrarCadastro} />}
            <ProductHeader />
            <div className="clients">
                <SideBar />
                <div className="clients-container">
                    <div className="title-clients">
                        <h1>Agendamentos</h1>
                    </div>

                    <div className="add-clients">
                        <button className="button-add-client" onClick={handleAdicionarAgendamento}>Realizar novo agendamento</button>
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

export default AgendamentosAdm;