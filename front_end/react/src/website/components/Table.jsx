import Update from "../components/ClientUpdate";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import EmployeeUpdate from "./EmployeeUpdate";
import { SiPix } from 'react-icons/si';
import styles from "../pages/Checkout/CheckoutPage.module.css";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";



// const apiUrl = "http://54.147.227.169";
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
    // 1. COMPONENT STATES
    const [dados, setDados] = useState([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [pixCode, setPixCode] = useState("");

    // 2. DATA FETCHING EFFECT
    useEffect(() => {
      const fetchDados = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/produtos/pedidos/usuario/${localStorage.getItem('id')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setDados(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Erro ao buscar dados de pedidos:", error);
          setDados([]); // Ensure dados is an array even on error
        }
      };
      fetchDados();
    }, []);

    // 3. HANDLER FUNCTIONS

    // Function to open order details modal (from first example)
    const handleDetailsPedido = (pedido) => {
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
    };

    // Function to open PIX modal
    const handleAbrirModalPix = (pedido) => {
      setPedidoSelecionado(pedido);
      // This is a hardcoded PIX code. In a real application, you'd generate this dynamically.
      const code = `00020126360014br.gov.bcb.pix0114+551194959134052040000530398654041.005802BR5925Gustavo Dos Santos Ferrei6008Brasilia620804mpda63047E61`;
      setPixCode(code);
    };

    // Function to close PIX modal
    const fecharModalPix = () => {
      setPedidoSelecionado(null);
      setPixCode("");
    };

    // Function to finalize payment
    const handleFinalizarPagamento = async () => {
      if (!pedidoSelecionado) {
        Swal.fire("Erro", "ID do pedido não encontrado.", "error");
        return;
      }

      const pedidoId = pedidoSelecionado.id;
      const url = `${apiUrl}/api/produtos/pedidos/pago/${pedidoId}`;

      try {
        await axios.put(url, {});

        await Swal.fire({
          icon: "success",
          title: "Pagamento Confirmado!",
          text: "Seu pedido foi atualizado.",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        // Update the status locally
        setDados(dadosAtuais =>
          dadosAtuais.map(p =>
            p.id === pedidoId ? { ...p, status: 'Pago' } : p
          )
        );

        // Close the modal
        fecharModalPix();

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Ocorreu um erro inesperado.";
        Swal.fire({
          icon: "error",
          title: "Erro na Finalização",
          text: `Não foi possível finalizar o pedido: ${errorMessage}`,
        });
      }
    };

    // 4. COMPONENT JSX
    return (
      <>
        <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {/* TABLE HEADER */}
          <div className="table-header">
            <div className="table-column">#</div>
            <div className="table-column">Cliente</div>
            <div className="table-column">Data</div>
            <div className="table-column">Produtos</div>
            <div className="table-column">Valor Total</div>
            <div className="table-column">Status</div>
            <div className="table-actions-header">Ações</div> {/* Added Ações header */}
          </div>

          {/* TABLE BODY */}
          {dados.length > 0 ? (
            dados.map((pedido) => (
              <div key={pedido.id} className="table-row">
                <div className="table-column">{pedido.id}</div>
                <div className="table-column">{pedido.fkUsuario?.nome || "N/A"}</div>
                <div className="table-column">{new Date(pedido.dataPedido).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</div>
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
                <div className="table-column">{`R$ ${parseFloat(pedido.total || 0).toFixed(2).replace('.', ',')}`}</div>
                <div className="table-column">
                  {pedido.status === "Aguardando" ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{pedido.status}</span>
                    </div>
                  ) : (
                    pedido.status
                  )}
                </div>
                <div className="table-actions">
                  <FaRegEye
                    onClick={() => handleDetailsPedido(pedido)}
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    title="Ver Detalhes"
                  />
                  {pedido.status === "Aguardando" && (
                    // MODIFICATION HERE: Ensure no background is set on the icon itself.
                    // The color is set directly to the icon.
                    <SiPix
                      onClick={() => handleAbrirModalPix(pedido)}
                      title="Pagar com PIX"
                      style={{
                        cursor: 'pointer',
                        color: '#32BCAD', // Keep the PIX green color
                        fontSize: '1.2em',
                        background: 'transparent' // Explicitly set background to transparent
                      }}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '20px' }}>Carregando ou nenhum pedido encontrado...</p>
          )}
        </div>

        {/* PIX MODAL (rendered once, outside the map) */}
        {pixCode && pedidoSelecionado && (
          <div className={styles.qrCodeOverlay}>
            <div className={styles.qrCodeContainer}>
              <h3>Escaneie para pagar o pedido #{pedidoSelecionado.id}</h3>
              <QRCode value={pixCode} size={256} />
              <p className={styles.pixInfo}>Após o pagamento, confirme abaixo.</p>
              <div className={styles.qrCodeButtons}>
                <button className={styles.continueButton} onClick={handleFinalizarPagamento}>
                  Pagamento Realizado
                </button>
                <button className={styles.cancelButton} onClick={fecharModalPix}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
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
          <div className="table-column">Data</div>
          <div className="table-column">Pagamento</div>
          <div className="table-column">Valor</div>
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

export { TableClients, TableEmployees, TableOrders, TableServices };
