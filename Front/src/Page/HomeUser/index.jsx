import { CloudSun, Droplet, Lightbulb, UsersRound } from 'lucide-react';
import { CardSensors } from '../../Componets/Card_Sensors';
import { Header } from '../../Componets/Header';
import { useNavigate } from 'react-router-dom';
import './style.sass';

export function HomeUser(){
    const name = localStorage.getItem('username');
    const navigate = useNavigate()

    // items the in header
    const linkHeader = [
        {
            "name": "Home",
            "link": "/"
        },
        {
            "name": "Histórico",
            "link": "/history"
        }
		,
        {
            "name": "Sair",
            "link": "/sair"
        }
    ]
    // items in the card
    const itemsCard = [
        {
            "img": <Lightbulb className='icon'/>,
            "imgTitle": "Luminosidade",
            "title": "Luminosidade",
            "sensorType": "luminosidade",
            "text": "Monitore o consumo de energia."
        },
        {
            "img": <CloudSun className='icon'/>,
            "imgTitle": "Temperatura",
            "title": "Temperatura",
            "sensorType": "temperatura",
            "text": "Monitore a temperatura da cidade."
        },
        {
            "img": <Droplet className='icon'/>,
            "imgTitle": "Umidade",
            "title": "Umidade",
            "sensorType": "umidade",
            "text": "Monitore o nível de umidade da cidade."
        },
        {
            "img": <UsersRound className='icon'/>,
            "imgTitle": "Pessoas",
            "title": "Pessoas",
            "sensorType": "pessoas",
            "text": "Monitore quantas pessoas circulam pela cidade."
        },
    ]

    const handleClick = (sensorType) => {
        localStorage.setItem("selectedSensor", sensorType);
        navigate("/sensor");
    }

    return(
        <>
            <Header linkHeader={linkHeader} />
            <main className='container-homeUser'>
                <section className="texts">
                    <h2>Seja bem vindo (a), {name}</h2>
                    <div className="line"></div>
                    <p className='p'>
                        Você pode navegar entre os sensores listados nos cards a baixo, 
						basta clicar no que deseja visualizar
                    </p>
                    <CardSensors listCard={itemsCard} onCardClick={handleClick} />
                </section>
            </main>
        </>
    )
}