import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;

function UpdateFuncionario({ employee, setMostrarUpdate, onEmployeeUpdated }) {
    
    const [formData, setFormData] = useState({
        nome: '', email: '', cpfCnpj: '', telefone: '',
        endereco: { cep: '', bairro: '', localidade: '', uf: '' }
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Selecione uma opção");
    const employeeId = employee?.id;

    useEffect(() => {
        if (employee) {
            setFormData({
                nome: employee.nome || '',
                email: employee.email || '',
                cpfCnpj: employee.cpfCnpj || '',
                telefone: employee.telefone || '',
                endereco: employee.fkEndereco || { cep: '', bairro: '', localidade: '', uf: '' }
            });
            setSelectedOption(employee.role || "Selecione uma opção");
        }
    }, [employee]);
    
    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleEnderecoChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            endereco: { ...prev.endereco, [name]: value }
        }));
    }, []);

    const handleCepBlur = async (event) => {
        const cep = event.target.value.replace(/\D/g, '');
        if (cep.length !== 8) return;

        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (!data.erro) {
                setFormData((prev) => ({
                    ...prev,
                    endereco: { ...prev.endereco, cep: data.cep, bairro: data.bairro, localidade: data.localidade, uf: data.uf }
                }));
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const finalData = { ...formData, role: selectedOption };

        try {
            const response = await axios.put(`${apiUrl}/api/usuarios/${employeeId}`, finalData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            Swal.fire('Sucesso', 'O Funcionário foi atualizado com sucesso!', 'success');
            onEmployeeUpdated(response.data);
        } catch (err) {
            console.error('Erro ao atualizar Funcionário:', err);
            Swal.fire('Erro', 'Erro ao atualizar o Funcionário!', 'error');
        }
    };

    const handleCancel = () => setMostrarUpdate(false);

    const overlayStyles = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
    const contentStyles = { backgroundColor: '#2c2f33', color: '#FFFFFF', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' };
    const formGridStyles = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' };

    return (
        <div style={overlayStyles}>
            <div style={contentStyles}>
                <h1 style={{ textAlign: 'center', color: '#f7b731' }}>Atualização de Funcionário</h1>
                <form onSubmit={handleFormSubmit}>
                    <div style={formGridStyles}>
                        <div>
                            <h3 style={{color: '#f7b731', marginTop: 0}}>Dados Pessoais</h3>
                            <FormField field="nome" value={formData.nome || ''} onChange={handleInputChange}/>
                            <FormField field="email" value={formData.email || ''} onChange={handleInputChange}/>
                            <FormField field="cpfCnpj" value={formData.cpfCnpj || ''} onChange={handleInputChange}/>
                            <FormField field="telefone" value={formData.telefone || ''} onChange={handleInputChange}/>
                        </div>

                        <div>
                            <h3 style={{color: '#f7b731', marginTop: 0}}>Endereço</h3>
                            <div className="modal-input-field">
                                <p>CEP</p>
                                <input type="text" name="cep" value={formData.endereco?.cep || ''} onChange={handleEnderecoChange} onBlur={handleCepBlur} />
                            </div>
                            <div className="modal-input-field">
                                <p>Bairro</p>
                                <input type="text" name="bairro" value={formData.endereco?.bairro || ''} onChange={handleEnderecoChange} />
                            </div>
                            <div className="modal-input-field">
                                <p>Cidade</p>
                                <input type="text" name="localidade" value={formData.endereco?.localidade || ''} onChange={handleEnderecoChange} />
                            </div>
                            <div className="modal-input-field">
                                <p>UF</p>
                                <input type="text" name="uf" value={formData.endereco?.uf || ''} onChange={handleEnderecoChange} maxLength="2" />
                            </div>
                        </div>

                        <div className="modal-input-field" style={{ gridColumn: 'span 2' }}>
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
                    <div className="modal-buttons" style={{ justifyContent: 'center', marginTop: '30px' }}>
                        <button type="button" className="btn-modal cancelar" onClick={handleCancel} style={{background: '#6c757d'}}>Cancelar</button>
                        <button type="submit" className="btn-modal cadastrar" style={{background: '#f7b731', color: '#2c2f33'}}>Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
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
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default UpdateFuncionario;