import api from '../../Service/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card_information } from '../../Componets/Card_informations';
import { Forms } from '../../Componets/Forms';
import './style.sass';

export function Register(){
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const submitRegisterUser = async () => {
		const registerUser = {
			username,
			email,
			phone,
			date_birth: null,
			type_user: "A",
			password
		}
		try {
			const response = await api.post('/users/', registerUser);
			window.alert("Usuário cadastrado com sucesso", response.data);
			navigate('/login')
		} catch (error) {
			window.alert("Erro na requisição", error);
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password) {
			submitRegisterUser();
		} else {
			window.alert("Preencha todos os campos!")
		}
	}

	const registerForms = [
		{
			"nameLabel": "Nome: ",
			"type": "text",
			"placeholder": "Digite seu nome...",
			"atributo": username,
			"setFunction": setUsername
		},
		{
			"nameLabel": "Email: ",
			"type": "email",
			"placeholder": "Digite seu email...",
			"atributo": email,
			"setFunction": setEmail
		},
		{
			"nameLabel": "Telefone: ",
			"type": "text",
			"placeholder": "Digite nesse modelo: (xx)xxxxx-xxxx",
			"atributo": phone,
			"setFunction": setPhone
		},
		{
			"nameLabel": "Senha: ",
			"type": "password",
			"placeholder": "Digite sua senha...",
			"atributo": password,
			"setFunction": setPassword
		},
		{
			"nameLabel": "Confirmar senha: ",
			"type": "password",
			"placeholder": "Digite a senha novamente...",
			"atributo": passwordConfirm,
			"setFunction": setPasswordConfirm
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
					method="post"
					methodFunction={handleSubmit}
					text="Já tem login?"
					link="Logar"
				/>
			</div>
		</div>
	)
}