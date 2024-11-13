import ProductHeader from "./ProductHeader";
import SideBar from "./SideBar";

function ClientRegister() {
    return (
        <>
            <div className="modal">
                <div className="modal-container client register">
                    <h1>Cadastro de Cliente</h1>
                    <div className="modal-inputs">
                        <div className="modal-input-field">
                            <p>Nome</p>
                            <input type="text" />
                        </div>
                        <div className="modal-input-field">
                            <p>E-mail</p>
                            <input type="text" />
                        </div>
                        <div className="modal-input-field">
                            <p>Senha</p>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button className="btn-modal cancelar">Cancelar</button>
                        <button className="btn-modal cadastrar">Cadastrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientRegister;