import ProductHeader from "../../components/ProductHeader";
import SideBar from "../../components/SideBar";

function Products() {
    return (
        <>
            <ProductHeader />
            <div className="products">
                <SideBar />
                <div className="products-container">
                    <h1>Produtos</h1>
                    <div className="products-banner">
                        <h1>Cuide do seu carro como ele merece – produtos essenciais para realçar cada detalhe!</h1>
                    </div>

                    <div className="products-selector">
                        <img src='../src/assets/seta-esquerda.png' alt="" />
                        <h2>Óleo</h2>
                        <img src='../src/assets/seta-direita.png' alt="" />
                    </div>

                    <div className="products-cards">
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                        <img src='../src/assets/produto.png' alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products;