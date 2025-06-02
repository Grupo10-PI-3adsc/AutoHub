import React from 'react';
import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement } from 'chart.js';
import Styles from "./Dashboard.module.css";
import axios from "axios";
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement);

function Services() {

  const apiUrl = import.meta.env.VITE_CLOUD_API_URL;

    // Cálculos dos KPIs
    const [vendasMesAtual, setVendasMesAtual] = useState(0);
    const [numeroItensEstoque, setNumeroItensEstoque] = useState(0);
    const [numeroAtendimentos, setNumeroAtendimentos] = useState(0);
  
    const vendasMesAnterior = 4;
    const custoArmazenagem = 850;
    const tempoAtendimentoTotal = 287;
    

  const fetchDados = async () => {
    try {
      const response = await axios.get(`${apiUrl}/produtos/pedidos/dash`);
      if (response.status === 200) {
        const data = response.data;

        setVendasMesAtual(data.qtdCaixaUltimoMes);
        setNumeroItensEstoque(data.qtdItensEstoque);
        setNumeroAtendimentos(data.qtdVendasUltimoMes);

      } else {
        console.error("Erro ao carregar os dados da API");
      }
    } catch (error) {
      console.error("Erro na requisição API", error);
    }
  };

  fetchDados()

  const loopFetchDados = () => {
    fetchDados();
    setTimeout(loopFetchDados, 120000); // 120000 ms = 2 minutos
  };


  // Dados para os gráficos
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Vendas Mensais',
        data: [12, 19, 3, 5, 2, 3], // Exemplo de dados
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
  };

  const data2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Crescimento das Vendas',
        data: [12, 19, 3, 5, 2, 3], // Exemplo de dados
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options2 = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
  };





  // KPI de Crescimento de Vendas
  const crescimentoVendas = ((numeroAtendimentos - vendasMesAnterior) / vendasMesAnterior) * 100;

  // KPI de Custo de Armazenagem
  const custoArmazenagemPorItem = custoArmazenagem / numeroItensEstoque;

  // KPI de Tempo Médio de Atendimento
  const tempoMedioAtendimento = tempoAtendimentoTotal / numeroAtendimentos;

  return (
    <>
      <ProductHeader />
      <div className="products">
        <SideBar />
        <div className="products-container">
          
          <h1>Dashboard</h1>

            <div className="Quebra-maiores" >

            <div className="kpi-card2 kpi-card-large">
            <h3>Crescimento de Vendas (%)</h3>
              <p>{crescimentoVendas.toFixed(2)}%</p>
            </div>
            <div className="kpi-card2 kpi-card-large">
              <h3>Total de Caixa do Mês</h3>
              <p>R$:{vendasMesAtual} </p>
            </div>

            </div>

            <div className="kpis-container">
            <div className="kpi-card">
              <h3>Total de Vendas no Mês</h3>
              <p>{numeroAtendimentos}</p>
            </div>
            <div className="kpi-card">
              <h3>Custo de Armazenagem</h3>
              <p>{custoArmazenagemPorItem.toFixed(2)} R$ por item</p>
            </div>
            <div className="kpi-card">
              <h3>Tempo Médio de Atendimento</h3>
              <p>{tempoMedioAtendimento.toFixed(2)} minutos</p>
            </div>
          </div>

<div className="ParteGraficos">

          {/* Gráficos */}
          <div className="chart-row">
            <div className="chart-container">
              <h2>Gráfico de Vendas Mensais</h2>
              <Bar data={data} options={options} />
            </div>



            <div className="chart-container">
              <h2>Gráfico de Crescimento das Vendas</h2>
              <Bar data={data2} options={options2} />
            </div>

            </div>

            </div>
          </div>
        </div>
    </>
  );
}

export default Services;
