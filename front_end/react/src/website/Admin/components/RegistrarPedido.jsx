import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;

function RegistrarPedido({ setMostrarFormulario }) {
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    
    const [clienteId, setClienteId] = useState('');
    const [instalacao, setInstalacao] = useState(false);
    const [observacoes, setObservacoes] = useState('');

    const [produtoSelecionadoId, setProdutoSelecionadoId] = useState('');
    const [quantidade, setQuantidade] = useState(1);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            try {
                const [resClientes, resProdutos] = await Promise.all([
                    axios.get(`${apiUrl}/api/usuarios`, { headers }),
                    axios.get(`${apiUrl}/api/produtos/listar-produtos`, { headers })
                ]);
                setClientes(Array.isArray(resClientes.data) ? resClientes.data : []);
                setProdutos(Array.isArray(resProdutos.data) ? resProdutos.data : []);
            } catch (error) {
                console.error("Erro ao buscar dados iniciais:", error);
                Swal.fire('Erro de Conexão!', 'Não foi possível carregar os dados.', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddItemAoCarrinho = () => {
        if (!produtoSelecionadoId || quantidade < 1) {
            Swal.fire('Atenção!', 'Selecione um produto e uma quantidade válida.', 'warning');
            return;
        }
        const produtoParaAdicionar = produtos.find(p => p.id === parseInt(produtoSelecionadoId));
        if (!produtoParaAdicionar) return;

        const itemExistente = carrinho.find(item => item.id === produtoParaAdicionar.id);

        if (itemExistente) {
            setCarrinho(carrinho.map(item => 
                item.id === produtoParaAdicionar.id 
                ? { ...item, quantidade: item.quantidade + quantidade } 
                : item
            ));
        } else {
            setCarrinho([...carrinho, { ...produtoParaAdicionar, quantidade }]);
        }
        setProdutoSelecionadoId('');
        setQuantidade(1);
    };

    const handleRemoverItem = (id) => {
        setCarrinho(carrinho.filter(item => item.id !== id));
    };

    const handleRegistrarPedido = async (event) => {
        event.preventDefault();
        if (!clienteId || carrinho.length === 0) {
            Swal.fire('Atenção!', 'Selecione um cliente e adicione pelo menos um produto ao pedido.', 'warning');
            return;
        }
        
        const carrinhoDeIds = carrinho.flatMap(item => Array(item.quantidade).fill(item.id));

        const pedidoRequisicao = {
            carrinho: carrinhoDeIds,
            intalacao: instalacao,
            observacoes: observacoes
        };

        try {
            await axios.post(`${apiUrl}/api/produtos/pedidos/${clienteId}`, pedidoRequisicao, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            Swal.fire('Sucesso!', 'Pedido registrado com sucesso!', 'success');
            setMostrarFormulario(false);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            console.error("Erro ao registrar pedido:", error);
            Swal.fire('Erro!', 'Não foi possível registrar o pedido.', 'error');
        }
    };

    const handleFecharModal = () => setMostrarFormulario(false);
    
    const overlayStyles = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
    const contentStyles = { backgroundColor: '#2c2f33', color: '#FFFFFF', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 5px 20px rgba(0,0,0,0.25)'};

    return (
        <div style={overlayStyles}>
            <div style={contentStyles}>
                <h1 style={{ textAlign: 'center', color: '#f7b731' }}>Registrar Novo Pedido</h1>
                {isLoading ? <p>Carregando...</p> : (
                    <form onSubmit={handleRegistrarPedido}>
                        <div className="modal-inputs">
                            <div className="modal-input-field">
                                <p>Cliente</p>
                                <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                                    <option value="" disabled>Selecione um cliente</option>
                                    {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                </select>
                            </div>

                            <div className="add-item-section">
                                <div className="modal-input-field" style={{flex: 3}}>
                                    <p>Adicionar Produto/Serviço</p>
                                    <select value={produtoSelecionadoId} onChange={(e) => setProdutoSelecionadoId(e.target.value)}>
                                        <option value="" disabled>Selecione um produto</option>
                                        {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} - R$ {p.preco.toFixed(2)}</option>)}
                                    </select>
                                </div>
                                <div className="modal-input-field" style={{flex: 1}}>
                                    <p>Qtd.</p>
                                    <input type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(parseInt(e.target.value, 10) || 1)} />
                                </div>
                                <button type="button" className="btn-add-item" onClick={handleAddItemAoCarrinho}>Adicionar</button>
                            </div>

                            <div className="cart-list" style={{ background: '#36393f', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
                                <h3 style={{marginTop: '0', borderBottom: '1px solid #444', paddingBottom: '10px'}}>Itens do Pedido</h3>
                                {carrinho.length === 0 ? <p style={{color: '#999'}}>Nenhum item adicionado.</p> : (
                                    carrinho.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <span>{item.nome} (x{item.quantidade})</span>
                                            <FaTrash onClick={() => handleRemoverItem(item.id)} style={{cursor: 'pointer', color: '#ff4d4d'}} />
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="modal-input-field">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                                    <input type="checkbox" checked={instalacao} onChange={(e) => setInstalacao(e.target.checked)} />
                                    <span>Requer Instalação?</span>
                                </label>
                            </div>
                            
                            <div className="modal-input-field">
                                <p>Observações (opcional)</p>
                                <textarea name="observacoes" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-buttons" style={{ justifyContent: 'center' }}>
                            <button type="button" className="btn-modal cancelar" onClick={handleFecharModal} style={{background: '#6c757d'}}>Cancelar</button>
                            <button type="submit" className="btn-modal cadastrar" style={{background: '#f7b731', color: '#2c2f33'}}>Registrar Pedido</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default RegistrarPedido;