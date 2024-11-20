import React, { useState } from "react";
import axios from "axios";

function ClientRegister({ setMostrarCadastro }) {

    const [clientData, setClientData] = useState({
        nome: '',
        email: '',
        cpfCnpj: '',
        telefone: '',
        password: ''
    });

    // Função para atualizar os valores do formulário
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Função para adicionar um novo cliente
    const handleAddClient = async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário
        console.log('Cadastrando cliente:', clientData); // Verifica os dados
        try {
            const response = await axios.post('http://localhost:8080/auth/register', clientData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Cliente cadastrado:", response.data);
            setMostrarCadastro(false); // Fecha o modal após cadastro
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
        }
    };

    // Função para cancelar e fechar o modal
    const handleRemoverCad = () => {
        setMostrarCadastro(false);
    };

    return (
        <div className="modal">
            <div className="modal-container client register">
                <h1>Cadastro de Cliente</h1>
                <div className="modal-inputs">
                    <div className="modal-input-field">
                        <p>Nome</p>
                        <input type="text" name="nome" value={clientData.nome} onChange={handleInputChange}/>
                    </div>
                    <div className="modal-input-field">
                        <p>E-mail</p>
                        <input type="text" name="email" value={clientData.email} onChange={handleInputChange}/>
                    </div>
                    <div className="modal-input-field">
                        <p>CPF/CNPJ</p>
                        <input type="text" required name="cpfCnpj" value={clientData.cpfCnpj} onChange={handleInputChange}/>
                    </div>
                    <div className="modal-input-field">
                        <p>Telefone</p>
                        <input type="text" required name="telefone" value={clientData.telefone} onChange={handleInputChange}/>
                    </div>
                    <div className="modal-input-field">
                        <p>Senha</p>
                        <input type="password" required name="password" value={clientData.password} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className="btn-modal cancelar" onClick={handleRemoverCad}>Cancelar</button>
                    <button className="btn-modal cadastrar" onClick={handleAddClient}>Cadastrar</button>
                </div>
            </div>
        </div>
    );
}

export default ClientRegister;
