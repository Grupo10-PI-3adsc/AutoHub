import React from 'react';
import CarrinhoDeCompras from '../../components/CarrinhoDeCompras';
import styles from './CarrinhoDeCompras.module.css';
import React, { useState } from "react";

const CarrinhoDeCompras = () => {
  const [carrinho, setCarrinho] = useState([
    { id: 1, nome: "Pneu Aro 15", preco: 350.0, quantidade: 2 },
    { id: 2, nome: "Óleo de Motor 5L", preco: 200.0, quantidade: 1 },
  ]);

  const removerItem = (id) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  const alterarQuantidade = (id, quantidade) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === id
          ? { ...item, quantidade: Math.max(1, quantidade) }
          : item
      )
    );
  };

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Carrinho de Compras</h2>
      <div style={styles.cartItems}>
        {carrinho.length > 0 ? (
          carrinho.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <span style={styles.itemName}>{item.nome}</span>
              <div style={styles.actions}>
                <input
                  type="number"
                  value={item.quantidade}
                  min="1"
                  onChange={(e) =>
                    alterarQuantidade(item.id, parseInt(e.target.value, 10))
                  }
                  style={styles.input}
                />
                <span style={styles.price}>R$ {item.preco.toFixed(2)}</span>
                <button
                  onClick={() => removerItem(item.id)}
                  style={styles.removeButton}
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.empty}>Seu carrinho está vazio.</p>
        )}
      </div>
      <div style={styles.total}>
        <h3>Total: R$ {calcularTotal().toFixed(2)}</h3>
      </div>
      <button style={styles.checkoutButton}>Finalizar Compra</button>
    </div>
  );
};

export default CarrinhoDeCompras;
