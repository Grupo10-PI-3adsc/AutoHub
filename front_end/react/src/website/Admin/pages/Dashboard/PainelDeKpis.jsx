import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaChartLine, FaShoppingCart, FaDollarSign, FaFileInvoiceDollar, FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa';

// --- DADOS FALSOS (MOCK) PARA A APRESENTAÇÃO ---
const mockDashboardData = {
    agendamentos: {
        concluidos: 124,
        pendentes: 32,
    },
    estoqueBaixo: [
        { id: 1, nome: 'Filtro de Ar Condicionado K&N', qtd: 8 },
        { id: 2, nome: 'Pastilha de Freio Traseira Cobreq', qtd: 5 },
        { id: 3, nome: 'Lâmpada Farol H4 Philips', qtd: 9 },
    ],
    maisVendidos: [
        { id: 1, nome: 'Óleo 5W30 Sintético Mobil', vendas: 215 },
        { id: 2, nome: 'Alinhamento e Balanceamento', vendas: 189 },
        { id: 3, nome: 'Higienização de Ar Condicionado', vendas: 154 },
        { id: 4, nome: 'Filtro de Óleo Mann-Filter', vendas: 132 },
        { id: 5, nome: 'Pneu Aro 16 Pirelli', vendas: 112 },
    ],
    receitaPorServico: [
        { servico: 'Troca de Óleo', receita: 18540.50 },
        { servico: 'Alinhamento e Balanceamento', receita: 15120.00 },
        { servico: 'Sistema de Freios', receita: 11200.00 },
        { servico: 'Venda de Peças', receita: 29550.00 },
    ],
    ticketMedio: 289.50,
    lucroBruto: {
        receita: 75320.00,
        custos: 41200.00,
        lucro: 34120.00,
    },
};

// --- COMPONENTE PRINCIPAL DO DASHBOARD ---
function PainelDeKpis() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Simula o carregamento dos dados
        setData(mockDashboardData);
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Estilos reutilizáveis
    const cardStyle = {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #E2E8F0',
        color: '#2D3748'
    };
    
    const cardTitleStyle = {
        margin: '0 0 15px 0',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#4A5568',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    if (!data) {
        return <p>Carregando dados do dashboard...</p>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#F7FAFC' }}>
            <h1 style={{ color: '#1A202C', marginBottom: '20px' }}>Dashboard Geral</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>

                {/* Card 1: Status de Agendamentos */}
                <div style={cardStyle}>
                    <h2 style={cardTitleStyle}><FaClock /> Status de Agendamentos (Mês)</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                        <div>
                            <FaCheckCircle style={{ color: '#28a745', fontSize: '2em' }} />
                            <p style={{ margin: '10px 0 0 0', fontSize: '1.5em', fontWeight: 'bold' }}>{data.agendamentos.concluidos}</p>
                            <p style={{ margin: '5px 0 0 0', color: '#718096' }}>Concluídos</p>
                        </div>
                        <div>
                            <FaClock style={{ color: '#ffc107', fontSize: '2em' }} />
                            <p style={{ margin: '10px 0 0 0', fontSize: '1.5em', fontWeight: 'bold' }}>{data.agendamentos.pendentes}</p>
                            <p style={{ margin: '5px 0 0 0', color: '#718096' }}>Pendentes</p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Lucro Bruto */}
                <div style={cardStyle}>
                    <h2 style={cardTitleStyle}><FaFileInvoiceDollar /> Resumo Financeiro (Mês)</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{color: '#718096'}}><FaRegArrowAltCircleUp style={{color: '#28a745'}}/> Receita Total</span>
                        <strong style={{fontSize: '1.1em'}}>{formatCurrency(data.lucroBruto.receita)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span style={{color: '#718096'}}><FaRegArrowAltCircleDown style={{color: '#dc3545'}}/> Custo dos Produtos</span>
                        <strong style={{fontSize: '1.1em'}}>{formatCurrency(data.lucroBruto.custos)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #E2E8F0', paddingTop: '15px' }}>
                        <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>Lucro Bruto</span>
                        <strong style={{fontSize: '1.5em', color: '#28a745'}}>{formatCurrency(data.lucroBruto.lucro)}</strong>
                    </div>
                </div>

                {/* Card 3: Produtos com Estoque Baixo */}
                <div style={{ ...cardStyle, gridColumn: 'span 1' }}>
                    <h2 style={cardTitleStyle}><FaExclamationTriangle style={{color: '#dc3545'}} /> Produtos com Estoque Baixo</h2>
                    <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
                        {data.estoqueBaixo.map(item => (
                            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>{item.nome}</span>
                                <strong style={{color: '#dc3545'}}>{item.qtd} un.</strong>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Card 4: Produtos Mais Vendidos */}
                <div style={{ ...cardStyle, gridColumn: 'span 1' }}>
                    <h2 style={cardTitleStyle}><FaShoppingCart /> Top 5 Mais Vendidos (Mês)</h2>
                    <ol style={{ margin: 0, padding: '0 0 0 20px' }}>
                        {data.maisVendidos.map(item => (
                             <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>{item.nome}</span>
                                <strong>{item.vendas} vendas</strong>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Card 5: Receita por Serviço */}
                <div style={{ ...cardStyle, gridColumn: 'span 1 / span 2' }}>
                    <h2 style={cardTitleStyle}><FaChartLine /> Receita por Tipo de Serviço</h2>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {data.receitaPorServico.map(item => (
                             <div key={item.servico} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EDF2F7', paddingBottom: '8px' }}>
                                <span>{item.servico}</span>
                                <strong>{formatCurrency(item.receita)}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Card 6: Ticket Médio */}
                <div style={{...cardStyle, textAlign: 'center'}}>
                     <h2 style={{...cardTitleStyle, justifyContent: 'center'}}><FaDollarSign /> Ticket Médio (Mês)</h2>
                     <p style={{ margin: '10px 0 0 0', fontSize: '2.5em', fontWeight: 'bold', color: '#2D3748' }}>{formatCurrency(data.ticketMedio)}</p>
                     <p style={{ margin: '5px 0 0 0', color: '#718096' }}>Valor médio por pedido</p>
                </div>

            </div>
        </div>
    );
}

export default PainelDeKpis;