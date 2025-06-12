import Logo from '../../assets/img/Logo.svg';
import { Label } from '../../Componets/Label';
import { Input } from '../../Componets/Input';
import { Button } from '../../Componets/Button';
import './style.sass';

export function Login() {
    return (
        <>
            <div className="container">
                <div className="container-login">
                    <section className="login-informations">
                        <img src={Logo} alt="SmartTrack - logo" />
                        <div className="text">
                            <h1>Bem vindo(a) de volta</h1>
                            <p>Acesse as informações com o seu login</p>
                        </div>
                    </section>
                    <section className="login-forms">
                        <h2>Login</h2>
                        <form action="" method="post">
                            <div className="container-input">
                                <Label text="E-mail" />
                                <Input type="email" placeholder="Digite seu e-mail..." />
                            </div>
                            <div className="container-input">
                                <Label text="Senha" />
                                <Input type="password" placeholder="Digite sua senha..." />
                            </div>
                            <Button text="Entrar" />
                        </form>
                        <p>Não tem cadastro? <span className='link'>Cadastra-se</span></p>
                    </section>
                </div>
            </div>
        </>
    )
}