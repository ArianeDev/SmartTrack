import { CardSensors } from '../../Componets/Card_Sensors';
import { Footer } from '../../Componets/Footer'
import { Header } from '../../Componets/Header';
import { CloudSun, Droplet, Lightbulb, UsersRound } from 'lucide-react';
import './style.sass';

export function HomePage(){
    // items the in header
    const linkHeader = [
        {
            "name": "Home",
            "link": "/"
        },
        {
            "name": "Login",
            "link": "login"
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
            "link": "/home",
            "text": "Monitore quantas pessoas circulam pela cidade."
        },
    ]
    return(
        <>
            <Header linkHeader={linkHeader} />
            <main className='container-home'>
                <section className="texts">
                    <h1 className='h1'>Seja bem vindo ao <span className='name'>SmartTrack</span></h1>
                    <div className="line"></div>
                    <p className='p'>
                        Aqui você poderá visualizar todos os sensores da cidade. 
                        É possível acessar e manipular os sensores listados a baixo.
                    </p>
                    <CardSensors listCard={itemsCard} />
                </section>
            </main>
            <Footer />
        </>
    )
}