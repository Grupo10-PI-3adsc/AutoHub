import { useState } from 'react';
import { TbCar4Wd, TbCarTurbine, TbShoppingCartDollar } from "react-icons/tb";
import { PiCarBatteryLight, PiTire } from "react-icons/pi";
import { GiMechanicGarage, GiTireIronCross, GiFuelTank, GiGearStick } from "react-icons/gi";
import { MdOutlineTireRepair } from "react-icons/md";



function Services() {

  const [activeService, setActiveService] = useState('alinhamento');

  const handleServiceClick = (service) => {
    setActiveService(service);
  };

  return (
    <>
      <div className="services">
        <div className="services-text">
          <h1>Serviços</h1>
          <p>
            Oferecemos serviços variados para atender a qualquer que seja a sua
            necessidade e a do seu carro.
          </p>
        </div>

        <div className="services-buttons">
          <button className={`btn-service ${activeService === 'alinhamento' ? 'active' : ''}`}
            onClick={() => handleServiceClick('alinhamento')}> <a><TbCar4Wd /></a></button>

          <button className={`btn-service ${activeService === 'balanceamento' ? 'active' : ''}`}
            onClick={() => handleServiceClick('balanceamento')}> <a><PiTire /></a></button>

          <button className={`btn-service ${activeService === 'bateria' ? 'active' : ''}`}
            onClick={() => handleServiceClick('bateria')}><a><PiCarBatteryLight /></a></button>

          <button className={`btn-service ${activeService === 'borracharia' ? 'active' : ''}`}
            onClick={() => handleServiceClick('borracharia')}><a><GiGearStick /></a></button>

          <button className={`btn-service ${activeService === 'embreagem' ? 'active' : ''}`}
            onClick={() => handleServiceClick('embreagem')}><a><GiTireIronCross /></a></button>

          <button className={`btn-service ${activeService === 'freios' ? 'active' : ''}`}
            onClick={() => handleServiceClick('freios')}><a><TbCarTurbine /></a></button>

          <button className={`btn-service ${activeService === 'injecao' ? 'active' : ''}`}
            onClick={() => handleServiceClick('injecao')}><a><GiFuelTank /></a></button>

          <button className={`btn-service ${activeService === 'mecanica' ? 'active' : ''}`}
            onClick={() => handleServiceClick('mecanica')}><a><GiMechanicGarage /></a></button>

          <button className={`btn-service ${activeService === 'suspensao' ? 'active' : ''}`}
            onClick={() => handleServiceClick('suspensao')}><a><MdOutlineTireRepair /></a></button>

          <button className={`btn-service ${activeService === 'venda' ? 'active' : ''}`}
            onClick={() => handleServiceClick('venda')}><a><TbShoppingCartDollar /></a></button>
        </div>

        {activeService === 'alinhamento' && (
          <div className="service alinhamento">
            <div className="service-container">
              <div className="service-info">
                <h1>Alinhamento</h1>
                <p>O alinhamento serve para ajustar os ângulos das rodas, mantendo-as retas em relação ao solo e paralelas entre si. Isso ajuda que o motorista não perca o controle do carro em curvas, por exemplo. Um carro alinhado evita acidentes e garante uma direção muito mais tranquila. Além da segurança, manter o carro alinhado retarda o desgaste irregular dos pneus, aumentando a vida útil deles, influencia diretamente na economia de combustível, pois as rodas ficarão muito mais tempo em atrito com o solo e, por último, previne o deslocamento do veículo com uma dirigibilidade firme e sem surpresas.</p>
              </div>
            </div>
          </div>
        )}

        {activeService === 'balanceamento' && (
          <div className="service balanceamento">
            <div className="service-container">
              <div className="service-info">
                <h1>Balanceamento</h1>
                <p>O balanceamento é feito para corrigir o equilíbrio entre as rodas e os pneus, permitindo que os pneus girem sem causar vibrações. O desbalanceamento é quando uma roda está carregando mais peso do que o lado oposto. Para corrigir essa falha, é colocado um peso de chumbo medido na roda oposta ao que está segurando mais peso, distribuindo o peso total do carro em todas as rodas. A falta de balanceamento gera vibrações podendo comprometer outras peças do conjunto da suspensão do veiculo.</p>
              </div>
            </div>
          </div>
        )}

        {activeService === 'bateria' && (
          <div className="service bateria">
            <div className="service-container">
              <div className="service-info">
                <h1>Bateria</h1>
                <p>Tal como as baterias de um telemóvel, também as baterias dos carros têm um prazo de vida. À medida que vão perdendo capacidades, o seu automóvel vai enviando sinais de que a bateria do carro está fraca.
                  <br /> <br />
                  Luzes com pouca intensidade
                  <br /> <br />
                  Carro demora muito a ligar
                  <br /> <br />
                  Polos oxidados
                  <br /> <br />
                  Baixa voltagem
                  <br /> <br />
                  Problemas com fecho centralizado
                  <br /> <br />
                  A Lotus é Parcereira e Credenciada de principais marcas do mercado como Moura, Pioneiro, Heliar etc.</p>
              </div>
            </div>
          </div>
        )}

        {activeService === 'borracharia' && (
          <div className="service borracharia">
            <div className="service-container">
              <div className="service-info">
                <h1>Borracharia</h1>
                <p>O alinhamento serve para ajustar os ângulos das rodas, mantendo-as retas em relação ao solo e paralelas entre si. Isso ajuda que o motorista não perca o controle do carro em curvas, por exemplo. Um carro alinhado evita acidentes e garante uma direção muito mais tranquila. Além da segurança, manter o carro alinhado retarda o desgaste irregular dos pneus, aumentando a vida útil deles, influencia diretamente na economia de combustível, pois as rodas ficarão muito mais tempo em atrito com o solo e, por último, previne o deslocamento do veículo com uma dirigibilidade firme e sem surpresas.</p>
              </div>
            </div>
          </div>
        )}


        {activeService === 'embreagem' && (
          <div className="service embreagem">
            <div className="service-container">
              <div className="service-info">
                <h1>Embreagem</h1>
                <p>Carro sem força nas subidas? Acelera e ele não desenvolve velocidade? Sua embreagem pode estar chegando ao fim.
                  <br /> <br />
                  Passe na Lotus e faça o diagnóstico.
                  <br /> <br />
                  A Embreagem é responsável por transferir a força do motor para a caixa de câmbio, de maneira que essa força chegue até as rodas do veículo, diminuindo o impacto. Graças a Embreagem, a troca de velocidades da caixa de câmbio é feita suavemente e consequentemente o desgaste entre a caixa de câmbio e o motor é diminuído drasticamente. A Embreagem fica entre o volante do motor e a caixa de câmbio. Ela é composta por três peças principais: o disco, o platô e o rolamento.</p>
              </div>
            </div>
          </div>
        )}

        {activeService === 'freios' && (
          <div className="service freios">
            <div className="service-container">
              <div className="service-info">
                <h1>Freios</h1>
                <p>A Manutenção e Revisão de Freios é de Suma importância para a segurança de motoristas e passageiros. A LOTUS oferece um excelente serviço de revisão completa do sistema de frenagem.
                  <br /> <br />
                  Além disso, também realizamos a troca do fluido do sistema hidráulico e de outros componentes relevantes, como os discos, as lonas e os tambores de freios.
                  <br /> <br />
                  A realização da revisão do sistema de freios deve acontecer a cada 5 mil quilômetros rodados. Fale com a LOTUS CENTRO AUTOMOTIVO e realize sua próxima revisão de freios com a melhor equipe de CAJAMAR.</p>
              </div>
            </div>
          </div>
        )}

        {activeService === 'injecao' && (
          <div className="service injecao">
            <div className="service-container">
              <div className="service-info">
                <h1>Injeção</h1>
                <p>O sistema de injeção eletrônica foi criado para substituir os carburadores e melhorar o desempenho dos automóveis. Ele alimenta o combustível e evita a poluição nas cidades, o que acontece por conta do sistema que controla a mistura de ar e combustível do motor do veículo.
                  <br /> <br />
                  Se seu carro apresenta alguns dos problemas abaixo, conte com a Lotus para identificar o problema e deixar seu veículo em boas condições.
                  <br /> <br />
                  Marcha lenta irregular ou carro “morrendo”;
                  <br /> <br />
                  Motor vibrando;
                  <br /> <br />
                  A luz da injeção eletrônica fica acesa ou piscando;
                  <br /> <br />
                  Vazamento de Combustível;
                  <br /> <br />
                  Cheiro de Combustível;
                  <br /> <br />
                  A rotação do motor aumentando repentinamente;
                  <br /> <br />
                  Alto consumo de combustivel.</p>
              </div>
            </div>
          </div>
        )}

        {activeService === 'mecanica' && (
          <div className="service mecanica">
            <div className="service-container">
              <div className="service-info">
                <h1>Mecânica</h1>
                <p>O alinhamento serve para ajustar os ângulos das rodas, mantendo-as retas em relação ao solo e paralelas entre si. Isso ajuda que o motorista não perca o controle do carro em curvas, por exemplo. Um carro alinhado evita acidentes e garante uma direção muito mais tranquila. Além da segurança, manter o carro alinhado retarda o desgaste irregular dos pneus, aumentando a vida útil deles, influencia diretamente na economia de combustível, pois as rodas ficarão muito mais tempo em atrito com o solo e, por último, previne o deslocamento do veículo com uma dirigibilidade firme e sem surpresas.</p>
              </div>
            </div>
          </div>
        )}

        {activeService === 'suspensao' && (
          <div className="service suspensao">
            <div className="service-container">
              <div className="service-info">
                <h1>Suspensão</h1>
                <p>Carro apresentando ruídos ou batidas na movimentação? Sinal que a suspensão veicular necessita de revisão imediata.
                  <br /> <br />
                  A equipe de mecânicos da LOTUS está preparada para realizar a ANALISE de diversos componentes e peças da suspensão, entre eles itens de fundamental importância para o desempenho do veículo, como os amortecedores, pivôs, caixas de direção, molas, entre outros.
                  <br /> <br />
                  Após o a checagem o diagnostico é informado ao cliente que conta com os melhores serviços para deixar seu carro em condições seguras.</p>
              </div>
            </div>
          </div>
        )}

        {activeService === 'venda' && (
          <div className="service venda">
            <div className="service-container">
              <div className="service-info">
                <h1>Venda</h1>
                <p>A lotus possui diversas medidas e marcas de pneus a pronta entrega na sua unidade cajamar.
                  <br /> <br />
                  Somos parceiros dos maiores sites de vendas de pneus a nivel nacional onde o cliente tem a comodidade de realizar a compra e entregar em nossa loja credenciada para realizar os serviços de montagem, balanceamento dos pneus.
                  <br /> <br />
                  www.pneufree.com.br
                  www.pneustore.com.br
                  www.acheipneus.com.br
                  Na Lotus, o cliente tem a liberdade de comprar seus pneus onde desejar e trazê-los para efetuarmos os serviços de montagem, consulte nosso atendimento e solicite seu orçamento.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Services;
