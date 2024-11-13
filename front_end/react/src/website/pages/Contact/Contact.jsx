function Contact() {
    return (
        <>
            <div className="contact">
                <h1>Contato</h1>
                <div className="contact-container">
                    <div className="contact-gps">

                    </div>
                    <div className="contact-form">
                        <label htmlFor="contactInput">Nome</label>
                        <input type="text" id="contactInput" className="contact-input" />
                        <label htmlFor="contactInput">E-mail</label>
                        <input type="text" id="contactInput" className="contact-input" />
                        <label htmlFor="contactInput">Telefone</label>
                        <input type="text" id="contactInput" className="contact-input" />
                        <label htmlFor="contactInput">Assunto</label>
                        <input type="text" id="contactInput" className="contact-input" />
                        <label htmlFor="contactInput">Mensagem</label>
                        <input type="text" id="contactInput" className="contact-input message" />
                        <button className="button-submit">Enviar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;