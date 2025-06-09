import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { FaStore } from "react-icons/fa";
import { SiPix } from "react-icons/si";
import swal from "sweetalert2";
import styles from "./CheckoutPage.module.css";
import ProductHeader from "../../components/ProductHeader.jsx";
import axios from 'axios';
import SideBar from "../../components/SideBar.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const CheckoutPage = ({ setCarrinho }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const carrinho = location.state?.carrinho || [];
  const [total, setTotal] = useState(0);
  const [pixCode, setPixCode] = useState("");
  const [opcao, setOpcao] = useState("produto");
  const [pedidoId, setPedidoId] = useState(null);

  useEffect(() => {
    const calcularTotal = () => {
      return carrinho.reduce(
        (total, item) => total + (item.preco || 0) * item.quantidade,
        0
      );
    };
    setTotal(calcularTotal());
  }, [carrinho]);

  const requisicaoPedido = async () => {
    const instalacao = opcao === "instalacao";

    const carrinhoIds = carrinho.flatMap(item =>
      Array(item.quantidade).fill(item.id)
    );

    const data = {
      carrinho: carrinhoIds,
      intalacao: instalacao,
    };
    
    console.log("Corpo da requisição para criar pedido:", data);

    try {
      const userId = localStorage.getItem('id');
      const response = await axios.post(`${apiUrl}/api/produtos/pedidos/${userId}`, data);
      
      return response.data; 

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.request
          ? "O servidor não respondeu. Por favor, tente novamente."
          : "Ocorreu um erro inesperado. Por favor, tente novamente.");

      swal.fire({
        icon: "error",
        title: "Erro ao Criar Pedido",
        text: errorMessage,
        showConfirmButton: true,
      });

      console.error("Erro ao criar pedido:", error);
      return null; 
    }
  };
  
  const gerarPixCode = async () => {
    const novoPedido = await requisicaoPedido();

    if (novoPedido && novoPedido.id) { 
      setPedidoId(novoPedido.id); 
      
      const code = `00020126360014br.gov.bcb.pix0114+551194959134052040000530398654041.005802BR5925Gustavo Dos Santos Ferrei6008Brasilia62080504mpda63047E61`;
      setPixCode(code);
    } else {
        console.log("Não foi possível gerar o PIX pois a criação do pedido falhou.");
    }
  };

const finalizarPedidoPix = async () => {
    if (!pedidoId) {
        swal.fire("Erro", "ID do pedido não encontrado para finalizar o pagamento.", "error");
        return;
    }

    const url = `${apiUrl}/api/produtos/pedidos/pago/${pedidoId}`; 
    const body = {}; 

    try {
        console.log(`Finalizando pedido PIX com ID: ${pedidoId}`);
        await axios.put(url, body); 

        console.log("API respondeu com sucesso. Exibindo alerta.");

        await swal.fire({
            icon: "success",
            title: "Pagamento Confirmado!",
            text: "Seu pedido foi atualizado. Redirecionando...",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true, 
        });

        console.log("Alerta finalizado. Limpando carrinho e navegando.");

        navigate("/pedidos");

    } catch(error) {
        const errorMessage =
        error.response?.data?.message ||
        (error.request
          ? "O servidor não respondeu."
          : "Ocorreu um erro inesperado.");

      swal.fire({
          icon: "error",
          title: "Erro na Finalização",
          text: `Não foi possível finalizar o pedido: ${errorMessage}`,
          showConfirmButton: true,
      });

      console.error("Erro ao finalizar pedido PIX:", error);
    }
  }

  const pagarNaLoja = async () => {
    const result = await swal.fire({
      title: 'Deseja criar o pedido para pagamento na loja?',
      text: "O pedido ficará aguardando o pagamento e retirada.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, criar pedido!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const pedidoCriado = await requisicaoPedido();
      if (pedidoCriado) {
        swal.fire({
          icon: "success",
          title: "Pedido Criado com sucesso!",
          text: "Aguardando pagamento e retirada na loja. Redirecionando...",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          setCarrinho([]); 
          navigate("/pedidos");
        });
      }
    }
  };
  
  const cancelarPagamento = () => {
    console.log(`Pagamento PIX para o pedido ${pedidoId} foi cancelado pelo usuário.`);
    setPixCode("");
    setPedidoId(null);
  };

  return (
    <>
      <ProductHeader carrinho={carrinho} setCarrinho={setCarrinho} />
      <div className={styles.checkout}>
        <SideBar />
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <h2 className={styles.header}>Resumo do Pedido</h2>
            <div className={styles.cartItems}>
              {carrinho.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <span className={styles.itemName}>{item.nome}</span>
                  <span className={styles.quantity}>Qtd: {item.quantidade}</span>
                  <span className={styles.price}>
                    R$ {(item.preco || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rightColumn}>
            <h2 className={styles.header}>Opções de Entrega</h2>
            <div className={styles.paymentOptions}>
              <label>
                <input
                  type="radio"
                  name="opcao"
                  value="instalacao"
                  checked={opcao === "instalacao"}
                  onChange={() => setOpcao("instalacao")}
                />
                Instalação e Produto
              </label>
              <label>
                <input
                  type="radio"
                  name="opcao"
                  value="produto"
                  checked={opcao === "produto"}
                  onChange={() => setOpcao("produto")}
                />
                Apenas Produto
              </label>
            </div>
            <div className={styles.total}>
              <h3>Total: R$ {total.toFixed(2)}</h3>
            </div>
            <div className={styles.paymentMethods}>
              <button className={styles.enabledButton} onClick={gerarPixCode}>
                <SiPix className={styles.icon} /> Pagar com PIX
              </button>
              <button className={styles.enabledButton} onClick={pagarNaLoja}>
                <FaStore className={styles.icon} /> Pagar na Loja
              </button>
            </div>
            {pixCode && (
              <div className={styles.qrCodeOverlay}>
                <div className={styles.qrCodeContainer}>
                  <h3>Escaneie o QR Code para pagar</h3>
                  <QRCode value={pixCode} size={256} />
                  <p className={styles.pixInfo}>Após o pagamento, clique em "Continuar".</p>
                  <div className={styles.qrCodeButtons}>
                    <button className={styles.continueButton} onClick={finalizarPedidoPix}>
                      Continuar para Pedidos
                    </button>
                    <button className={styles.cancelButton} onClick={cancelarPagamento}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;