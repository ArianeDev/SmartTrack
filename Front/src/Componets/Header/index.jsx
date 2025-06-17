import Logo from "../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
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
                        <Link to={item.link} className="link">
                            <li>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </nav>
        </header>
    )
}