import React, { useState, useEffect, useCallback } from "react";
import ProductHeader from "../../../components/ProductHeader";
import SideBar from "../../components/SideBarAdm";
// Removi a importação da TableServices, pois ela será definida aqui
import AdicionarAgendamento from "../../components/AdicionarAgendamento";
import { FaEye, FaPen, FaTrash } from "react-icons/fa"; // Adicionei FaEye para detalhes
import swal from "sweetalert2";
// Axios não é mais necessário para buscar dados, mas pode ser mantido para outras funções
import axios from "axios";

// --- DADOS FALSOS (MOCK) ---
const dadosFalsosAgendamentos = [
    {
        id: 1,
        cliente: "Carlos Silva",
        veiculo: "Honda Civic 2022",
        placa: "RST4G55",
        servico: "Troca de Óleo e Filtro",
        data: "2025-06-12",
        horario: "10:00",
        status: "Agendado",
    },
    {
        id: 2,
        cliente: "Mariana Costa",
        veiculo: "Toyota Corolla 2021",
        placa: "QWE8R12",
        servico: "Alinhamento e Balanceamento",
        data: "2025-06-12",
        horario: "14:30",
        status: "Agendado",
    },
    {
        id: 3,
        cliente: "João Pereira",
        veiculo: "Ford Ranger 2023",
        placa: "JKL9A01",
        servico: "Revisão Completa (50.000 km)",
        data: "2025-06-11",
        horario: "09:00",
        status: "Concluído",
    },
    {
        id: 4,
        cliente: "Ana Souza",
        veiculo: "Hyundai Creta 2022",
        placa: "MNO2B34",
        servico: "Troca de Pastilhas de Freio",
        data: "2025-06-10",
        horario: "16:00",
        status: "Cancelado",
    },
];

// --- COMPONENTE DA TABELA DEFINIDO LOCALMENTE ---
const TableServices = ({ agendamentos, onDelete, onEdit }) => {
    
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'agendado':
                return { backgroundColor: '#17a2b8', color: 'white' };
            case 'concluído':
                return { backgroundColor: '#28a745', color: 'white' };
            case 'cancelado':
                return { backgroundColor: '#dc3545', color: 'white' };
            default:
                return { backgroundColor: '#6c757d', color: 'white' };
        }
    };
    
    return (
        <div className="table-container" style={{ maxHeight: "500px", overflowY: "auto" }}>
            <div className="table-header">
                <div className="table-column">#</div>
                <div className="table-column">Cliente</div>
                <div className="table-column">Veículo</div>
                <div className="table-column">Serviço</div>
                <div className="table-column">Data / Hora</div>
                <div className="table-column">Status</div>
                <div className="table-actions-header">Ações</div>
            </div>

            {agendamentos && agendamentos.length > 0 ? (
                agendamentos.map((agendamento) => (
                    <div key={agendamento.id} className="table-row">
                        <div className="table-column">{agendamento.id}</div>
                        <div className="table-column">{agendamento.cliente}</div>
                        <div className="table-column">{agendamento.veiculo} ({agendamento.placa})</div>
                        <div className="table-column">{agendamento.servico}</div>
                        <div className="table-column">{new Date(agendamento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} - {agendamento.horario}</div>
                        <div className="table-column">
                            <span style={{...getStatusStyle(agendamento.status), padding: '4px 10px', borderRadius: '12px', fontSize: '0.9em' }}>
                                {agendamento.status}
                            </span>
                        </div>
                        <div className="table-actions">
                            <FaTrash onClick={() => onDelete(agendamento.id)} style={{ cursor: 'pointer', color: '#dc3545' }} />
                            <FaPen onClick={() => onEdit(agendamento)} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: 'center', padding: '20px' }}>Nenhum agendamento encontrado.</p>
            )}
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DA PÁGINA ---
function AgendamentosAdm() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    // Carrega os dados falsos quando o componente é montado
    useEffect(() => {
        setAgendamentos(dadosFalsosAgendamentos);
    }, []);

    const handleAdicionarAgendamento = useCallback(() => {
        setMostrarCadastro((prevState) => !prevState);
    }, []);

    // Função de deletar agora remove o item da lista na tela
    const handleDeletarAgendamento = useCallback(async (id) => {
        swal.fire({
            title: 'Você tem certeza?',
            text: "Esta ação é apenas para a apresentação.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, remover!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setAgendamentos(prevAgendamentos => prevAgendamentos.filter(a => a.id !== id));
                swal.fire('Removido!', 'O agendamento foi removido da lista.', 'success');
            }
        });
    }, []);

    const handleEditarAgendamento = (agendamento) => {
        // Aqui você pode abrir um modal de edição com os dados do agendamento
        console.log("Editar agendamento:", agendamento);
        swal.fire('Ação de Editar', `Editar agendamento de ${agendamento.cliente} para o serviço: ${agendamento.servico}`, 'info');
    };

    return (
        <>
            {mostrarCadastro && <AdicionarAgendamento setMostrarCadastro={setMostrarCadastro} />}
            <ProductHeader />
            <div className="clients">
                <SideBar />
                <div className="clients-container">
                    <div className="title-clients">
                        <h1>Agendamentos</h1>
                    </div>

                    <div className="add-clients">
                        <button className="button-add-client" onClick={handleAdicionarAgendamento}>Realizar novo agendamento</button>
                    </div>

                    <div className="table-container">
                        <TableServices 
                            agendamentos={agendamentos}
                            onDelete={handleDeletarAgendamento}
                            onEdit={handleEditarAgendamento}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AgendamentosAdm;