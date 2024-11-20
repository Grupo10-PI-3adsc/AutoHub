import { useState } from "react";
import axios from "axios";

function ClientRegister({ setMostrarUpdate }) {
    const apiUrl = 'http://localhost:8080/usuarios/';

    const [formatdata, setFormData] = useState({
        id: '',
        nome: '',
        email: '',
        cpfCnpj: '',
        role: '',
        telefone: '',
        enderecoId: ''
    });

    const handleFormEdit = (event, field) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: event.target.value,
        }));
    };

    const handleFrom = async (event) => {
        event.preventDefault();
        try {
            // Atualiza os dados do cliente
            const response = await axios.put(`${apiUrl}${formatdata.id}`, formatdata);
            console.log('Cliente atualizado:', response.data);
            setMostrarUpdate(false); // Fecha o modal após atualização
        } catch (err) {
            console.error('Erro ao atualizar cliente:', err);
        }
    };


    const handleRemoverCad = () => {
        setMostrarUpdate(false);  // Fecha o modal ao clicar em Cancelar
    };

    return (
        <>
            <div className="modal2">
                <div className="modal-container-update client update">
                    <h1>Editar Cliente</h1>
                    <div className="modal-inputs">
                        <div className="modal-input-field">
                            <p>ID</p>
                            <input
                                type="text"
                                required
                                value={formatdata.id}
                                onChange={(e) => handleFormEdit(e, 'id')}
                            />
                        </div>
                        <div className="modal-input-field">
                            <p>Nome</p>
                            <input
                                type="text"
                                required
                                value={formatdata.nome}
                                onChange={(e) => handleFormEdit(e, 'nome')}
                            />
                        </div>
                        <div className="modal-input-field">
                            <p>E-mail</p>
                            <input
                                type="text"
                                required
                                value={formatdata.email}
                                onChange={(e) => handleFormEdit(e, 'email')}
                            />
                        </div>
                        <div className="modal-input-field">
                            <p>CPF/CNPJ</p>
                            <input
                                type="text"
                                required
                                value={formatdata.cpfCnpj}
                                onChange={(e) => handleFormEdit(e, 'cpfCnpj')}
                            />
                        </div>
                        <div className="modal-input-field">
                            <p>Papel</p>
                            <input
                                type="text"
                                required
                                value={formatdata.role}
                                onChange={(e) => handleFormEdit(e, 'role')}
                            />
                        </div>
                        <div className="modal-input-field">
                            <p>Telefone</p>
                            <input
                                type="text"
                                required
                                value={formatdata.telefone}
                                onChange={(e) => handleFormEdit(e, 'telefone')}
                            />
                        </div>
                        <div className="modal-input-field">
                            <p>Endereço</p>
                            <input
                                type="text"
                                required
                                value={formatdata.enderecoId}
                                onChange={(e) => handleFormEdit(e, 'enderecoId')}
                            />
                        </div>
                    </div>
                    <div className="modal-buttons-update">
                        <button className="btn-modal cancelar" onClick={handleRemoverCad}>Cancelar</button>
                        <button className="btn-modal cadastrar" onClick={handleFrom}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientRegister;
