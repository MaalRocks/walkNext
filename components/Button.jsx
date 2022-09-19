const Button = ({ id, onClick, text, type, className }) => {
	return (
		<button
			className={`
                ${className}
                rounded-md
                border-red-200
                bg-black
                bg-opacity-40
                p-2 text-center
                text-red-200
                transition-all
                duration-500 
                ease-out
                hover:shadow-[0px_0px_15px_3px_rgba(254,202,202,0.26)]
                hover:ease-in
                `}
			id={id}
			type={type}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

export default Button
