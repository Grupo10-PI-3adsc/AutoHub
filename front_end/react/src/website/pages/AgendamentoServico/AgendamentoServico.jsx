import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom"; 
import Header from "../../components/Header"
import styles from "../AgendamentoServico/AgendamentoServico.module.css";


const AgendadorServico = () => {
  const [dia, definirDia] = useState('11');
  const [mes, definirMes] = useState('06');
  const [ano, definirAno] = useState('2024');

  return (
    <>
    <Header />
    
    <div className={styles.ContainerPagina}>
      <SideBar /> 
      <div className={styles.AgendadorWrapper}>
        <div className={styles.ColunaFormulario}>
          {/* <p className={styles.CaminhoNavegacao}>Principal Serviço</p> */}
          <h1 className={styles.Titulo}>Agendar Serviço</h1>
          
          <div className={styles.SecaoFormulario}>
            <label htmlFor="seletor-servico" className={styles.Rotulo}>Serviço</label>
            <select id="seletor-servico" className={styles.Seletor}>
              <option>Higienização de veículo</option>
            </select>

            <label className={styles.Rotulo}>Data do agendamento</label>
            <div className={styles.SeletorDataWrapper}>
              <select value={dia} onChange={(e) => definirDia(e.target.value)} className={styles.SeletorDeData}>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>
                ))}
              </select>
              <select value={mes} onChange={(e) => definirMes(e.target.value)} className={styles.SeletorDeData}>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>
                ))}
              </select>
              <select value={ano} onChange={(e) => definirAno(e.target.value)} className={styles.SeletorDeData}>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
              <select className={styles.SeletorDeData}>
                {[...Array(24)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, '0') + ":00"}>
                    {String(i).padStart(2, '0')}:00
                  </option>
                ))}
              </select>
            </div>

            <p className={styles.RotuloTotal}>Total:</p>
            <p className={styles.PrecoTotal}>R$120,00</p>
            <button className={styles.BotaoPagamento}>Efetuar pagamento</button>
          </div>
        </div>

      
        <div className={styles.SecaoInfoServico}>
          <h2 className={styles.TituloServico}>Higienização de veículo</h2>
          <p className={styles.DescricaoServico}>
            A higienização de veículos é um serviço completo que garante limpeza e conservação tanto no interior quanto no exterior do automóvel, promovendo saúde, conforto e estética. O processo inclui lavagem detalhada da lataria, tratamento de vidros, rodas e pneus, além de uma limpeza profunda do interior, como painéis, bancos e carpetes. Também envolve descontaminação para eliminar ácaros, bactérias e odores, deixando o ambiente mais saudável. Há ainda cuidados adicionais, como hidratação de couro e polimento da pintura, que ajudam a preservar o veículo e valorizar sua aparência.
          </p>
          <p className={styles.ChamadaParaAcaoServico}>
            Deixe seu carro como novo! Garanta conforto, saúde e valorização com nossa higienização completa de veículos. Agende agora e sinta a diferença!
          </p>
        </div>
      </div>
    </div>
    </>     
  );
};

export default AgendadorServico;