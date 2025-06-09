import React, { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;

const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 1rem',
};

const fullWidthStyle = {
    gridColumn: 'span 2',
};

// O NOME DO COMPONENTE PRECISA SER O MESMO DO NOME DO ARQUIVO POR CONVENÇÃO
function AdicionarAgendamento({ setMostrarCadastro }) { // <-- CORREÇÃO 1: A PROPRIEDADE ESPERADA AGORA É setMostrarCadastro
    const today = new Date().toISOString().split('T')[0];

    const [agendamentoData, setAgendamentoData] = useState({
        nomeCliente: '', telefoneCliente: '', marcaVeiculo: '',
        modeloVeiculo: '', anoVeiculo: '', placaVeiculo: '',
        dataAgendamento: '', horaAgendamento: '', observacoes: '',
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedServico, setSelectedServico] = useState("Selecione o serviço");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAgendamentoData((prevData) => ({ ...prevData, [name]: value }));
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleServicoClick = (servico) => {
        setSelectedServico(servico);
        setIsDropdownOpen(false);
    };
    
    const handleFecharModal = () => {
        // <-- CORREÇÃO 2: A VARIÁVEL USADA AGORA É setMostrarCadastro
        if (typeof setMostrarCadastro === 'function') {
            setMostrarCadastro(false);
        } else {
            console.error("A função para fechar o modal não foi fornecida!");
        }
    };
    
    const handleAgendarServico = async (event) => {
        event.preventDefault();
        if (selectedServico === "Selecione o serviço") {
            Swal.fire('Atenção!', 'Por favor, selecione um tipo de serviço.', 'warning');
            return;
        }
        const finalAgendamentoData = { ...agendamentoData, tipoServico: selectedServico };
        try {
            await axios.post(`${apiUrl}/agendamentos`, finalAgendamentoData);
            Swal.fire('Sucesso!', 'Serviço agendado com sucesso!', 'success');
            handleFecharModal(); // Chama a função de fechar após o sucesso
        } catch (error) {
            Swal.fire('Erro!', 'Não foi possível completar o agendamento.', 'error');
        }
    };

    return (
        <>
            <div className="modal">
                <div className="modal-cadastrar-clientes" style={{ maxWidth: '700px' }}>
                    <h1>Agendamento de Serviço</h1>
                    <form onSubmit={handleAgendarServico}>
                        <div className="modal-inputs" style={gridContainerStyle}>
                            <p className="form-section-title" style={fullWidthStyle}>Dados do Cliente</p>
                            <div className="modal-input-field">
                                <p>Nome do Cliente</p>
                                <input type="text" name="nomeCliente" value={agendamentoData.nomeCliente} onChange={handleInputChange} required />
                            </div>
                            <div className="modal-input-field">
                                <p>Telefone para Contato</p>
                                <input type="tel" name="telefoneCliente" placeholder="(XX) XXXXX-XXXX" value={agendamentoData.telefoneCliente} onChange={handleInputChange} required />
                            </div>
                            <p className="form-section-title" style={fullWidthStyle}>Dados do Veículo</p>
                            <div className="modal-input-field">
                                <p>Marca</p>
                                <input type="text" name="marcaVeiculo" value={agendamentoData.marcaVeiculo} onChange={handleInputChange} required/>
                            </div>
                            <div className="modal-input-field">
                                <p>Modelo</p>
                                <input type="text" name="modeloVeiculo" value={agendamentoData.modeloVeiculo} onChange={handleInputChange} required/>
                            </div>
                            <div className="modal-input-field">
                                <p>Ano</p>
                                <input type="number" name="anoVeiculo" placeholder="2020" value={agendamentoData.anoVeiculo} onChange={handleInputChange} required/>
                            </div>
                            <div className="modal-input-field">
                                <p>Placa</p>
                                <input type="text" name="placaVeiculo" placeholder="ABC-1234" value={agendamentoData.placaVeiculo} onChange={handleInputChange} required/>
                            </div>
                            <p className="form-section-title" style={fullWidthStyle}>Detalhes do Agendamento</p>
                            <div className="modal-input-field" style={fullWidthStyle}>
                                <p>Tipo de Serviço</p>
                                <div className="dropdown">
                                    <div className="dropdown-header" onClick={toggleDropdown}>{selectedServico}<span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span></div>
                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu">
                                            <li onClick={() => handleServicoClick("Troca de Óleo e Filtro")}>Troca de Óleo e Filtro</li>
                                            <li onClick={() => handleServicoClick("Alinhamento e Balanceamento")}>Alinhamento e Balanceamento</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="modal-input-field">
                                <p>Data do Agendamento</p>
                                <input type="date" name="dataAgendamento" value={agendamentoData.dataAgendamento} onChange={handleInputChange} min={today} required />
                            </div>
                            <div className="modal-input-field">
                                <p>Hora do Agendamento</p>
                                <input type="time" name="horaAgendamento" value={agendamentoData.horaAgendamento} onChange={handleInputChange} required />
                            </div>
                            <div className="modal-input-field" style={fullWidthStyle}>
                                <p>Observações (opcional)</p>
                                <textarea name="observacoes" placeholder="Ex: Carro faz barulho estranho ao frear." value={agendamentoData.observacoes} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button type="button" className="btn-modal cancelar" onClick={handleFecharModal}>Cancelar</button>
                            <button type="submit" className="btn-modal cadastrar">Agendar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdicionarAgendamento;