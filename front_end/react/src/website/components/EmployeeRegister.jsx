import ProductHeader from "./ProductHeader";
import SideBar from "./SideBar";
import React, { useState, useCallback } from 'react';

function EmployeeRegister({ setMostrarCadastro }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Selecione uma opção");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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
                <div className="modal-container employee register">
                    <h1>Cadastro de Funcionário</h1>
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
                            <input type="text" />
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
                        <button className="btn-modal cancelar" onClick={handleRemoverCad}>Cancelar</button>
                        <button className="btn-modal cadastrar">Cadastrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeRegister;