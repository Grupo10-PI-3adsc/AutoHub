import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;

function UpdateCliente({ client, setMostrarUpdate, onClientUpdated }) {
    
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (client) {
            setFormData({
                id: client.id || '',
                nome: client.nome || '',
                email: client.email || '',
                cpfCnpj: client.cpfCnpj || '',
                telefone: client.telefone || '',
            });
        }
    }, [client]);

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/api/usuarios/${formData.id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'O Cliente foi atualizado com sucesso!',
            });
            onClientUpdated(response.data);

        } catch (err) {
            console.error('Erro ao atualizar cliente:', err);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao atualizar o cliente!',
            });
        }
    };

    const handleCancel = () => {
        setMostrarUpdate(false);
    };

    return (
        <div className="modal2">
            <div className="modal-cadastrar-clientes modal-update">
                <h1>Editar Cliente</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="modal-inputs">
                        <FormField field="id" value={formData.id || ''} readOnly={true} />
                        <FormField field="nome" value={formData.nome || ''} onChange={handleInputChange} />
                        <FormField field="email" value={formData.email || ''} onChange={handleInputChange} />
                        <FormField field="cpfCnpj" value={formData.cpfCnpj || ''} onChange={handleInputChange} />
                        <FormField field="telefone" value={formData.telefone || ''} onChange={handleInputChange} />
                    </div>
                    <div className="modal-buttons-update">
                        <button type="button" className="btn-modal cancelar" onClick={handleCancel}>Cancelar</button>
                        <button type="submit" className="btn-modal cadastrar">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const FormField = ({ field, value, onChange, readOnly = false }) => {
    const formatFieldName = (fieldName) => {
        if (fieldName === 'cpfCnpj') return 'CPF/CNPJ';
        return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    };

    return (
        <div className="modal-input-field">
            <p>{formatFieldName(field)}</p>
            <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={value}
                onChange={onChange}
                required
                readOnly={readOnly}
                disabled={readOnly}
            />
        </div>
    );
};

export default UpdateCliente;