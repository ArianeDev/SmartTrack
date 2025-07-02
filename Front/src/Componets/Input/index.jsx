import './style.sass';

export function Input({ type, placeholder, atributo, setFunction, disabled }) {
	const handleChange = (e) => {
		let value = e.target.value;

		if (type === 'tel') {
			// Remove all non-digit characters
			value = value.replace(/\D/g, ''); 

			if (value.length > 1) {
				value = value
						.replace(/^(\d{2})(\d)/, "($1)$2")
                    	.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
			}
		} 
		
		if (type === 'number') {
			value = value.replace(/\D/g, ''); 
		}

		if (type === 'mac') {
			value = value.replace(/[^A-Fa-f0-9]/g, '').slice(0, 12); 
			value = value.match(/.{1,2}/g)?.join(':') || '';
		}

		setFunction(value);
 	}
	
	return (
		<div className="textInputWrapper">
			<input
				type={type}
				value={atributo}
				placeholder={placeholder}
				onChange={handleChange}
				className="textInput"
				disabled={disabled}
				required
			/>
		</div>
	)
}