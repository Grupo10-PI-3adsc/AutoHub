import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Header";

const apiUrl = 'http://localhost:8080';

function Cadastrar() {
    const navigate = useNavigate();
    
    const [nome, setNome] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setSenha] = useState("");
    
    const [showNomeLabel, setShowNomeLabel] = useState(true);
    const [showCpfCnpjLabel, setShowCpfCnpjLabel] = useState(true);
    const [showTelefoneLabel, setShowTelefoneLabel] = useState(true);
    const [showEmailLabel, setShowEmailLabel] = useState(true);
    const [showSenhaLabel, setShowSenhaLabel] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nome,
            email,
            password,
            cpfCnpj,
            telefone
        };

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Cadastro realizado com sucesso!",
                    text: "Agora você pode fazer login! Redirecionando para a página de login...",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate("/login");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Falha no cadastro",
                    text: "Verifique os dados e tente novamente.",
                    showConfirmButton: true
                });
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            Swal.fire({
                icon: "error",
                title: "Erro ao enviar dados",
                text: "Ocorreu um erro inesperado. Por favor, tente novamente.",
                showConfirmButton: true
            });
        }
    };

    return (
        <>
        <Header/>
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-contents">
                    <div className="auth-titles">
                        <h1>Crie uma conta nova!</h1>
                        <p>Já possui conta? <a href="#" onClick={() => navigate("/login")}>Faça Login</a></p>
                    </div>
                    <form className="auth-inputs" onSubmit={handleSubmit}>
                        <div className="auth-inputs-names">
                            <div className="input-container">
                                {showNomeLabel && <label htmlFor="nome">Nome</label>}
                                <input 
                                    type="text" 
                                    id="nome" 
                                    value={nome} 
                                    onChange={(e) => setNome(e.target.value)} 
                                    onFocus={() => setShowNomeLabel(false)} 
                                    onBlur={() => setShowNomeLabel(!nome)} 
                                    required 
                                />
                            </div>
                            <div className="input-container">
                                {showCpfCnpjLabel && <label htmlFor="cpfCnpj">CPF/CNPJ</label>}
                                <input 
                                    type="text" 
                                    id="cpfCnpj" 
                                    value={cpfCnpj} 
                                    onChange={(e) => setCpfCnpj(e.target.value)} 
                                    onFocus={() => setShowCpfCnpjLabel(false)} 
                                    onBlur={() => setShowCpfCnpjLabel(!cpfCnpj)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="input-container">
                            {showTelefoneLabel && <label htmlFor="telefone">Telefone</label>}
                            <input 
                                type="text" 
                                id="telefone" 
                                value={telefone} 
                                onChange={(e) => setTelefone(e.target.value)} 
                                onFocus={() => setShowTelefoneLabel(false)} 
                                onBlur={() => setShowTelefoneLabel(!telefone)} 
                                required 
                            />
                        </div>
                        <div className="input-container">
                            {showEmailLabel && <label htmlFor="email">E-mail</label>}
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                onFocus={() => setShowEmailLabel(false)} 
                                onBlur={() => setShowEmailLabel(!email)} 
                                required 
                            />
                        </div>
                        <div className="input-container">
                            {showSenhaLabel && <label htmlFor="Senha">password</label>}
                            <input 
                                type="text" 
                                id="senha" 
                                value={password} 
                                onChange={(e) => setSenha(e.target.value)} 
                                onFocus={() => setShowSenhaLabel(false)} 
                                onBlur={() => setShowSenhaLabel(!password)} 
                                required 
                            />
                        </div>
                        <button className="auth-btn" type="submit">Prosseguir</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Cadastrar;
