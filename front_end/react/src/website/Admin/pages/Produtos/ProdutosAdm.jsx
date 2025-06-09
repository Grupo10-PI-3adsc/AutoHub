import React, { useState, useEffect, useCallback } from "react";
import ProductHeader from "../../../components/ProductHeader";
import SideBar from "../../components/SideBarAdm";
import { TableProducts } from "../../components/Table";
import AddProduto from "../../components/AdicionarProduto";
import UpdateProduto from "../../components/UpdateProduto"; 
import { FaPen, FaSearch } from "react-icons/fa";
import swal from "sweetalert2";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function ProdutosAdm() {
    const [produtos, setProdutos] = useState([]);
    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [mostrarUpdate, setMostrarUpdate] = useState(false);
    const [produtoParaEditar, setProdutoParaEditar] = useState(null);

    const fetchProdutos = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/produtos/listar-produtos`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            swal.fire('Erro', 'Não foi possível carregar os produtos.', 'error');
        }
    }, []);

    useEffect(() => {
        fetchProdutos();
    }, [fetchProdutos]);

    const handleAbrirUpdate = (produto) => {
        setProdutoParaEditar(produto);
        setMostrarUpdate(true);
    };

    const handleProdutoAtualizado = (produtoAtualizado) => {
        setMostrarUpdate(false);
        setProdutos(prevProdutos => 
            prevProdutos.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p)
        );
    };

    const handleAdicionarProduto = () => {
        setMostrarCadastro(prevState => !prevState);
    };

    const handleDeletarProduto = async (id) => {
        try {
            const result = await swal.fire({
                title: 'Você tem certeza?',
                text: "O produto será inativado!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, inativar!',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await axios.put(`${apiUrl}/api/inativar/${id}`);
                swal.fire('Inativado!', 'O produto foi inativado com sucesso.', 'success');
                fetchProdutos();
            }
        } catch (error) {
            swal.fire('Erro', 'Ocorreu um erro ao inativar o produto.', 'error');
        }
    };

    return (
        <>
            {mostrarCadastro && <AddProduto setMostrarCadastro={setMostrarCadastro} onProdutoAdicionado={fetchProdutos} />}
            {mostrarUpdate && (
                <UpdateProduto 
                    produto={produtoParaEditar} 
                    setMostrarUpdate={setMostrarUpdate}
                    onProdutoAtualizado={handleProdutoAtualizado}
                />
            )}

            <ProductHeader />
            <div className="clients">
                <SideBar />
                <div className="clients-container">
                    <div className="title-clients">
                        <h1>Produtos</h1>
                    </div>
                    <div className="add-clients">
                        <button className="button-add-client" onClick={handleAdicionarProduto}>Adicionar Produto</button>
                    </div>
                    <div className="table-container">
                        <TableProducts 
                            produtos={produtos}
                            onEdit={handleAbrirUpdate}
                            onDelete={handleDeletarProduto}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProdutosAdm;