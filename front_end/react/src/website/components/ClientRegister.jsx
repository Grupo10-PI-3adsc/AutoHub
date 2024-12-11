import React, { useState, useCallback } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_CLOUD_API_URL;

function ClientRegister({ setMostrarCadastro }) {
    const [clientData, setClientData] = useState({
        nome: '',
        email: '',
        cpfCnpj: '',
        telefone: '',
        password: ''
    });

    // Função para atualizar os valores do formulário
    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    // Função para adicionar um novo cliente
    const handleAddClient = async (event) => {
        event.preventDefault();
        console.log('Cadastrando cliente:', clientData);
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, clientData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Cliente cadastrado:", response.data);
            setMostrarCadastro(false);
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
        }
    };

    // aqui abre o modal de cadastro de um novop cliente
    const handleRemoverCad = useCallback(() => {
        setMostrarCadastro(false);
    }, [setMostrarCadastro]);

    return (
        <div className="modal">
            <div className="modal-cadastrar-clientes">
                <h1>Cadastro de Cliente</h1>
                <form onSubmit={handleAddClient}>
                    <div className="modal-inputs">
                        {['nome', 'email', 'cpfCnpj', 'telefone', 'password'].map((field) => (
                            <FormField
                                key={field}
                                field={field}
                                value={clientData[field]}
                                onChange={handleInputChange}
                            />
                        ))}
                    </div>
                    <div className="modal-buttons">
                        <button type="button" className="btn-modal cancelar" onClick={handleRemoverCad}>Cancelar</button>
                        <button type="submit" className="btn-modal cadastrar">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const FormField = ({ field, value, onChange }) => (
    <div className="modal-input-field">
        <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
        <input
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

export default ClientRegister;
