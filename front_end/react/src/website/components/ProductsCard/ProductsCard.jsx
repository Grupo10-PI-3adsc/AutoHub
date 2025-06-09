import React, { useState, useEffect } from "react";
import styles from "./ProductsCard.module.css"; // Mantendo seu CSS original
import Swal from "sweetalert2";
// Removendo Link e useNavigate se não forem usados dentro deste componente
// Removendo axios, apiUrl, e token relacionados à busca de produtos
// pois a busca de produtos foi movida para o componente pai (Products.jsx)

// Removendo a função gerarProdutos, pois não será mais usada aqui.
// const gerarProdutos = async () => { ... };

// O componente ProductsCard agora recebe 'products' e 'atualizarCarrinho' como props
const ProductsCard = ({ products, atualizarCarrinho }) => { // <--- products como prop

    // O estado 'produtos' agora é inicializado com a prop 'products'
    // Não precisamos de um useEffect para buscar dados aqui, pois eles vêm do pai.
    // O useState 'produtos' pode ser mantido se houver outras manipulações locais,
    // mas para renderização, basta usar diretamente a prop 'products'.
    // Removendo o useEffect de fetchProdutos, pois a busca é feita no componente pai.
    // const [produtos, setProdutos] = useState([]); // Este estado não é mais necessário para a lista principal
    // useEffect(() => {
    //     const fetchProdutos = async () => {
    //         const produtosGerados = await gerarProdutos();
    //         console.log(produtosGerados);
    //         setProdutos(produtosGerados || []);
    //     };
    //     fetchProdutos();
    // }, []);

    const addToCart = (produto) => {
        let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
        const existingItem = cart.find((item) => item.id === produto.id);

        if (produto.qtdEstoque <= 0) {
            Swal.fire("Ops!", `"${produto.nome}" está fora de estoque.`, "error");
            return;
        }

        if (existingItem) {
            if (existingItem.quantidade >= produto.qtdEstoque) {
                Swal.fire("Limite de Estoque!", `Você já adicionou a quantidade máxima disponível de "${produto.nome}" ao carrinho.`, "warning");
                return;
            }
            existingItem.quantidade += 1;
        } else {
            cart.push({ ...produto, quantidade: 1 });
        }

        localStorage.setItem("carrinho", JSON.stringify(cart));
        Swal.fire("Adicionado!", `"${produto.nome}" foi adicionado ao carrinho.`, "success");

        // Chama a função passada via prop para atualizar o estado do carrinho no componente Products (pai)
        atualizarCarrinho(cart);
    };

    return (
        // Mantendo a classe CSS original para o container
        <div className={styles['products-cards']}>
            {/* Mapeando diretamente a prop 'products' que vem do componente pai */}
            {products.length > 0 ? (
                products
                    .filter(produto => produto.qtdEstoque > 0) // Mantendo seu filtro original de estoque
                    .map((produto) => (
                        <div key={produto.id} className={styles['product-card']}>
                            <div className={styles['container-product-img']}>
                                <img
                                    src={produto.imagemUrl}
                                    alt={produto.nome}
                                    className={styles['product-image']}
                                />
                            </div>
                            <div className={styles['product-info']}>
                                <div className={styles['name-desc-content']}>
                                    <h2 className={styles['product-name']}>{produto.nome}</h2>
                                    {/* Ajustado para usar a categoria do produto, se desejar */}
                                    {/* Se 'SL 25W-50' era um subtítulo genérico, pode manter fixo ou remover */}
                                    <p className={styles['product-subtitle']}>{produto.categoria}</p>
                                </div>
                                <div className={styles['product-price-section']}>
                                    <span className={styles['product-price']}>
                                        R$ {produto.preco ? Number(produto.preco).toFixed(2).replace('.', ',') : "0,00"}
                                    </span>
                                    <span className={styles['product-installment']}>
                                        2x {produto.preco ? (Number(produto.preco) / 2).toFixed(2).replace('.', ',') : "0,00"} sem juros
                                    </span>
                                </div>
                                <button className={styles['buy-button']}>Comprar</button>
                                <button className={styles['addCart-button']} onClick={() => addToCart(produto)}>
                                    <span className={styles['cart-icon']}>🛒</span> Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    ))
            ) : (
                // Mensagem quando não há produtos na categoria atual ou quando estão carregando
                <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Nenhum produto encontrado para esta categoria.</p>
            )}
        </div>
    );
};

export default ProductsCard;