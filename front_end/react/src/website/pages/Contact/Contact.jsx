import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send("ID-SERVICE","ID-TEMPLATE", {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                },
                'PUBLIC-ID-USER'

                //precisa alterar os ids acima da parada aqui em cima prq funcionar
            )
            .then(
                (response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Mensagem enviada com sucesso!',
                        text: 'Entraremos em contato em breve.',
                    });
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                    });
                },
                (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao enviar mensagem',
                        text: 'Por Favor, Tente novamente mais tarde.',
                    });
                }
            );
    };

    return (
        <div className="contact">
            <h1>Contato</h1>
            <div className="contact-container">
            <div className="contact-gps">
                    <iframe
                        className="maps"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.5313644132384!2d-46.859994223918875!3d-23.40516495587386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf1d7e5c177c43%3A0x64fb34fbccfe9663!2sLotus%20Centro%20Automotivo%20Cajamar!5e0!3m2!1spt-BR!2sbr!4v1710804435486!5m2!1spt-BR!2sbr"
                        width="600"
                        height="450"
                        loading="lazy"
                        title="Google Maps"
                    ></iframe>
                </div>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="contact-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="contact-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="phone">Telefone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="contact-input"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <label htmlFor="subject">Assunto</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="contact-input"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="message">Mensagem</label>
                <textarea
                    id="message"
                    name="message"
                    className="contact-input message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="button-submit pointer">Enviar</button>
            </form>
        </div>
        </div>
    );
}

export default Contact;
