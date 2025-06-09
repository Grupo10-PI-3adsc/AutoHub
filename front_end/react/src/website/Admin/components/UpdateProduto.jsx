import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateProduto({ produto, setMostrarUpdate, onProdutoAtualizado }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({});

  // Estilos para o fundo (overlay)
  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  // Estilos para a caixa de conteúdo do modal
  const contentStyles = {
    backgroundColor: '#2c2f33',
    color: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.25)',
  };


  useEffect(() => {
    if (produto) {
      setFormData({
        id: produto.id || '',
        nome: produto.nome || '',
        descricao: produto.descricao || '',
        categoria: produto.categoria || '',
        qtdEstoque: produto.qtdEstoque || '',
        preco: produto.preco || '',
        fornecedor: produto.fornecedor || '',
        localizacao: produto.localizacao || '',
        codBarra: produto.codBarra || '',
        imagemUrl: produto.imagemUrl || ''
      });
    }
  }, [produto]);

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
      const response = await axios.put(`${apiUrl}/api/produtos/${formData.id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'O Produto foi atualizado com sucesso!',
      });
      
      onProdutoAtualizado(response.data);

    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao atualizar o produto!',
      });
    }
  };

  const handleCancel = () => {
    setMostrarUpdate(false);
  };

  return (
    <div style={overlayStyles}>
      <div style={contentStyles}>
        {/* O conteúdo do seu modal continua o mesmo */}
        <h1>Editar Produto</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="modal-inputs">
            <div className="modal-input-field">
              <p>ID</p>
              <input type="text" value={formData.id} readOnly disabled />
            </div>
            {['nome', 'descricao', 'categoria', 'qtdEstoque', 'preco', 'fornecedor', 'localizacao', 'codBarra', 'imagemUrl'].map((field) => (
              <div className="modal-input-field" key={field}>
                <p>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</p>
                <input
                  type={field === 'qtdEstoque' || field === 'preco' ? 'number' : 'text'}
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

export default UpdateProduto;