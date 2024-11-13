import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Info from "../Info/Info";
import Services from "../Services/Services";
import AboutUs from "../About/About";
import Contact from "../Contact/Contact";

function Home() {

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
    <>
      <Header />
      <div className="home">
        <div className="home-text">
          <h1>Conectando você ao seu autocenter favorito!</h1>
          <p>
            De troca de óleos a reparos e customizações, agende e confirme tudo
            no conforto da sua casa.
          </p>
          <a onClick={() => scrollToSection("services")}>Veja os serviços</a>
        </div>
        <img src="../src/assets/home.png" alt="" />
      </div>

      <div id="info"><Info /></div>
      <div id="services"><Services /></div>
      <div id="about"><AboutUs /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </>
  );
}

export default Home;
