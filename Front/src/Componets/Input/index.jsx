import './style.sass';

export function Input({ type, placeholder, atributo, setFunction, disabled }) {
	return (
		<div className="textInputWrapper">
			<input
				type={type}
				value={atributo}
				placeholder={placeholder}
				onChange={(e) => setFunction(e.target.value)}
				className="textInput"
				disabled={disabled}
				required
			/>
		</div>
	)
}