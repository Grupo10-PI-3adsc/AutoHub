import ProductHeader from "../../components/ProductHeader";
import React, { useState } from 'react';


function Product() {
    const [activeTab, setActiveTab] = useState("Descrição");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <ProductHeader />
            <div className="product">
                <div className="product-cards">

                    <img src='../src/assets/produto_unico.png' alt="" />
                    <div className="product-info">
                        <h1>Titulo do Produto</h1>
                        <h2>Preço do produto</h2>
                        <h2>Quantidade</h2>
                        <button className="auth-btn">Comprar</button>
                        <div className="product-frete-simulator">
                            <h3>Simulação de Frete</h3>
                            <span>
                                <input type="number" placeholder="0000-000" className="inpt_cep" name="inpt_cep_simu" id="inpt_cep_simu" />
                                <button className="auth-btn">Simular</button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="product-description">
                    <div className="product-description-header">
                        <div className={`tab product-description-opt 
                            ${activeTab === "Descrição" ? "activeTab" : ""}`} 
                            onClick={() => handleTabClick("Descrição")}>
                                <h3>
                                    Descrição
                                </h3>
                        </div>
                        
                        <div className={`tab product-description-opt 
                            ${activeTab === "Informação adicional" ? "activeTab" : ""}`}
                            onClick={() => handleTabClick("Informação adicional")}>
                                <h3>
                                    Informação adicional
                                </h3>
                        </div>

                        <div className={`tab product-description-opt ${activeTab === "Avaliações" ? "activeTab" : ""}`}
                            onClick={() => handleTabClick("Avaliações")}>
                                <h3>
                                    Avalições
                                </h3>
                        </div>

                    </div>

                    <div className="product-description-info">

                        <h2>Titutlo Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
                        <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum impedit dicta hic. Corrupti ipsam, assumenda dolor cumque, nam voluptatibus ad ipsa delectus numquam reprehenderit officia perferendis quo, officiis qui veniam!.</h4>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;