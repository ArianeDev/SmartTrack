import { Card_information } from '../../Componets/Card_informations';
import { Forms } from '../../Componets/Forms';
import './style.sass';

export function Login() {
    const loginForms = [
        {
            "nameLabel": "Email:",
            "type": "email",
            "placeholder": "Digite seu email..."
        },
        {
            "nameLabel": "Senha:",
            "type": "password",
            "placeholder": "Digite sua senha..."
        }
    ]

    return (
        <main className="login-container">
            <div className="container">
                <Card_information 
                    firtsText="Bem vindo(a) de volta" 
                    secondText="Acesse as informações com o seu login" 
                />
                <Forms 
                    title="Login" 
                    listForms={loginForms} 
                    buttonTitle="Entrar" 
                    text="Não tem cadastro?" 
                    link="Cadastrar" 
                />
            </div>
        </main>
    )
}