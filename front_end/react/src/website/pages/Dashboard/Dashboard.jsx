import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Services() {

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Vendas Mensais',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const data2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Crescimento das Vendas',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <>
        <ProductHeader />
        <div className="products">
            <SideBar />
            <div className="products-container">
                
            <div>

                <h2>Gráfico de Vendas Mensais</h2>
                <Bar data={data} options={options} />
                </div>
            </div>

                <div>
                <h2>Gráfico de Crescimento das Vendas</h2>
                <Bar data={data2} options={options2} />
                </div>

            


            
        </div>
    </>
)
}

export default Services;
