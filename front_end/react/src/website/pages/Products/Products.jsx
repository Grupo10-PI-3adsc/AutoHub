import React, { useState, useEffect } from "react";
import ProductHeader from "../../components/ProductHeader.jsx";
import SideBar from "../../components/SideBar";
import ProductsCard from "../../components/ProductsCard/ProductsCard.jsx"; 
import styles from "../Products/Products.module.css";
import ImagemSetaEsquerda from "../../../assets/seta-esquerda.png"
import ImagemSetaDireita from '../../../assets/seta-direita.png'

function Products() {
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {
        const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
        setCarrinho(carrinhoLocal);
    }, []);

    return (
        <>
        <ProductHeader carrinho={carrinho} setCarrinho={setCarrinho} />
            <div className="products">
                <SideBar />
                <div className="products-container">
                    <h1>Produtos</h1>
                    <div className="products-banner">
                        <h1>Cuide do seu carro como ele merece – produtos essenciais para realçar cada detalhe!</h1>
                    </div>

                    <div className="products-selector">
                        <img src={ImagemSetaEsquerda} alt="" />
                        <h2>Óleo</h2>
                        <img src={ImagemSetaDireita} alt="" />
                    </div>

                    <div className={styles['products-cards-container']}>
                        <ProductsCard atualizarCarrinho={setCarrinho} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;