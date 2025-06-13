import { Label } from '../../Componets/Label';
import { Input } from '../../Componets/Input';
import { Button } from '../../Componets/Button';
import { Card_information } from '../../Componets/Card_informations';
import './style.sass';

export function Login() {
    return (
        <div className="login-container">
            <div className="container">
                <Card_information 
                    firtsText="Bem vindo(a) de volta" 
                    secondText="Acesse as informações com o seu login" 
                />
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
    )
}