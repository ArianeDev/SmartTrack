import Logo from "../../assets/img/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react';
import './style.sass';

export function Header({ linkHeader }){
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        navigate('/');
    }

    return(
        <header>
            <figure>
                <img src={Logo} alt="logo do SmartTrack" />
            </figure>
            <nav>
                <ul>
                    {linkHeader.map((item) => (
                        <Link to={item.link} className="link">
                            {item.name === 'Sair' ? (
                                <button onClick={handleLogout} className="btn-exit">
                                    <LogOut />
                                </button>
                            ) : (
                                <li>{item.name}</li>
                            )}
                        </Link>
                    ))}
                </ul>
            </nav>
        </header>
    )
}