const Layout = ({ children }) => {
	return (
		<div
			className="
				flex 
				min-h-screen 
				flex-col 
				items-center 
				justify-center
				bg-black
				bg-cover
				bg-clip-padding bg-center
				bg-origin-border 
				text-white
				"
		>
			{children}
		</div>
	)
}

export default Layout
