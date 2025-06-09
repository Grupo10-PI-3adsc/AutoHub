import React, { useState, useEffect } from "react";
import axios from 'axios'; // Importar axios para a requisição
import ProductHeader from "../../components/ProductHeader.jsx";
import SideBar from "../../components/SideBar";
import ProductsCard from "../../components/ProductsCard/ProductsCard.jsx";
import styles from "../Products/Products.module.css"; // Certifique-se de que o caminho está correto

// URL da sua API de produtos
const apiUrl = import.meta.env.VITE_API_URL;
// const API_PRODUCTS_URL = 'http://localhost:8080/api/produtos'; // Substitua pela sua URL real  /listar-produtos

function Products() {
    const [carrinho, setCarrinho] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // Todos os produtos da API
    const [categorizedProducts, setCategorizedProducts] = useState([]); // Produtos organizados por categoria
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Índice da categoria atual
    const [displayProducts, setDisplayProducts] = useState([]); // Produtos a serem exibidos no ProductsCard

    // Função Ordenador (sua função, movida para dentro do componente Products)
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

    // Efeito para carregar o carrinho do localStorage
    useEffect(() => {
        const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
        setCarrinho(carrinhoLocal);
    }, []);

    // Efeito para buscar os produtos da API e categorizá-los
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/produtos/listar-produtos`);
                if (Array.isArray(response.data)) {
                    setAllProducts(response.data); // Armazena todos os produtos
                    const organized = Ordenador(response.data);
                    setCategorizedProducts(organized);

                    // Define os produtos da primeira categoria como os produtos iniciais a serem exibidos
                    if (organized.length > 0) {
                        setDisplayProducts(organized[0].produtos);  
                    } else {
                        setDisplayProducts([]); // Se não houver categorias, exibe array vazio
                    }
                } else {
                    console.error("Dados da API não são um array:", response.data);
                    setAllProducts([]);
                    setCategorizedProducts([]);
                    setDisplayProducts([]);
                }
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                setAllProducts([]);
                setCategorizedProducts([]);
                setDisplayProducts([]);
            }
        };

        fetchProducts();
    }, []); // O array de dependências vazio garante que isso só execute uma vez ao montar o componente

    // Efeito para atualizar os produtos exibidos sempre que a categoria atual mudar
    useEffect(() => {
        if (categorizedProducts.length > 0 && currentCategoryIndex < categorizedProducts.length) {
            setDisplayProducts(categorizedProducts[currentCategoryIndex].produtos);
        } else {
            setDisplayProducts([]);
        }
    }, [currentCategoryIndex, categorizedProducts]); // Depende de categorizedProducts e currentCategoryIndex

    // Função para avançar para a próxima categoria
    const handleNextCategory = () => {
        if (categorizedProducts.length === 0) return; // Não faz nada se não houver categorias

        setCurrentCategoryIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % categorizedProducts.length;
            return nextIndex;
        });
    };

    // Função para voltar para a categoria anterior
    const handlePrevCategory = () => {
        if (categorizedProducts.length === 0) return; // Não faz nada se não houver categorias

        setCurrentCategoryIndex((prevIndex) => {
            const prevIndexCalculated = (prevIndex - 1 + categorizedProducts.length) % categorizedProducts.length;
            return prevIndexCalculated;
        });
    };

    // Obter o nome da categoria atual para exibir
    const currentCategoryName = categorizedProducts.length > 0
        ? categorizedProducts[currentCategoryIndex].categoria
        : "Carregando..."; // Ou "Nenhuma Categoria"

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
                            onClick={handlePrevCategory} // Adicionado onClick
                            style={{ cursor: 'pointer' }} // Adicionado estilo de cursor para indicar clicável
                        />
                        <h2>{currentCategoryName}</h2> {/* Exibe o nome da categoria atual */}
                        <img
                            src="/assets/seta-direita.png"
                            alt="Seta para direita"
                            onClick={handleNextCategory} // Adicionado onClick
                            style={{ cursor: 'pointer' }} // Adicionado estilo de cursor para indicar clicável
                        />
                    </div>

                    <div className={styles['products-cards-container']}>
                        {/* Passa os produtos filtrados para o ProductsCard */}
                        <ProductsCard products={displayProducts} atualizarCarrinho={setCarrinho} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;