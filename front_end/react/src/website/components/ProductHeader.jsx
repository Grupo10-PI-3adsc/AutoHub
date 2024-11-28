import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";

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

function ProductHeader() {
    const [horaAtual, setHoraAtual] = useState(obterHoraAtual());
    const dataAtual = obterDataAtual();

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

    return (
        <>
            <header className='product-header'>
                <div className="product-header-time">
                    <p>{horaAtual}</p>
                    <p>{dataAtual}</p>
                </div>
                <div className="product-header-perfil" onClick={toggleDropdown}>
                    <div className="product-header-perfil-header">
                        <img src="../src/assets/placeholder.png" alt="" />
                        <div className="product-header-perfil-header-text">
                            <p>Super_admin</p> <span className={`arrow ${isOpen ? 'open' : ''}`}><IoIosArrowDown /></span>
                        </div>
                    </div>
                    {isOpen && (
                        <ul className="product-header-perfil-expanded">
                            <li><div className="product-header-perfil-info">
                                <h4>Super Admin</h4> <p>superadm@gmail.com</p>
                            </div></li>
                            <li>Meu Perfil</li>
                            <li>Configurações</li>
                            <li>Notificações</li>
                            <li>Sair</li>
                        </ul>
                    )}
                </div>
            </header>
        </>
    )
}

export default ProductHeader;