// Inizialisiere Componente und definiere welche Parameter dies annimmt
const Input = ({
	type,
	id,
	name,
	pattern,
	labelText,
	value,
	placeholder,
	required,
	minLength,
	maxLength,
}) => {
	// Render HTML mit JSX Werten und styling
	return (
		<>
			<label className="hidden" htmlFor={name}>
				{labelText}
			</label>
			<input
				type={type}
				id={id}
				name={name}
				pattern={pattern}
				value={value}
				placeholder={placeholder}
				required={required}
				minLength={minLength}
				maxLength={maxLength}
				className="
					bg-gray-100 
					text-center 
					text-black 
					outline-0
					transition
					delay-75 
					duration-300 
					ease-in-out 
					hover:-translate-y-1 
					hover:scale-110
					hover:bg-white
					focus:-translate-y-1
					focus:scale-110
					focus:bg-white
					focus:outline-1"
			/>
		</>
	)
}

// Export Component
export default Input
