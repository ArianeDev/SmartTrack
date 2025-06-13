import { useNavigate } from 'react-router-dom';
import './style.sass';

export function CardSensors({ listCard }){
    const navigate = useNavigate();

    function handClick(link){
        navigate(link);
    }

    return(
        <section>
            {listCard.map((item, key) => (
                <button 
                    key={key}
                    onClick={() => handClick(item.link)} 
                    className="card-container"
                >
                    <figure title={item.imgTitle}>
                        {item.img}
                    </figure>
                    <h3>{item.title}</h3>
                </button>
            ))}
        </section>
    )
}