import Logo from '../../assets/img/Logo.svg';
import { Label } from '../../Componets';
import { Input } from '../../Componets/Input';
import { Button } from '../../Componets/Button';
import './style.sass';

export function Login() {
    return (
        <div className="container">
            <div className="container-login">
                <section className="login-informations">
                    <img src={Logo} alt="SmartTrack - logo" />
                    <h1>Bem vindo(a) de volta</h1>
                    <p>Acesse as informações com o seu login</p>
                </section>
                <section className="login-foms">
                    <h2>Login</h2>
                    <Label text="E-mail" />
                    <Input type="email" placeholder="Digite seu e-mail..." />
                    <Label text="Senha" />
                    <Input type="password" placeholder="Digite sua senha..." />
                    <Button text="Entrar" />
                    <p>Não tem cadastro? <span>Cadastra-se</span></p>
                </section>

            </div>
        </div>
    )
}