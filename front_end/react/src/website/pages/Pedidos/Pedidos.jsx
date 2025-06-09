import React, { useState, useCallback } from "react";
import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";
import { TableClients, TableEmployees, TableOrders, TableServices } from "../../components/Table";
import EmployeeRegister from "../../components/EmployeeRegister";
import { IoTrashBin } from "react-icons/io5";
import { FaPen, FaSearch } from "react-icons/fa";
import swal from "sweetalert2";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function Pedidos() {
    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    const handleAdicionarCliente = useCallback(() => {
        setMostrarCadastro((prevState) => !prevState);
    }, []);

    return (
        <>
            {mostrarCadastro && <EmployeeRegister setMostrarCadastro={setMostrarCadastro} />}
            <ProductHeader />
            <div className="clients">
                <SideBar />
                <div className="clients-container">
                    <div className="title-clients">
                        <h1>Pedidos</h1>
                    </div>

                    <div className="add-clients">
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

export default Pedidos;