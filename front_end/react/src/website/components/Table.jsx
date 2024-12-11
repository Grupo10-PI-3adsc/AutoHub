import Update from "../components/ClientUpdate";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import EmployeeUpdate from "./EmployeeUpdate";

const apiUrl = import.meta.env.VITE_CLOUD_API_URL;

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
        const response = await axios.get(`${apiUrl}/usuarios`, {
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
        const response = await axios.get(`${apiUrl}/usuarios`, {
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
        const response = await axios.get(`${apiUrl}/usuarios`, {
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
          <div className="table-column">Cliente</div>
          <div className="table-column">Tipo</div>
          <div className="table-column">Data</div>
          <div className="table-column">Pagamento</div>
          <div className="table-column">Produtos</div>
          <div className="table-column">Valor Total</div>
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
        const response = await axios.get(`${apiUrl}/usuarios`, {
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
