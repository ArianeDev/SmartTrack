import api from '../../Service/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card_information } from '../../Componets/Card_informations';
import { Forms } from '../../Componets/Forms';
import { z } from 'zod';
import './style.sass';

export function Register(){
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	// user zod
	const registerSchema = z.object({
		username: z.string().min(1, 'Nome é obrigatório.'),
		email: z.string().min(1, 'Email é obrigatório').email('Formato de email inválido, tem que conter @ e domínio.'),
		phone: z.string().min(10, 'Insirá o telefone corretamente').regex(/^\(\d{2}\)\d{5}-\d{4}$/, 'Telefone deve estar no formato (xx)xxxxx-xxxx'),
		password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
		passwordConfirm: z.string()
			.min(6, 'Confirmação de senha é obrigatória')
		}).refine((data) => data.password === data.passwordConfirm, {
		message: 'As senhas são diferentes',
		path: ['passwordConfirm']
	});

	// User register
	const submitRegisterUser = async () => {
		// to validate
		const registerUserValidate = {
			username,
			email,
			phone,
			date_birth: null,
			type_user: "A",
			password,
			passwordConfirm
		}

		const result = registerSchema.safeParse(registerUserValidate);

		if (!result.success) {
			const firstError = result.error.errors[0].message;
			window.alert(`${firstError}`);
			return;
		}

		// to back
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
			window.alert("Tente novamente.", error);
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

	const onLinkClick = () => {
        navigate("/login");
    }
    

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
					onLinkClick={onLinkClick}
				/>
			</div>
		</div>
	)
}