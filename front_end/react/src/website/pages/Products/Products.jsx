import React, { useState, useEffect } from "react";
import ProductHeader from "../../components/ProductHeader.jsx";
import SideBar from "../../components/SideBar";
import ProductsCard from "../../components/ProductsCard/ProductsCard.jsx"; 
import styles from "../Products/Products.module.css";

function Products() {
    const [carrinho, setCarrinho] = useState([]);
    const [produtos, setProdutos] = useState([]); // produtos da API
    const [matrixProdutos, setMatrixProdutos] = useState([]); // produtos agrupados
    const [categoriaIndex, setCategoriaIndex] = useState(0); // índice da categoria atual

    useEffect(() => {
        const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
        setCarrinho(carrinhoLocal);
    }, []);

    useEffect(() => {
        // Simulando o GET da API
        async function fetchProdutos() {
            const response = await fetch("URL_DA_SUA_API"); // colocar URL real
            const data = await response.json();

            setProdutos(data);

            // Agrupar categorias
            const matriz = Ordenador(data);
            setMatrixProdutos(matriz);
        }

        fetchProdutos();
    }, []);

    function Ordenador(lista) {
        const matrixProdutos = [];

        lista.forEach((produto) => {
            const categoriaExistente = matrixProdutos.find(
                (grupo) => grupo.categoria === produto.categoria
            );

            if (categoriaExistente) {
                categoriaExistente.produtos.push(produto);
            } else {
                matrixProdutos.push({
                    categoria: produto.categoria,
                    produtos: [produto]
                });
            }
        });

        return matrixProdutos;
    }

    // Função para ir para a categoria anterior
    function handlePrevCategoria() {
        setCategoriaIndex((prevIndex) =>
            prevIndex === 0 ? matrixProdutos.length - 1 : prevIndex - 1
        );
    }

    // Função para ir para a próxima categoria
    function handleNextCategoria() {
        setCategoriaIndex((prevIndex) =>
            prevIndex === matrixProdutos.length - 1 ? 0 : prevIndex + 1
        );
    }

    // Categoria atual e seus produtos
    const categoriaAtual = matrixProdutos[categoriaIndex]?.categoria || "";
    const produtosDaCategoria = matrixProdutos[categoriaIndex]?.produtos || [];

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
                        <img
                            src="/assets/seta-esquerda.png"
                            alt="Seta para esquerda"
                            onClick={handlePrevCategoria}
                            style={{ cursor: "pointer" }}
                        />
                        <h2>{categoriaAtual}</h2>
                        <img
                            src="/assets/seta-direita.png"
                            alt="Seta para direita"
                            onClick={handleNextCategoria}
                            style={{ cursor: "pointer" }}
                        />
                    </div>

                    <div className={styles['products-cards-container']}>
                        {produtosDaCategoria.map((produto) => (
                            <ProductsCard
                                key={produto.id}
                                produto={produto}
                                atualizarCarrinho={setCarrinho}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
