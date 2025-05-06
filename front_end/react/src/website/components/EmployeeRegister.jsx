import ProductHeader from "./ProductHeader";
import SideBar from "./SideBar";
import React, { useState, useCallback } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_CLOUD_API_URL;

function EmployeeRegister({ setMostrarCadastro }) {

    const [clientData, setClientData] = useState({
        nome: '',
        email: '',
        cpfCnpj: '',
        telefone: '',
        password: '',
        role: '',
    });


    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Selecione uma opção");

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleAddEmp = async (event) => {
        clientData['role'] = selectedOption
        alert("entrou")
        event.preventDefault();
        console.log('Cadastrando funcionario:', clientData);
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

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleRemoverCad = useCallback(() => {
        setMostrarCadastro(false);
    }, [setMostrarCadastro]);

    return (
        <>
            <div className="modal">
                <div className="modal-cadastrar-clientes ">
                    <h1>Cadastro de Funcionário</h1>
                    <form onSubmit={handleAddEmp}>
                        <div className="modal-inputs">
                            {['nome', 'email', 'cpfCnpj', 'telefone', 'password'].map((field) => (
                            <FormField
                                key={field}
                                field={field}
                                value={clientData[field]}
                                onChange={handleInputChange}
                                />
                            ))}
                            <div className="modal-input-field">
                                <p>Tipo de Acesso</p>
                                <div className="dropdown">
                                    <div className="dropdown-header" onClick={toggleDropdown}>
                                        {selectedOption}
                                        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
                                    </div>
                                    {isOpen && (
                                        <ul className="dropdown-menu">
                                            <li onClick={() => handleOptionClick("GERENTE")}>Gerente</li>
                                            <li onClick={() => handleOptionClick("FUNC")}>Funcionário</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button type="button" className="btn-modal cancelar" onClick={handleRemoverCad}>Cancelar</button>
                            <button type="submit" className="btn-modal cadastrar">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
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

export default EmployeeRegister;