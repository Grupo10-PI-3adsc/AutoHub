import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ClientUpdate({ setMostrarUpdate }) {
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

    const handleFormEdit = (event, field) => {
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleFormSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/usuarios/${formData.id}`, formData);
            console.log('Cliente atualizado:', response.data);
            console.log(response)
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
            <div className="modal-cadastrar-clientes modal-update">
                <h1>Editar</h1>
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
                        <button type="submit" className="btn-modal cadastrar">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ClientUpdate;
