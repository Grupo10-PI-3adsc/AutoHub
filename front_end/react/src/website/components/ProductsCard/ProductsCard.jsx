import React, { useState, useEffect } from "react";
import styles from "../ProductsCard/ProductsCard.module.css";
import Swal from "sweetalert2";

const gerarProdutos = () => {
    return [
        { id: 1, nome: "Lubramax SL 25W-50", preco: 38.0, quantidade: 1, imagem: "https://images.tcdn.com.br/img/img_prod/1027273/oleo_lubrax_essencial_20w50_4t_mineral_sl_ma_2239_1_d33f102462eb0bc19e8d52b9b9a6bf4d_20230802111244.jpg" },
        { id: 2, nome: "Pneu Aro 15", preco: 350.0, quantidade: 1, imagem: "https://example.com/pneu.jpg" },
        { id: 3, nome: "Óleo de Motor 5L", preco: 200.0, quantidade: 1, imagem: "https://example.com/oleo.jpg" },
        { id: 4, nome: "Filtro de Óleo", preco: 20.0, quantidade: 1, imagem: "https://example.com/filtro.jpg" },
        { id: 5, nome: "Pastilha de Freio", preco: 100.0, quantidade: 1, imagem: "https://example.com/pastilha.jpg" },
        { id: 6, nome: "Disco de Freio", preco: 150.0, quantidade: 1, imagem: "https://example.com/disco.jpg" },
    ];
};

const ProductsCard = ({ atualizarCarrinho }) => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const produtosGerados = gerarProdutos();
        setProdutos(produtosGerados);
    }, []);

    const addToCart = (produto) => {
        let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
        const existingItem = cart.find((item) => item.id === produto.id);

        if (existingItem) {
            existingItem.quantidade += 1;
        } else {
            cart.push({ ...produto, quantidade: 1 });
        }

        localStorage.setItem("carrinho", JSON.stringify(cart));
        Swal.fire("Adicionado!", `"${produto.nome}" foi adicionado ao carrinho.`, "success");

        atualizarCarrinho(cart);
    };

    return (
        <div className={styles['products-cards']}>
            {produtos.map((produto) => (
                <div key={produto.id} className={styles['product-card']}>
                    <div className={styles['container-product-img']}>
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className={styles['product-image']}
                        />
                    </div>
                    <div className={styles['product-info']}>
                        <div className={styles['name-desc-content']}>   
                            <h2 className={styles['product-name']}>{produto.nome}</h2>
                            <p className={styles['product-subtitle']}>SL 25W-50</p>
                        </div>
                        <div className={styles['product-price-section']}>
                            <span className={styles['product-price']}>R${produto.preco.toFixed(2)}</span>
                            <span className={styles['product-installment']}>2x {(produto.preco / 2).toFixed(2)} sem juros</span>
                        </div>
                        <button className={styles['buy-button']}>Comprar</button>
                        <button className={styles['addCart-button']} onClick={() => addToCart(produto)}>
                            <span className={styles['cart-icon']}>🛒</span> Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductsCard;