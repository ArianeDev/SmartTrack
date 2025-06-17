import { CardSensors } from '../../Componets/Card_Sensors';
import { Header } from '../../Componets/Header';
import { CloudSun, Droplet, Lightbulb, UsersRound } from 'lucide-react';
import './style.sass';

export function HomeUser(){
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
            "link": "/register",
            "text": "Monitore o consumo de energia."
        },
        {
            "img": <CloudSun className='icon'/>,
            "imgTitle": "Temperatura",
            "title": "Temperatura",
            "link": "/register",
            "text": "Monitore a temperatura da cidade."
        },
        {
            "img": <Droplet className='icon'/>,
            "imgTitle": "Umidade",
            "title": "Umidade",
            "link": "/register",
            "text": "Monitore o nível de umidade da cidade."
        },
        {
            "img": <UsersRound className='icon'/>,
            "imgTitle": "Pessoas",
            "title": "Pessoas",
            "link": "/sensor",
            "text": "Monitore quantas pessoas circulam pela cidade."
        },
    ]

    return(
        <>
            <Header linkHeader={linkHeader} />
            <main className='container-homeUser'>
                <section className="texts">
                    <h2>Seja bem vindo (a), Nome usuário</h2>
                    <div className="line"></div>
                    <p className='p'>
                        Você pode navegar entre os sensores listados nos cards a baixo, 
						basta clicar no que deseja visualizar
                    </p>
                    <CardSensors listCard={itemsCard} />
                </section>
            </main>
        </>
    )
}