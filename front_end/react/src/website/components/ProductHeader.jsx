import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CarrinhoDeCompras from '../pages/CarrinhoDeCompras/CarrinhoDeCompras.jsx';
import styles from '../pages/CarrinhoDeCompras/ProductHeader.module.css';
import { IoIosArrowDown } from "react-icons/io";
import ImagemPlaceHolder from "../../assets/placeholder.png";

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

const ProductHeader = ({ carrinho = [], setCarrinho }) => { // Garantir que carrinho seja um array
    const [horaAtual, setHoraAtual] = useState(obterHoraAtual());
    const dataAtual = obterDataAtual();
    const [mostrarCarrinhoCompleto, setMostrarCarrinhoCompleto] = useState(false);
    const carrinhoRef = useRef(null);
    const cartIconRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
                <div className="product-header-perfil" onClick={toggleDropdown}>
                    <div className="product-header-perfil-header">
                        <img src={ImagemPlaceHolder} alt="" />
                        <div className="product-header-perfil-header-text">
                            <p>{localStorage.getItem('nome')}</p> <span className={`arrow ${isOpen ? 'open' : ''}`}><IoIosArrowDown /></span>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="product-header-perfil-dropdown">
                            {/* Conteúdo do dropdown */}
                        </div>
                    )}
                </div>
                <div className={styles.cartIconContainer}>
                    <div ref={cartIconRef} className={styles.cartIconWrapper} onClick={toggleCarrinho}>
                        <FaShoppingCart className={styles.cartIcon} />
                    </div>
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
};

export default ProductHeader;