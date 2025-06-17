import './style.sass';

export function Input({ type, placeholder, atributo, setFunction }) {
	return (
		<div className="textInputWrapper">
			<input
				type={type}
				value={atributo}
				placeholder={placeholder}
				onChange={(e) => setFunction(e.target.value)}
				className="textInput"
				required
			/>
		</div>
	)
}