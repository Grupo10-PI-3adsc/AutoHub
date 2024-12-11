import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from "./CarrinhoDeCompras.module.css";

const CarrinhoDeCompras = ({ carrinho, setCarrinho }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(carrinhoLocal);
  }, [setCarrinho]);

  const removerItem = (id) => {
    const item = carrinho.find((produto) => produto.id === id);
    if (item) {
      Swal.fire({
        title: "Tem certeza?",
        text: `Deseja realmente remover "${item.nome}" do carrinho?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "Green",
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const novoCarrinho = carrinho.filter((item) => item.id !== id);
          setCarrinho(novoCarrinho);
          localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
          Swal.fire(
            "Removido!",
            `"${item.nome}" foi removido do carrinho.`,
            "success"
          );
        }
      });
    }
  };

  const alterarQuantidade = (id, quantidade) => {
    const novoCarrinho = carrinho.map((item) =>
      item.id === id
        ? { ...item, quantidade: Math.max(1, quantidade) }
        : item
    );
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + (item.preco || 0) * item.quantidade,
      0
    );
  };

  const finalizarCompra = () => {
    navigate("/finalizar-compra", { state: { carrinho } });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Carrinho de Compras</h2>
      <div className={styles.cartItems}>
        {carrinho.length > 0 ? (
          carrinho.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <span className={styles.itemName}>{item.nome}</span>
              <div className={styles.actions}>
                <input
                  type="number"
                  value={item.quantidade}
                  min="1"
                  onChange={(e) =>
                    alterarQuantidade(item.id, parseInt(e.target.value, 10))
                  }
                  className={styles.input}
                />
                <span className={styles.price}>
                  R$ {(item.preco || 0).toFixed(2)}
                </span>
                <button
                  onClick={() => removerItem(item.id)}
                  className={styles.removeButton}
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.empty}>Seu carrinho está vazio.</p>
        )}
      </div>
      <div className={styles.total}>
        <h3>Total: R$ {calcularTotal().toFixed(2)}</h3>
      </div>
      <button className={styles.checkoutButton} onClick={finalizarCompra}>Finalizar Compra</button>
    </div>
  );
};

export default CarrinhoDeCompras;