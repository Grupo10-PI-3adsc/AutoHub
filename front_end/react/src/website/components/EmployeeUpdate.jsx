import ProductHeader from "./ProductHeader";
import SideBar from "./SideBar";
import React, { useState, useCallback } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

function EmployeeUpdate({setMostrarUpdate}) {
    const apiUrl = import.meta.env.VITE_CLOUD_API_URL;

    const [clientData, setClientData] = useState({
        id: '',
        nome: '',
        email: '',
        cpfCnpj: '',
        telefone: '',
        role: '',
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Selecione uma opção");

    const handleFormEdit = (event, field) => {
        const { value } = event.target;
        setClientData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleFormSubmit = async (event) => {
        clientData['role'] = selectedOption
        console.log(clientData)
        event.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/usuarios/${clientData.id}`, clientData);
            console.log('Funcionário atualizado:', response.data);
            console.log(response)
            setMostrarUpdate(false);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'O Funcionário foi atualizado com sucesso!',
            });
        } catch (err) {
            console.error('Erro ao atualizar Funcionário:', err);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao atualizar o Funcionário!',
            });
        }
    };

    const handleCancel = () => {
        setMostrarUpdate(false);  
    };
    return (
        <>
            <div className="modal2">
                <div className="modal-cadastrar-clientes">
                    <h1>Atualização de Funcionário</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="modal-inputs">
                            {['id', 'nome', 'email', 'cpfCnpj', 'telefone'].map((field) => (
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
                            <button type="button" className="btn-modal cancelar" onClick={handleCancel}>Cancelar</button>
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

export default EmployeeUpdate;