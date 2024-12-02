import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CarrinhoDeCompras from '../pages/CarrinhoDeCompras/CarrinhoDeCompras.jsx';
import styles from '../pages/CarrinhoDeCompras/ProductHeader.module.css';

function obterDataAtual() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function obterHoraAtual() {
    const agora = new Date();
    return agora.toLocaleTimeString();
}

function ProductHeader({ carrinho, setCarrinho }) {
    const [horaAtual, setHoraAtual] = useState(obterHoraAtual());
    const dataAtual = obterDataAtual();
    const [mostrarCarrinhoCompleto, setMostrarCarrinhoCompleto] = useState(false);
    const carrinhoRef = useRef(null);
    const cartIconRef = useRef(null);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setHoraAtual(obterHoraAtual());
        }, 1000);
        return () => clearInterval(intervalo);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            
            if (
                carrinhoRef.current &&
                !carrinhoRef.current.contains(event.target) &&
                cartIconRef.current &&
                !cartIconRef.current.contains(event.target)
            ) {
                setMostrarCarrinhoCompleto(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [carrinhoRef, cartIconRef]);

    const toggleCarrinho = () => {
        setMostrarCarrinhoCompleto((prevState) => !prevState);
    };

    return (
        <>
            <header className='product-header'>
                <div className="product-header-time">
                    <p>{horaAtual}</p>
                    <p>{dataAtual}</p>
                </div>
                <div className="product-header-perfil">
                    <img src="../src/assets/placeholder.png" alt="" />
                    <p>Super_admin</p>
                </div>
                <div className={styles.cartIconContainer}>
                    <FaShoppingCart ref={cartIconRef} className={styles.cartIcon} onClick={toggleCarrinho} />
                    <span className={styles.cartCount}>{carrinho.length}</span>
                </div>
            </header>
            {mostrarCarrinhoCompleto && (
                <div ref={carrinhoRef}>
                    <CarrinhoDeCompras carrinho={carrinho} setCarrinho={setCarrinho} />
                </div>
            )}
        </>
    );
}

export default ProductHeader;