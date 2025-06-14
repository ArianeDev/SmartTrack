import { useNavigate } from 'react-router-dom';
import './style.sass';

export function CardSensors({ listCard }){
    const navigate = useNavigate();

    function handClick(link){
        navigate(link);
    }

    return(
        <section className="cards-container">
            {listCard.map((item, key) => (
                <button 
                    key={key}
                    onClick={() => handClick(item.link)}
                    className='flip-card'
                >
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <figure title={item.imgTitle}>
                                {item.img}
                            </figure>
                            <p className="title">{item.title}</p>
                        </div>
                        <div className="flip-card-back">
                            <p className="title">{item.title}</p>
                            <p>{item.text}</p>
                        </div>
                    </div>
                </button>
            ))}
        </section>
    )
}