import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from "../../components/Header";
import axios from "axios";

const apiUrl = import.meta.env.VITE_CLOUD_API_URL;
console.log(`${apiUrl}/auth/login`)

function Login() {
    const navigate = useNavigate();

    const handleRegisterClick = (path) => {
        navigate(path);
    };

    const [showEmailLabel, setShowEmailLabel] = useState(true);
    const [showPasswordLabel, setShowPasswordLabel] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, password };
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, data, {
               headers: {
                "Content-Type": "application/json"
                }
                });


            const { token, nome } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("nome", nome)
                localStorage.setItem("email", response.data['email'])
                Swal.fire({
                    icon: 'success',
                    title: `Login realizado com sucesso, ${nome}!`,
                    text: 'Seja bem-vindo!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    navigate("/produtos");
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Token não recebido',
                    text: 'Ocorreu um problema ao realizar o login'
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Falha no login',
                    text: 'Credenciais inválidas'
                });
            } else {
                console.error("Erro ao enviar dados:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao enviar dados. Tente novamente mais tarde.'
                });
            }
        }
    };

    return (
        <>
        <Header/>
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-contents">
                    <div className="auth-titles">
                        <h1>Entre na sua conta<a>!</a></h1>
                        <p>Não tem conta? <a href="#" onClick={() => handleRegisterClick("/cadastro")}>Cadastre-se!</a></p>
                    </div>
                    <form onSubmit={handleSubmit} className="auth-inputs">
                        <div className="input-container">
                            {showEmailLabel && <label htmlFor="email">E-mail</label>}
                            <input 
                                type="text" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                onFocus={() => setShowEmailLabel(false)} 
                                onBlur={() => setShowEmailLabel(!email)} 
                            />
                        </div>
                        <div className="input-container">
                            {showPasswordLabel && <label htmlFor="senha">Password</label>}
                            <input 
                                type="password" 
                                id="senha" 
                                value={password} 
                                onChange={(e) => setSenha(e.target.value)} 
                                onFocus={() => setShowPasswordLabel(false)} 
                                onBlur={() => setShowPasswordLabel(!password)} 
                            />
                            <div className="auth-titles">
                                <p>Esqueceu sua senha? <a href="#" onClick={() => handleRegisterClick("/recuperar-senha")}>Recuperar Senha</a></p>
                            </div>
                        </div>
                        <button className="auth-btn" type="submit">Prosseguir</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;
