import { Label } from '../../Componets/Label';
import { Input } from '../../Componets/Input';
import { Button } from '../../Componets/Button';
import { Card_information } from '../../Componets/Card_informations';
import './style.sass';

export function Register(){
	return(
		<div className="register-container">
			<div className="container">
				<Card_information 
					firtsText="Bem vindo(a)" 
					secondText="Faça seu castro e aproveite para acessar sobre todos os sensores da cidade." 
				/>
				<section className="register-forms">
					<h2>Cadastro</h2>
					<form method="post">
						<div className="container-input">
							<Label text="Nome:" />
							<Input type="text" placeholder="Digite seu nome..." />
						</div>
						<div className="container-input">
							<Label text="E-mail:" />
							<Input type="email" placeholder="Digite seu e-mail..." />
						</div>
						<div className="container-input">
							<Label text="Telefone:" />
							<Input type="text" placeholder="(xx)xxxxx-xxxx" />
						</div>
						<div className="container-input">
							<Label text="Senha:" />
							<Input type="password" placeholder="Digite sua senha..." />
						</div>
						<div className="container-input">
							<Label text="Confirmar senha:" />
							<Input type="password" placeholder="Confirme sua senha..." />
						</div>
						<Button text="Entrar" />
					</form>
					<p>Já tem cadastro? <span className='link'>Logar</span></p>
				</section>
			</div>
		</div>
	)
}