import Logo from "../../assets/img/Logo_puple.svg"
import './style.sass';

export function Header({ linkHeader }){
    return(
        <header>
            <figure>
                <img src={Logo} alt="logo do SmartTrack" />
            </figure>
            <nav>
                <ul>
                    {linkHeader.map((item) => (
                        <li>{item.name}</li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}