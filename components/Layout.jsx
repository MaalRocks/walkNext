const Layout = ({ children }) => {
	return (
		<div
			className="
				flex 
				min-h-screen 
				flex-col 
				items-center 
				justify-center
				bg-[url('/banana.jpg')]
				bg-cover bg-clip-padding
				bg-center 
				bg-origin-border
				"
		>
			{children}
		</div>
	)
}

export default Layout
