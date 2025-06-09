import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaChartLine, FaShoppingCart, FaDollarSign, FaFileInvoiceDollar, FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa';
import SideBarAdm from '../../components/SideBarAdm';
import ProductHeader from '../../../components/ProductHeader';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const mockDashboardData = {
    agendamentos: { concluidos: 124, pendentes: 32 },
    ticketMedio: 289.50,
};

function PainelDeKpis() {
    const [data, setData] = useState({ 
        ...mockDashboardData, 
        estoqueBaixo: [], 
        maisVendidos: [],
        lucroBruto: { receita: 0, custos: 0, lucro: 0 },
        receitaPorServico: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                const [resProdutos, resPedidos] = await Promise.all([
                    axios.get(`${apiUrl}/api/produtos/listar-produtos`, { headers }),
                    axios.get(`${apiUrl}/api/pedidos`, { headers })
                ]);
                
                // Card: Estoque Baixo
                let produtosComEstoqueBaixo = [];
                if (Array.isArray(resProdutos.data)) {
                    produtosComEstoqueBaixo = resProdutos.data.filter(p => p.qtdEstoque < 10);
                }

                let top5Vendidos = [];
                let resumoFinanceiro = { receita: 0, custos: 0, lucro: 0 };
                let receitaPorServicoCalculada = [];

                if (Array.isArray(resPedidos.data)) {
                    // Card: Top 5 Mais Vendidos
                    const contagemDeVendas = {};
                    resPedidos.data.forEach(pedido => {
                        if (pedido.produtos && Array.isArray(pedido.produtos)) {
                            pedido.produtos.forEach(produto => {
                                contagemDeVendas[produto.id] = {
                                    id: produto.id, nome: produto.nome,
                                    vendas: (contagemDeVendas[produto.id]?.vendas || 0) + 1
                                };
                            });
                        }
                    });
                    top5Vendidos = Object.values(contagemDeVendas)
                        .sort((a, b) => b.vendas - a.vendas).slice(0, 5);

                    // Card: Resumo Financeiro
                    const receitaTotal = resPedidos.data.reduce((acc, pedido) => acc + (pedido.total || 0), 0);
                    resumoFinanceiro = {
                        receita: receitaTotal,
                        custos: receitaTotal * 0.40,
                        lucro: receitaTotal * 0.60
                    };

                    // Card: Receita por Serviço (Simulação)
                    const receitaPorCategoria = {};
                    resPedidos.data.forEach(pedido => {
                        if (pedido.produtos && pedido.produtos.length > 0) {
                            const categoriaPrincipal = pedido.produtos[0].categoria || "Outros";
                            receitaPorCategoria[categoriaPrincipal] = (receitaPorCategoria[categoriaPrincipal] || 0) + pedido.total;
                        }
                    });
                    receitaPorServicoCalculada = Object.entries(receitaPorCategoria).map(([servico, receita]) => ({
                        servico,
                        receita
                    }));
                }

                setData(prevData => ({
                    ...prevData,
                    estoqueBaixo: produtosComEstoqueBaixo,
                    maisVendidos: top5Vendidos.length > 0 ? top5Vendidos : [],
                    lucroBruto: resumoFinanceiro,
                    receitaPorServico: receitaPorServicoCalculada.length > 0 ? receitaPorServicoCalculada : [],
                }));

            } catch (error) {
                console.error("Erro ao buscar dados para o dashboard:", error);
                setData({ ...mockDashboardData, estoqueBaixo: [], maisVendidos: [], lucroBruto: { receita: 0, custos: 0, lucro: 0 }, receitaPorServico: [] });
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const cardStyle = { backgroundColor: '#FFFFFF', padding: '12px 15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0', color: '#2D3748', display: 'flex', flexDirection: 'column' };
    const cardTitleStyle = { margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: '600', color: '#4A5568', display: 'flex', alignItems: 'center', gap: '8px' };

    if (loading) {
        return <p>Carregando dados do dashboard...</p>;
    }

    return (
        <>
            <ProductHeader />
            <div className="products">
                <SideBarAdm />
                <div className="products-container" style={{backgroundColor: '#f1f1f1'}}>
                    <h1 style={{ color: '#1A202C', marginBottom: '20px' }}>Dashboard Geral</h1>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '15px' }}>

                        <div style={cardStyle}>
                            <h2 style={cardTitleStyle}><FaClock /> Status de Agendamentos (Mês)</h2>
                            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginTop: 'auto' }}>
                                <div>
                                    <FaCheckCircle style={{ color: '#28a745', fontSize: '1.6em' }} />
                                    <p style={{ margin: '5px 0 0 0', fontSize: '1.3em', fontWeight: 'bold' }}>{data.agendamentos.concluidos}</p>
                                    <p style={{ margin: '4px 0 0 0', color: '#718096', fontSize: '0.85em' }}>Concluídos</p>
                                </div>
                                <div>
                                    <FaClock style={{ color: '#ffc107', fontSize: '1.6em' }} />
                                    <p style={{ margin: '5px 0 0 0', fontSize: '1.3em', fontWeight: 'bold' }}>{data.agendamentos.pendentes}</p>
                                    <p style={{ margin: '4px 0 0 0', color: '#718096', fontSize: '0.85em' }}>Pendentes</p>
                                </div>
                            </div>
                        </div>

                        <div style={cardStyle}>
                            <h2 style={cardTitleStyle}><FaFileInvoiceDollar /> Resumo Financeiro (Mês)</h2>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.9em' }}>
                                <span style={{color: '#718096'}}><FaRegArrowAltCircleUp style={{color: '#28a745'}}/> Receita Total</span>
                                <strong style={{fontSize: '1em'}}>{formatCurrency(data.lucroBruto.receita)}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '0.9em' }}>
                                <span style={{color: '#718096'}}><FaRegArrowAltCircleDown style={{color: '#dc3545'}}/> Custo (40%)</span>
                                <strong style={{fontSize: '1em'}}>{formatCurrency(data.lucroBruto.custos)}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #E2E8F0', paddingTop: '12px', marginTop: 'auto' }}>
                                <span style={{fontWeight: 'bold', fontSize: '1.1em'}}>Lucro Bruto</span>
                                <strong style={{fontSize: '1.3em', color: '#28a745'}}>{formatCurrency(data.lucroBruto.lucro)}</strong>
                            </div>
                        </div>

                        <div style={cardStyle}>
                            <h2 style={cardTitleStyle}><FaExclamationTriangle style={{color: '#dc3545'}} /> Produtos com Estoque Baixo</h2>
                            {data.estoqueBaixo.length > 0 ? (
                                <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '0.85em' }}>
                                    {data.estoqueBaixo.map(item => (
                                        <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span>{item.nome}</span>
                                            <strong style={{color: '#dc3545', whiteSpace: 'nowrap', marginLeft: '10px'}}>{item.qtdEstoque} un.</strong>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{color: '#718096', fontSize: '0.9em', margin: 'auto 0'}}>Nenhum item com estoque baixo.</p>
                            )}
                        </div>

                        <div style={cardStyle}>
                            <h2 style={cardTitleStyle}><FaShoppingCart /> Top 5 Mais Vendidos (Mês)</h2>
                            {data.maisVendidos.length > 0 ? (
                                <ol style={{ margin: 0, padding: '0 0 0 20px', fontSize: '0.85em' }}>
                                    {data.maisVendidos.map(item => (
                                         <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span>{item.nome}</span>
                                            <strong style={{whiteSpace: 'nowrap', marginLeft: '10px'}}>{item.vendas} vendas</strong>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p style={{color: '#718096', fontSize: '0.9em', margin: 'auto 0'}}>Não há dados de vendas.</p>
                            )}
                        </div>

                        <div style={{ ...cardStyle, gridColumn: 'span 1' }}>
                            <h2 style={cardTitleStyle}><FaChartLine /> Receita por Categoria</h2>
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9em' }}>
                                {data.receitaPorServico.length > 0 ? data.receitaPorServico.map(item => (
                                     <div key={item.servico} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EDF2F7', paddingBottom: '8px' }}>
                                        <span>{item.servico}</span>
                                        <strong>{formatCurrency(item.receita)}</strong>
                                    </div>
                                )) : <p style={{color: '#718096'}}>Calculando...</p>}
                            </div>
                        </div>

                        <div style={{...cardStyle, textAlign: 'center'}}>
                             <h2 style={{...cardTitleStyle, justifyContent: 'center'}}><FaDollarSign /> Ticket Médio (Mês)</h2>
                             <p style={{ margin: '5px 0 0 0', fontSize: '2em', fontWeight: 'bold', color: '#2D3748' }}>{formatCurrency(data.ticketMedio)}</p>
                             <p style={{ margin: '4px 0 0 0', color: '#718096', fontSize: '0.85em' }}>Valor médio por pedido</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PainelDeKpis;