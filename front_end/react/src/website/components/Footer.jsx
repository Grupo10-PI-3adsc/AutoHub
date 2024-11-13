function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-info">
                    <h1>Sobre nós</h1>
                    <p>Tudo que seu carro merece!</p>
                    <div className="footer-socials">
                        <img src="../src/assets/instagram.png" alt="" />
                        <img src="../src/assets/facebook.png" alt="" />
                    </div>
                    <p>&copy; {new Date().getFullYear()} LOTUS Centro Automotivo 30.070.385/0001.24.</p>
                </div>
                <div className="footer-navigation">
                    <h1>Informações</h1>
                    <p>Principal</p>
                    <p>Sobre nós</p>
                    <p>Serviços</p>
                    <p>Contato</p>
                    <p>Política de Privacidade</p>
                    <p>Termos de Uso</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;