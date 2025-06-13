import { Card_information } from '../../Componets/Card_informations';
import { Forms } from '../../Componets/Forms';
import './style.sass';

export function Register(){
	const registerForms = [
		{
			"nameLabel": "Nome: ",
			"type": "text",
			"placeholder": "Digite seu nome..."
		},
		{
			"nameLabel": "Email: ",
			"type": "email",
			"placeholder": "Digite seu email..."
		},
		{
			"nameLabel": "Telefone: ",
			"type": "text",
			"placeholder": "Digite nesse modelo: (xx)xxxxx-xxxx"
		},
		{
			"nameLabel": "Senha: ",
			"type": "password",
			"placeholder": "Digite sua senha..."
		},
		{
			"nameLabel": "Confirmar senha: ",
			"type": "password",
			"placeholder": "Digite a senha novamente..."
		},
	]
	return(
		<div className="register-container">
			<div className="container">
				<Card_information 
					firtsText="Bem vindo(a)" 
					secondText="Faça seu castro e aproveite para acessar sobre todos os sensores da cidade." 
				/>
				<Forms
					title="Cadastro"
					listForms={registerForms}
					buttonTitle="Cadastrar"
					text="Já tem login?"
					link="Logar"
				/>
			</div>
		</div>
	)
}