import ImagemLocation from "../../../assets/location.png"
import ImagemWave from "../../../assets/wave.png"
import ImagemCalendar from "../../../assets/calendar.png"
import ImagemCarIcon from "../../../assets/car-icon.png"

function Info() {
  return (
    <div className="info">
      <div className="info-title">
        <h1>Como Funciona</h1>
        <p>
          Agendamento e estabelecimento de serviços a serem prestados e preço
        </p>
      </div>

      <div className="info-flow">
        <div className="info-step">
          <div className="info-img">
            <img src={ImagemLocation} alt="" />
          </div>

          <h2>Escolher Serviço</h2>
          <p>
            Através do WhatsApp, o cliente irá comunicar o serviço que deseja, e
            lá será estabelecido detalhes e preços.
          </p>
        </div>

        <img src={ImagemWave} alt="" />

        <div className="info-step">
          <div className="info-img">
            <img src={ImagemCalendar} alt="" />
          </div>

          <h2>Agendar Data</h2>
          <p>
            O dono irá ver as datas disponíveis, e então agendará uma data para
            receber o seu veículo.
          </p>
        </div>

        <img src={ImagemWave} alt="" />

        <div className="info-step">
          <div className="info-img">
            <img src={ImagemCarIcon} alt="" />
          </div>

          <h2>Deixar e Retirar Carro</h2>
          <p>
            No dia agendado, o carro é deixado sobre os cuidados do autocenter,
            e após a conclusão, o cliente é avisado para retirada.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
