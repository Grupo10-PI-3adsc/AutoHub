import React, { useState } from 'react';
import Login from '../Login/Login';
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function RecuperarSenha(){
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate("/login");
    };

    // Ajuste para sumir a label do input quando o campo estiver preenchido
    const [showEmailLabel, setShowEmailLabel] = useState(true);
    const [email, setEmail] = useState("");

    return (
        <>
        <Header/>
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-contents">
                    <div className="auth-titles">
                        <h1>Recupere sua senha!</h1>
                        <p>Lembrou da senha? <a href="#" onClick={handleRegisterClick}>Faça login!</a></p>
                    </div>
                    <div className="auth-inputs">
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
                    </div>
                    <button className="auth-btn">Recuperar</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default RecuperarSenha;