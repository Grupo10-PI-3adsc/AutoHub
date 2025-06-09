import Update from "./UpdateCliente";
import EmployeeRegister from "./RegisterFuncionario";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

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

  const dadosFiltrados = dados.filter((tupla) => tupla.role == "USER");


  return (
    <>
      {mostrarUpdate && <Update setMostrarUpdate={setMostrarUpdate} />}
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
          dadosFiltrados.map((tupla, index) => (
            <div key={index} className="table-row">
              <div className="table-column">{tupla.id || "id não disponível"}</div>
              <div className="table-column">{tupla.nome || "Nome não disponível"}</div>
              <div className="table-column">{tupla.email || "Email não disponível"}</div>
              <div className="table-column">{tupla.cpfCnpj || "CPF/CNPJ não disponível"}</div>
              <div className="table-column">{tupla.role || "Papel não disponível"}</div>
              <div className="table-column">{tupla.telefone || "Contato não disponível"}</div>
              <div className="table-actions">
              <FaTrash onClick={() => handleDeleteCliente(tupla.id, dados, setDados)} />
                <FaPencilAlt onClick={() => handleUpdateCliente(tupla)} />
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

const TableEmployees = () => {
  const [mostrarUpdate, setMostrarUpdate] = useState(false);
  const [dados, setDados] = useState([]);

  const handleUpdateEmployee = () => {
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

  const dadosFiltrados = dados.filter((tupla) => tupla.role !== "USER");

  return (
    <>
      {mostrarUpdate && <EmployeeUpdate setMostrarUpdate={setMostrarUpdate} />}
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
          dadosFiltrados.map((tupla, index) => (
              <div key={index} className="table-row">
              <div className="table-column">{tupla.id || "id não disponível"}</div>
              <div className="table-column">{tupla.nome || "Nome não disponível"}</div>
              <div className="table-column">{tupla.email || "Email não disponível"}</div>
              <div className="table-column">{tupla.cpfCnpj || "CPF/CNPJ não disponível"}</div>
              <div className="table-column">{tupla.role || "Papel não disponível"}</div>
              <div className="table-column">{tupla.telefone || "Contato não disponível"}</div>
              <div className="table-actions">
              <FaTrash onClick={() => handleDeleteCliente(tupla.id, dados, setDados)} />
              <FaPencilAlt onClick={handleUpdateEmployee} />
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

const TableOrders = () => {
    const [dados, setDados] = useState([]);
    // State para controlar o modal de edição de PEDIDO
    const [mostrarUpdate, setMostrarUpdate] = useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    // Função para abrir o modal de edição
    const handleUpdatePedido = (pedido) => {
        setPedidoSelecionado(pedido);
        setMostrarUpdate(true);
    };

    const handleDeletePedido = (id) => {
        console.log("Deletar pedido com ID:", id);
        
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
                    <div className="table-column">Status</div>
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
                                    ? pedido.produtos.map(p => p.nome).join(', ')
                                    : 'Nenhum produto'
                                }
                            </div>
                            <div className="table-column">
                                {`R$ ${parseFloat(pedido.total || 0).toFixed(2).replace('.', ',')}`}
                            </div>
                            <div className="table-column">
                                {pedido.status || 'N/A'}
                            </div>
                            <div className="table-actions">
                                <FaTrash onClick={() => handleDeletePedido(pedido.id)} style={{ cursor: 'pointer' }} />
                                <FaPencilAlt onClick={() => handleUpdatePedido(pedido)} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: 'center', padding: '20px'}}>Carregando ou nenhum pedido encontrado...</p>
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
