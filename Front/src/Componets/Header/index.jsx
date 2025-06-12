import Logo from "../../assets/img/Logo_puple.svg"
import './style.sass';

export function Header({ linkHeader }){
    return(
        <header>
            <figure>
                <img src={Logo} alt="logo do SmartTrack" />
            </figure>
            <nav>
                {linkHeader.map((item, key) => (
                    <li>{item.name}</li>
                ))}
            </nav>
        </header>
    )
}