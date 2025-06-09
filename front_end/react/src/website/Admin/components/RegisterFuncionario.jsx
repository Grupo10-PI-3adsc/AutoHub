import React, { useState, useCallback } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;

function RegisterFuncionario({ setMostrarCadastro }) {

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

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleAddEmp = async (event) => {
        event.preventDefault();

        if (selectedOption === "Selecione uma opção") {
            Swal.fire('Atenção!', 'Por favor, selecione um Tipo de Acesso.', 'warning');
            return;
        }

        const finalData = { ...clientData, role: selectedOption };

        try {
            const response = await axios.post(`${apiUrl}/api/auth/register`, finalData, {
                headers: { 'Content-Type': 'application/json' },
            });

            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Funcionário cadastrado com sucesso.',
            });
            setMostrarCadastro(false);

        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Não foi possível cadastrar o funcionário. Verifique os dados e tente novamente.',
            });
        }
    };

    const handleRemoverCad = useCallback(() => {
        setMostrarCadastro(false);
    }, [setMostrarCadastro]);

    const overlayStyles = { 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', 
        justifyContent: 'center', alignItems: 'center', zIndex: 1000 
    };
    
    const contentStyles = { 
        backgroundColor: '#2c2f33', color: '#FFFFFF', padding: '30px', 
        borderRadius: '12px', width: '90%', maxWidth: '600px', 
        maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 5px 20px rgba(0,0,0,0.25)'
    };

    return (
        <div style={overlayStyles}>
            <div style={contentStyles}>
                <h1 style={{ textAlign: 'center', color: '#f7b731' }}>Cadastro de Funcionário</h1>
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
                    <div className="modal-buttons" style={{ justifyContent: 'center' }}>
                        <button type="button" className="btn-modal cancelar" onClick={handleRemoverCad} style={{background: '#6c757d'}}>Cancelar</button>
                        <button type="submit" className="btn-modal cadastrar" style={{background: '#f7b731', color: '#2c2f33'}}>Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const FormField = ({ field, value, onChange }) => {
    const formatFieldName = (fieldName) => {
        if (fieldName === 'cpfCnpj') return 'CPF/CNPJ';
        return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    };

    return (
        <div className="modal-input-field">
            <p>{formatFieldName(field)}</p>
            <input
                type={field === 'password' ? 'password' : (field === 'email' ? 'email' : 'text')}
                name={field}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default RegisterFuncionario;