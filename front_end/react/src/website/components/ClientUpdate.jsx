import { useState } from "react";
import axios from "axios";

function ClientRegister({ setMostrarUpdate }) {
    const apiUrl = process.env.VITE_CLOUD_API_URL;

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
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/clientes/${formData.id}`, formData);
            console.log('Cliente atualizado:', response.data);
            setMostrarUpdate(false);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'O Cliente foi atualizado com sucesso!',
            });
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
            <div className="modal-container-update client update">
                <h1>Editar Cliente</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="modal-inputs">
                        {/* reduzi a criação de campos de input para apenas os campos que serão editados, sem criar
                        inumeros campos de input para cada campo do cliente */}
                        {['id', 'nome', 'email', 'cpfCnpj', 'role', 'telefone', 'enderecoId'].map((field) => (
                            <div className="modal-input-field" key={field}>
                                <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                                <input
                                    type="text"
                                    required
                                    value={formData[field]}
                                    onChange={(e) => handleFormEdit(e, field)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="modal-buttons-update">
                        <button type="button" className="btn-modal cancelar" onClick={handleCancel}>Cancelar</button>
                        <button type="submit" className="btn-modal cadastrar">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ClientUpdate;
