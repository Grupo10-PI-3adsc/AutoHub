import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";

function Perfil() {
    return (
        <>
            <ProductHeader />
            <div className="perfil">
                <SideBar />
                <div className="perfil-container">
                    <h1>Perfil</h1>
                    <div className="perfil-info-card">
                        <div className="perfil-title">
                            <h3>Super Admin</h3>
                            <p>superadmin@gmail.com</p>
                        </div>

                        <div className="perfil-info">
                            <div className="perfil-info-1">
                                <div className="perfil-info-text">
                                    <h4>Nome</h4>
                                    <p>Alfredin</p>
                                </div>
                                <div className="perfil-info-text">
                                    <h4>Email</h4>
                                    <p>alfredin@gmail.com</p>
                                </div>
                                <div className="perfil-info-text">
                                    <h4>Telefone</h4>
                                    <p>(11) 982266295</p>
                                </div>
                                <div className="perfil-info-text">
                                    <h4>CPF</h4>
                                    <p>987.654.321-10</p>
                                </div>
                            </div>
                            <div className="perfil-info-2">
                                <div className="perfil-info-text">
                                    <h4>Cidade</h4>
                                    <p>São Paulo</p>
                                </div>
                                <div className="perfil-info-text">
                                    <h4>Estado</h4>
                                    <p>SP</p>
                                </div>
                                <div className="perfil-info-text">
                                    <h4>Bairro</h4>
                                    <p>Cocoricos Felizes</p>
                                </div>
                                <div className="perfil-info-text">
                                    <h4>CEP</h4>
                                    <p>099304-09</p>
                                </div>
                            </div>
                        </div>

                        <button className="perfil-salvar">Salvar Alterações</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Perfil;