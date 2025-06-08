import './style.sass';

export function Input({ type, placeholder }) {
	return (
		<div className="textInputWrapper">
			<input
				type={type}
				placeholder={placeholder}
				className="textInput"
				required
			/>
		</div>
	)
}