import Update from "./UpdateCliente";
import UpdateFuncionario from "./UpdateFuncionario";
import EmployeeRegister from "./RegisterFuncionario";
import UpdateCliente from "./UpdateCliente";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";

const apiUrl = import.meta.env.VITE_API_URL;

const handleDeleteCliente = async (id, dados, setDados) => {
  console.log("id para ser deletado: " + id);
  try {
    const response = await axios.put(`${apiUrl}/usuarios/inativar/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const dadosDoBanco = response.data;
    console.log("Dados recebidos da API:", dadosDoBanco);

    setDados(dados.filter((cliente) => cliente.id !== id));

    Swal.fire({
      icon: "success",
      title: "Usuário deletado",
      text: "Exito ao deletar o usuário.",
      showConfirmButton: true,
    });
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error("Acesso proibido: verifique as permissões do usuário.");
    } else {
      console.error("Erro ao buscar dados:", error);
    }

    Swal.fire({
      icon: "error",
      title: "Erro ao deletar",
      text: "Aguarde alguns minutos e tente novamente.",
      showConfirmButton: true,
    });
  }
};


const TableClients = () => {
    const [dados, setDados] = useState([]);
    const [mostrarUpdate, setMostrarUpdate] = useState(false);
    const [clientToEdit, setClientToEdit] = useState(null);

    const handleOpenUpdateModal = (client) => {
        setClientToEdit(client);
        setMostrarUpdate(true);
    };

    const handleClientUpdated = (updatedClient) => {
        setDados(prevDados => 
            prevDados.map(cli => cli.id === updatedClient.id ? updatedClient : cli)
        );
        setMostrarUpdate(false);
    };

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/usuarios`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (Array.isArray(response.data)) {
                    setDados(response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchDados();
    }, []);

    const dadosFiltrados = dados.filter((tupla) => tupla.role === "USER");

    return (
        <>
            {mostrarUpdate && clientToEdit && (
                <UpdateCliente
                    client={clientToEdit}
                    setMostrarUpdate={setMostrarUpdate}
                    onClientUpdated={handleClientUpdated}
                />
            )}
            <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <div className="table-header">
                    <div className="table-column">Id</div>
                    <div className="table-column">Nome</div>
                    <div className="table-column">Email</div>
                    <div className="table-column">CNPJ/CPF</div>
                    <div className="table-column">Contato</div>
                    <div className="table-actions-header">Ações</div>
                </div>

                {dadosFiltrados.length > 0 ? (
                    dadosFiltrados.map((client) => (
                        <div key={client.id} className="table-row">
                            <div className="table-column">{client.id}</div>
                            <div className="table-column">{client.nome}</div>
                            <div className="table-column">{client.email}</div>
                            <div className="table-column">{client.cpfCnpj}</div>
                            <div className="table-column">{client.telefone}</div>
                            <div className="table-actions">
                                <FaTrash />
                                <FaPencilAlt onClick={() => handleOpenUpdateModal(client)} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Carregando dados...</p>
                )}
            </div>
        </>
    );
};


const TableEmployees = () => {
    const [dados, setDados] = useState([]);
    const [mostrarUpdate, setMostrarUpdate] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    const handleOpenUpdateModal = (employee) => {
        setEmployeeToEdit(employee);
        setMostrarUpdate(true);
    };

    const handleEmployeeUpdated = (updatedEmployee) => {
        setDados(prevDados => 
            prevDados.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
        );
        setMostrarUpdate(false);
    };

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/usuarios`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (Array.isArray(response.data)) {
                    setDados(response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchDados();
    }, []);

    const dadosFiltrados = dados.filter((tupla) => tupla.role !== "USER");

    return (
        <>
            {mostrarUpdate && employeeToEdit && (
                <UpdateFuncionario 
                    employee={employeeToEdit}
                    setMostrarUpdate={setMostrarUpdate}
                    onEmployeeUpdated={handleEmployeeUpdated}
                />
            )}
            <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <div className="table-header">
                    <div className="table-column">Id</div>
                    <div className="table-column">Nome</div>
                    <div className="table-column">Email</div>
                    <div className="table-column">CNPJ/CPF</div>
                    <div className="table-column">Função</div>
                    <div className="table-column">Contato</div>
                    <div className="table-actions-header"></div>
                </div>

                {dadosFiltrados.length > 0 ? (
                    dadosFiltrados.map((tupla) => (
                        <div key={tupla.id} className="table-row">
                            <div className="table-column">{tupla.id}</div>
                            <div className="table-column">{tupla.nome}</div>
                            <div className="table-column">{tupla.email}</div>
                            <div className="table-column">{tupla.cpfCnpj}</div>
                            <div className="table-column">{tupla.role}</div>
                            <div className="table-column">{tupla.telefone}</div>
                            <div className="table-actions">
                                <FaTrash />
                                <FaPencilAlt onClick={() => handleOpenUpdateModal(tupla)} style={{cursor: 'pointer'}} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Carregando dados...</p>
                )}
            </div>
        </>
    );
};

const TableOrders = () => {
  const [dados, setDados] = useState([]);

  const [mostrarUpdate, setMostrarUpdate] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // Função para abrir o modal de edição
  const handleUpdatePedido = (pedido) => {
    setPedidoSelecionado(pedido);
    setMostrarUpdate(true);
  };

  const handleDetailsPedido = (id) => {
    dados.forEach((pedido) => {
      if (pedido.id === id) {
        Swal.fire({
          title: `Detalhes do Pedido #${pedido.id}`,
          html: `
                        <p><strong>Cliente:</strong> ${pedido.fkUsuario?.nome || 'N/A'}</p>
                        <p><strong>Data:</strong> ${new Date(pedido.dataPedido).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                        <p><strong>Produtos:</strong> ${pedido.produtos && pedido.produtos.length > 0
              ? pedido.produtos.map(p => p.nome).join(', ')
              : 'Nenhum produto'}</p>
                        <p><strong>Total:</strong> R$ ${parseFloat(pedido.total || 0).toFixed(2).replace('.', ',')}</p>
                        <p><strong>Status:</strong> ${pedido.status || 'N/A'}</p>
                    `,
          icon: 'info',
          confirmButtonText: 'Fechar'
        });
      }
    });

  };

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/produtos/pedidos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (Array.isArray(response.data)) {
          setDados(response.data);
        } else {
          setDados([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos pedidos:", error);
      }
    };

    fetchDados();
  }, []);

  return (
    <>
      {/* {mostrarUpdate && <UpdateOrder pedido={pedidoSelecionado} setMostrarUpdate={setMostrarUpdate} />} */}
      <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {/* CABEÇALHO AJUSTADO */}
        <div className="table-header">
          <div className="table-column">#</div>
          <div className="table-column">Cliente</div>
          <div className="table-column">Data</div>
          <div className="table-column">Produtos</div>
          <div className="table-column">Valor Total</div>
          <div className="table-column">Status Pagamento</div>
          <div className="table-actions-header">Ações</div>
        </div>

        {/* MAPEAMENTO DE DADOS CORRIGIDO */}
        {dados.length > 0 ? (
          dados.map((pedido) => (
            <div key={pedido.id} className="table-row">
              <div className="table-column">
                {pedido.id}
              </div>
              <div className="table-column">
                {pedido.fkUsuario?.nome || 'N/A'}
              </div>
              <div className="table-column">
                {new Date(pedido.dataPedido).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
              </div>
              <div className="table-column">
                {pedido.produtos && pedido.produtos.length > 0
                  ?
                  pedido.produtos
                    .slice(0, 4)
                    .map(p => p.nome)
                    .join(', ') +
                  (pedido.produtos.length > 4 ? '...' : '')
                  :
                  'Nenhum produto'
                }
              </div>
              <div className="table-column">
                {`R$ ${parseFloat(pedido.total || 0).toFixed(2).replace('.', ',')}`}
              </div>
              <div className="table-column">
                {pedido.status || 'N/A'}
              </div>
              <div className="table-actions">

                <FaRegEye onClick={() => handleDetailsPedido(pedido.id)} style={{ cursor: 'pointer' }} />
                {/* <FaPencilAlt onClick={() => handleUpdatePedido(pedido)} style={{ cursor: 'pointer' }} /> */}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>Carregando ou nenhum pedido encontrado...</p>
        )}
      </div>
    </>
  );
};

const TableServices = () => {
  const [mostrarUpdate, setMostrarUpdate] = useState(false);
  const [dados, setDados] = useState([]);

  const handleUpdateCliente = () => {
    setMostrarUpdate((prevState) => !prevState);
  };

  useEffect(() => {
    if (mostrarUpdate) {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mostrarUpdate]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/usuarios`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const dadosDoBanco = response.data;
        console.log("Dados recebidos da API:", dadosDoBanco);

        if (Array.isArray(dadosDoBanco)) {
          setDados(dadosDoBanco);
        } else {
          console.error("Dados retornados não são um array:", dadosDoBanco);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("Acesso proibido: verifique as permissões do usuário.");
        } else {
          console.error("Erro ao buscar dados:", error);
        }
      }
    };

    fetchDados();
  }, []);

  return (
    <>
      {mostrarUpdate && <Update setMostrarUpdate={setMostrarUpdate} />}
      <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div className="table-header">
          <div className="table-column">#</div>
          <div className="table-column">Produto</div>
          <div className="table-column">Tipo Serviço</div>
          <div className="table-column">Pagamento</div>
          <div className="table-column">Valor</div>
          <div className="table-column">Data</div>
          <div className="table-column">Status</div>
          <div className="table-actions-header"></div>
        </div>

        {dados.length > 0 ? (
          dados.map((tupla, index) => (
            <div key={index} className="table-row">
              <div className="table-column">{tupla.id || "id não disponível"}</div>
              <div className="table-column">{tupla.nome || "Nome não disponível"}</div>
              <div className="table-column">{tupla.email || "Email não disponível"}</div>
              <div className="table-column">{tupla.cpfCnpj || "CPF/CNPJ não disponível"}</div>
              <div className="table-column">{tupla.role || "Papel não disponível"}</div>
              <div className="table-column">{tupla.telefone || "Contato não disponível"}</div>
              <div className="table-actions">
                <FaTrash onClick={() => handleDeleteCliente(tupla.id)} />
                <FaPencilAlt onClick={handleUpdateCliente} />
                {/* <FaPencilAlt onClick={() => handleUpdateCliente(tupla)} /> */}
              </div>
            </div>
          ))
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
    </>
  );
};





const TableProducts = ({ produtos, onEdit, onDelete }) => {
  return (
    <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
      <div className="table-header">
        <div className="table-column">ID</div>
        <div className="table-column">Nome</div>
        <div className="table-column">Categoria</div>
        <div className="table-column">Qtd. Estoque</div>
        <div className="table-column">Categoria</div>
        <div className="table-column">Preço</div>
        <div className="table-actions-header">Ações</div>
      </div>

      {produtos && produtos.length > 0 ? (
        produtos.map((produto) => (
          <div key={produto.id} className="table-row">
            <div className="table-column">{produto.id}</div>
            <div className="table-column">{produto.nome}</div>
            <div className="table-column">{produto.categoria}</div>
            <div className="table-column">{produto.qtdEstoque}</div>
            <div className="table-column">{produto.categoria}</div>
            <div className="table-column"> R$ {produto.preco}</div>
            <div className="table-actions">
              <FaTrash onClick={() => onDelete(produto.id)} style={{ cursor: 'pointer' }} />
              <FaPencilAlt onClick={() => onEdit(produto)} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center', padding: '20px' }}>Nenhum produto encontrado ou carregando...</p>
      )}
    </div>
  );
};

export default TableProducts;


export { TableClients, TableEmployees, TableOrders, TableServices, TableProducts };
