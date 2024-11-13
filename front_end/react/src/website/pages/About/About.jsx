function AboutUs() {
    return (
        <>
            <div className="about-us">
                <h1>Por que nós?</h1>
                <p>Nossa equipe altamente qualificada compartilha de um amor pela mecânica e por compromissos de qualidade</p>

                <div className="about-us-container">
                    <img src="../src/assets/about-us.png" alt="" />

                    <div className="about-us-info">
                        <div className="about-us-topic">
                            <span><img src="" alt="" /></span>
                            <div className="topic-text">
                                <h2>Parceria com o cliente</h2>
                                <p>A relação com nossos clientes vai além do conserto de carros; é uma parceria baseada na confiança mútua.</p>
                            </div>
                        </div>
                        <div className="about-us-topic">
                            <span><img src="" alt="" /></span>
                            <div className="topic-text">
                                <h2>Serviço Garantido</h2>
                                <p>Juntos, trabalhamos incansavelmente para diagnosticar e resolver problemas mecânicos, utilizando as últimas tecnologias e técnicas aprimoradas.</p>
                            </div>
                        </div>
                        <div className="about-us-topic">
                            <span><img src="" alt="" /></span>
                            <div className="topic-text">
                                <h2>Aprendizado e Crescimento</h2>
                                <p>Além dos serviços de reparo, contribuímos para a comunidade automotiva por meio de workshops educativos, dicas de manutenção preventiva e compartilhamento de conhecimento.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;