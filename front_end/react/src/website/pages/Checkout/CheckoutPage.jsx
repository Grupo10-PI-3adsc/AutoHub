import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code"; 
import { FaCreditCard, FaMoneyBillAlt, FaStore } from "react-icons/fa"; 
import { SiPix } from "react-icons/si"; 
import swal from "sweetalert2"; 
import styles from "./CheckoutPage.module.css";
import ProductHeader from "../../components/ProductHeader.jsx";
import SideBar from "../../components/SideBar.jsx";

const CheckoutPage = ({ setCarrinho }) => { 
  const location = useLocation();
  const navigate = useNavigate();
  const carrinho = location.state?.carrinho || [];
  const [total, setTotal] = useState(0);
  const [pixCode, setPixCode] = useState("");
  const [opcao, setOpcao] = useState("produto");

  useEffect(() => {
    const calcularTotal = () => {
      return carrinho.reduce(
        (total, item) => total + (item.preco || 0) * item.quantidade,
        0
      );
    };
    setTotal(calcularTotal());
  }, [carrinho]);

  const gerarPixCode = () => {
    const code = `00020126360014br.gov.bcb.pix0114+551194959134052040000530398654041.005802BR5925Gustavo Dos Santos Ferrei6008Brasilia62080504mpda63047E61`;
    setPixCode(code);
  };

  const continuarParaPedidos = () => {
    navigate("/pedidos");
  };

  const cancelarPagamento = () => {
    setPixCode("");
  };

  const pagarNaLoja = () => {
    swal.fire({
      title: 'Deseja realizar o pagamento na loja?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        continuarParaPedidos();
      }
    });
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
            <h2 className={styles.header}>Opções de Pagamento</h2>
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
              <button className={styles.disabledButton} disabled>
                <FaCreditCard className={styles.icon} /> Cartão de Crédito
              </button>
              <button className={styles.disabledButton} disabled>
                <FaCreditCard className={styles.icon} /> Cartão de Débito
              </button>
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
                  <h3>Escaneie o QR Code abaixo para pagar</h3>
                  <QRCode value={pixCode} size={256} />
                  <div className={styles.qrCodeButtons}>
                    <button className={styles.continueButton} onClick={continuarParaPedidos}>
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