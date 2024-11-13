import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";
import Table from "../../components/Table"
import { IoTrashBin } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Cliente() {
    return (
        <>
            <ProductHeader />
            <div className="clients">
                <SideBar />
                <div className="clients-container">
                    <div className="title-clients">
                        <h1>Clientes</h1>
                    </div>

                    <div className="add-clients">
                        <button className="button-add-client">Adicionar Cliente</button>
                        <div className="search">
                            <FaSearch className="icon-search" />
                            <input type="search" name="query" placeholder="Pesquise aqui..." />
                        </div>
                    </div>

                    <div className="table-container">
                      <Table />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Cliente;