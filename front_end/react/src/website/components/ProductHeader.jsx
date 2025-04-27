import React, { useState, useEffect } from 'react';

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
                <div className="product-header-perfil">
                    <img src="../src/assets/placeholder.png" alt="" />
                    <p>Super_admin</p>
                </div>
            </header>
        </>
    )
}

export default ProductHeader;