import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

const Table = () => {
    const dados = [
        { Nome: 'Alice', Email: 'alice@example.com', Contato: '(11) 99999-0001' },
        { Nome: 'Bob', Email: 'bob@example.com', Contato: '(21) 98888-0002' },
        { Nome: 'Carlos', Email: 'carlos@example.com', Contato: '(31) 97777-0003' },
        { Nome: 'Diana', Email: 'diana@example.com', Contato: '(41) 96666-0004' },
        { Nome: 'Eduardo', Email: 'eduardo@example.com', Contato: '(51) 95555-0005' },
    ];

    return (
        <div className="table-container">
            <div className="table-header">
                <div className="table-column">Nome</div>
                <div className="table-column">Email</div>
                <div className="table-column">Contato</div>
                <div className="table-actions-header"></div>
            </div>

            {dados.map((tupla, index) => (
                <div key={index} className="table-row">
                    <div className="table-column">{tupla.Nome}</div>
                    <div className="table-column">{tupla.Email}</div>
                    <div className="table-column">{tupla.Contato}</div>
                    <div className="table-actions">
                        <FaTrash />
                        <FaPencilAlt />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Table;
