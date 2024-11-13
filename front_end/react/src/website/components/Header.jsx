import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const scrollToSection = (sectionId) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { sectionId } });
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className="header">
            <img src="../src/assets/lotus-icon.png" alt="" onClick={() => handleNavigation("/")} />
            <nav className="nav-bar">
                <a href="#" onClick={() => scrollToSection("home")}>Principal</a>
                <a href="#" onClick={() => scrollToSection("services")}>Serviços</a>
                <a href="#" onClick={() => scrollToSection("about")}>Sobre</a>
                <a href="#" onClick={() => scrollToSection("contact")}>Contato</a>

                <hr />

                <a onClick={() => handleNavigation("/cadastro")}>Cadastrar</a>
                <a className="login-btn" onClick={() => handleNavigation("/login")}>Login</a>
            </nav>
        </header>
    );
}

export default Header;
