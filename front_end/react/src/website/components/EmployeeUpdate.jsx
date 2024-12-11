import ProductHeader from "./ProductHeader";
import SideBar from "./SideBar";
import React, { useState } from 'react';

function EmployeeUpdate({setMostrarUpdate}) {
    const apiUrl = import.meta.env.VITE_CLOUD_API_URL;

    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        email: '',
        cpfCnpj: '',
        role: '',
        telefone: '',
        enderecoId: ''
    });

    const [selectedOption, setSelectedOption] = useState("Selecione uma opção");

    const handleFormEdit = (event, field) => {
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleFormSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/usuarios/${formData.id}`, formData);
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
            <div className="modal">
                <div className="modal-container employee update">
                    <h1>Atualização de Funcionário</h1>
                    <div className="modal-inputs">
                        <div className="modal-input-field">
                            <p>Nome</p>
                            <input type="text" />
                        </div>
                        <div className="modal-input-field">
                            <p>E-mail</p>
                            <input type="text" />
                        </div>
                        <div className="modal-input-field">
                            <p>Senha</p>
                            <input type="text" disabled />
                        </div>
                        <div className="modal-input-field">
                            <p>Tipo de Acesso</p>
                            <div className="dropdown">
                                <div className="dropdown-header" onClick={toggleDropdown}>
                                    {selectedOption}
                                    <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
                                </div>
                                {isOpen && (
                                    <ul className="dropdown-menu">
                                        <li onClick={() => handleOptionClick("Gerente")}>Gerente</li>
                                        <li onClick={() => handleOptionClick("Funcionário")}>Funcionário</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button type="button" className="btn-modal cancelar" onClick={handleCancel}>Cancelar</button>
                        <button type="submit" className="btn-modal cadastrar">Cadastrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeUpdate;