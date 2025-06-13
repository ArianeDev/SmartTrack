import { CardSensors } from '../../Componets/Card_Sensors';
import { Header } from '../../Componets/Header';
import { Lightbulb } from 'lucide-react'
import './style.sass';

export function Home(){
    // items the in header
    const linkHeader = [
        {
            "name": "Home"
        },
        {
            "name": "Login"
        }
    ]
    // items in the card
    const itemsCard = [
        {
            "img": <Lightbulb className='icon'/>,
            "imgTitle": "Luminosidade",
            "title": "Luminosidade",
            "link": "/resgiter"
        }
    ]
    return(
        <>
            <Header linkHeader={linkHeader} />
            <main className='container-home'>
                <h1>Seja bem vindo ao <span>SmartTrack</span></h1>
                <div className="line"></div>
                <p>
                    Aqui você poderá visualizar todos os sensores da cidade. 
                    É possível acessar e manipular os sensores listados a baixo.
                </p>
                <CardSensors listCard={itemsCard} />
            </main>
        </>
    )
}