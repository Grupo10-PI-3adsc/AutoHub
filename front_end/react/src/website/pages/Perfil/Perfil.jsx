import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";
import { useState } from 'react';
import axios from 'axios'; // Import axios
import Swal from 'sweetalert2'; // Import SweetAlert2

// Assuming apiUrl is defined somewhere accessible,
// like in a config file or directly using import.meta.env
// For this example, let's assume it's like this:
const apiUrl = import.meta.env.VITE_API_URL; // Or wherever your API URL comes from

function Perfil() {
    const [nome, setNome] = useState(localStorage.getItem('nome') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [telefone, setTelefone] = useState(localStorage.getItem('telefone') || '');
    const [cpfCnpj, setCpfCnpj] = useState(localStorage.getItem('cpfCnpj') || '');
    const [localidade, setLocalidade] = useState(localStorage.getItem('localidade') || '');
    const [uf, setUf] = useState(localStorage.getItem('uf') || '');
    const [bairro, setBairro] = useState(localStorage.getItem('bairro') || '');
    const [cep, setCep] = useState(localStorage.getItem('cep') || '');
    const [idEndereco, setIdEndereco] = useState(parseInt(localStorage.getItem('idEndereco')) || 0);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditChanges = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {

        const data = {
            nome,
            cpfCnpj,
            telefone,
            email,
            endereco:{
                id: idEndereco,
                localidade,
                uf,
                bairro,
                cep
            }
        };

        try {
            const userId = localStorage.getItem('id');
            const response = await axios.put(`${apiUrl}/api/usuarios/${userId}`, data);

            const { nome, email, cpfCnpj, telefone, id, role } = response.data;

            const endereco = response.data.endereco;

            if (id) {
                localStorage.setItem("nome", nome);
                localStorage.setItem("id", id);
                localStorage.setItem("email", email);
                localStorage.setItem("cpfCnpj", cpfCnpj);
                localStorage.setItem("role", role);
                localStorage.setItem("telefone", telefone);

                if (endereco) {
                    localStorage.setItem("idEndereco", endereco.id);
                    localStorage.setItem("cep", endereco.cep);
                    localStorage.setItem("bairro", endereco.bairro);
                    localStorage.setItem("localidade", endereco.localidade);
                    localStorage.setItem("uf", endereco.uf);
                } else {
                    localStorage.setItem("idEndereco", 0);
                    localStorage.setItem("cep", "");
                    localStorage.setItem("bairro", "");
                    localStorage.setItem("localidade", "");
                    localStorage.setItem("uf", "");
                }
            }
            Swal.fire({
                icon: "success",
                title: "Dados atualizados com sucesso!",
                text: "Agora você pode visualizar seus novos dados",
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                window.location.reload();
            });

            setIsEditing(false); 

        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                (error.request
                    ? "O servidor não respondeu. Por favor, tente novamente."
                    : "Ocorreu um erro inesperado. Por favor, tente novamente.");

            Swal.fire({
                icon: "error",
                title: "Erro na atualização",
                text: errorMessage,
                showConfirmButton: true,
            });

            console.error("Erro ao enviar dados:", error);
        }
    };

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
                                    <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} disabled={!isEditing} />
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

                            <button className="perfil-salvar" onClick={handleEditChanges} disabled={isEditing} >
                                Editar Alterações
                            </button>

                            <button className="perfil-salvar" onClick={handleSaveChanges} disabled={!isEditing} >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Perfil;