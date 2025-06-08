import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";
import { useState } from 'react';

function Perfil() {
    const [nome, setNome] = useState(localStorage.getItem('nome') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [telefone, setTelefone] = useState(localStorage.getItem('telefone') || '');
    const [cpfCnpj, setCpfCnpj] = useState(localStorage.getItem('cpfCnpj') || '');
    const [localidade, setLocalidade] = useState(localStorage.getItem('localidade') || '');
    const [uf, setUf] = useState(localStorage.getItem('uf') || '');
    const [bairro, setBairro] = useState(localStorage.getItem('bairro') || '');
    const [cep, setCep] = useState(localStorage.getItem('cep') || '');


    const [isEditing, setIsEditing] = useState(false);

    const handleEditChanges = () => {
        setIsEditing(true); 
    };

    const handleSaveChanges = () => {
        // Here you would typically save the changes to a backend
        // For this example, we'll just update localStorage
        // localStorage.setItem('nome', nome);
        // localStorage.setItem('telefone', telefone);
        // localStorage.setItem('localidade', localidade);
        // localStorage.setItem('uf', uf);
        // localStorage.setItem('bairro', bairro);
        // localStorage.setItem('cep', cep);

        alert('Alterações salvas com sucesso!');
        setIsEditing(false);
    };

    // const handleSubmit = async (e) => {

    //     try {
    //         await axios.post(`${apiUrl}/api/auth/register`, data);
    //         Swal.fire({
    //             icon: "success",
    //             title: "Cadastro realizado com sucesso!",
    //             text: "Agora você pode fazer login! Redirecionando para a página de login...",
    //             showConfirmButton: false,
    //             timer: 2000,
    //         });
    //         navigate("/login");
    //     } catch (error) {
    //         const errorMessage =
    //             error.response?.data?.message ||
    //             (error.request
    //                 ? "O servidor não respondeu. Por favor, tente novamente."
    //                 : "Ocorreu um erro inesperado. Por favor, tente novamente.");

    //         Swal.fire({
    //             icon: "error",
    //             title: "Erro no cadastro",
    //             text: errorMessage,
    //             showConfirmButton: true,
    //         });

    //         console.error("Erro ao enviar dados:", error);
    //     }
    // }
    return (
        <>
            <ProductHeader />
            <div className="perfil">
                <SideBar />
                <div className="perfil-container">
                    <h1>Perfil</h1>
                    <div className="perfil-info-card">
                        <div className="perfil-title">
                            <h3>{nome}</h3>
                            <p>{email}</p>
                        </div>

                        <div className="perfil-info">
                            <div className="perfil-info-1">

                                <div className="perfil-info-text">
                                    <h4>Nome</h4>
                                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} disabled={!isEditing} />
                                </div>

                                <div className="perfil-info-text">
                                    <h4>Email</h4>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={true} />
                                </div>

                                <div className="perfil-info-text">
                                    <h4>Telefone</h4>
                                    <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} disabled={!isEditing} />
                                </div>

                                <div className="perfil-info-text">
                                    <h4>CPF</h4>
                                    <input type="text" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} disabled={true} />
                                </div>

                            </div>
                            <div className="perfil-info-2">

                                <div className="perfil-info-text">
                                    <h4>Cidade</h4>
                                    <input type="text" value={localidade} onChange={(e) => setLocalidade(e.target.value)} disabled={!isEditing} />
                                </div>

                                <div className="perfil-info-text">
                                    <h4>Estado</h4>
                                    <input type="text"  value={uf} onChange={(e) => setUf(e.target.value)} disabled={!isEditing} />
                                </div>

                                <div className="perfil-info-text">
                                    <h4>Bairro</h4>
                                    <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} disabled={!isEditing} />
                                </div>

                                <div className="perfil-info-text">
                                    <h4>CEP</h4>
                                    <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} disabled={!isEditing} />
                                </div>

                            </div>
                        </div>
                        <div className="perfil-salvar-editar">

                            <button className="perfil-salvar" onClick={handleSaveChanges} disabled={!isEditing} >
                                Salvar Alterações
                            </button>

                            <button className="perfil-salvar" onClick={handleEditChanges} disabled={isEditing} >
                                Editar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Perfil;