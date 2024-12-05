import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImagemLotusIcon from "../../assets/lotus-icon.png"

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
            <img src={ImagemLotusIcon} alt="" onClick={() => handleNavigation("/")} />
            <nav className="nav-bar">
                <a href="#" onClick={() => scrollToSection("home")}>Principal</a>
                <a href="#" onClick={() => scrollToSection("services")}>Serviços</a>
                <a href="#" onClick={() => scrollToSection("about")}>Sobre</a>
                <a href="#" onClick={() => scrollToSection("contact")}>Contato</a>

                <hr />

                <a onClick={() => handleNavigation("/cadastro")} className='pointer'>Cadastrar</a>
                <a className="login-btn" onClick={() => handleNavigation("/login")}>Login</a>
            </nav>
        </header>
    );
}

export default Header;
