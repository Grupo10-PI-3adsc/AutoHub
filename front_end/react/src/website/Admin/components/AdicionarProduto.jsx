import React, { useState, useCallback } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;

function AdicionarProduto({ setMostrarCadastro, onProdutoAdicionado }) {

    const [productData, setProductData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        qtdEstoque: '',
        imagemUrl: '',
        categoria: '', 
        fornecedor: '',
        localizacao: '',
        codBarra: ''
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState("Selecione uma categoria");

    const overlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const contentStyles = {
        backgroundColor: '#2c2f33',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
    };

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategoriaClick = (categoria) => {
        setSelectedCategoria(categoria);
        setIsDropdownOpen(false);
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();

        if (selectedCategoria === "Selecione uma categoria") {
            Swal.fire('Atenção!', 'Por favor, selecione uma categoria para o produto.', 'warning');
            return;
        }

        const finalProductData = {
            ...productData,
            categoria: selectedCategoria,
            preco: parseFloat(productData.preco),
            qtdEstoque: parseInt(productData.qtdEstoque, 10),
        };

        try {
            const response = await axios.post(`${apiUrl}/api/produtos`, finalProductData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            Swal.fire('Sucesso!', 'Produto cadastrado com sucesso.', 'success');
            if (onProdutoAdicionado) {
                onProdutoAdicionado();
            }
            setMostrarCadastro(false); 

        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            Swal.fire('Erro!', 'Não foi possível cadastrar o produto.', 'error');
        }
    };
    
    const handleFecharModal = useCallback(() => {
        setMostrarCadastro(false);
    }, [setMostrarCadastro]);

    return (
        <div style={overlayStyles}>
            <div style={contentStyles} className="modal-cadastrar-clientes">
                <h1>Cadastro de Produto</h1>
                <form onSubmit={handleAddProduct}>
                    <div className="modal-inputs">
                        <div className="modal-input-field">
                            <p>Nome do Produto</p>
                            <input type="text" name="nome" value={productData.nome} onChange={handleInputChange} required />
                        </div>
                        <div className="modal-input-field">
                            <p>Descrição</p>
                            <textarea name="descricao" value={productData.descricao} onChange={handleInputChange} required />
                        </div>
                        <div className="modal-input-field">
                            <p>Preço (R$)</p>
                            <input type="number" step="0.01" name="preco" value={productData.preco} onChange={handleInputChange} required />
                        </div>
                        <div className="modal-input-field">
                            <p>Quantidade em Estoque</p>
                            <input type="number" name="qtdEstoque" value={productData.qtdEstoque} onChange={handleInputChange} required />
                        </div>
                        <div className="modal-input-field">
                            <p>Fornecedor</p>
                            <input type="text" name="fornecedor" value={productData.fornecedor} onChange={handleInputChange} />
                        </div>
                        <div className="modal-input-field">
                            <p>Localização</p>
                            <input type="text" name="localizacao" value={productData.localizacao} onChange={handleInputChange} />
                        </div>
                         <div className="modal-input-field">
                            <p>Código de Barras</p>
                            <input type="text" name="codBarra" value={productData.codBarra} onChange={handleInputChange} />
                        </div>
                        <div className="modal-input-field">
                            <p>URL da Imagem</p>
                            <input type="text" name="imagemUrl" value={productData.imagemUrl} onChange={handleInputChange} />
                        </div>
                        <div className="modal-input-field">
                            <p>Categoria</p>
                            <div className="dropdown">
                                <div className="dropdown-header" onClick={toggleDropdown}>
                                    {selectedCategoria}
                                    <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
                                </div>
                                {isDropdownOpen && (
                                    <ul className="dropdown-menu">
                                        <li onClick={() => handleCategoriaClick("Selecione uma categoria")}>Selecione uma categoria</li>
                                        <li onClick={() => handleCategoriaClick("Lubrificantes")}>Lubrificantes</li>
                                        <li onClick={() => handleCategoriaClick("Filtros")}>Filtros</li>
                                        <li onClick={() => handleCategoriaClick("Freios")}>Freios</li>
                                        <li onClick={() => handleCategoriaClick("Pneus")}>Pneus</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button type="button" className="btn-modal cancelar" onClick={handleFecharModal}>Cancelar</button>
                        <button type="submit" className="btn-modal cadastrar">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdicionarProduto;