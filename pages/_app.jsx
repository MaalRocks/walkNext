// _app.jsx ist der Einstiegspunkt in die Applikation

// Importiert CSS welches für die ganze App gillt
import "../css/globals.css"
// Importiert Layout Component
import Layout from "../components/Layout"

// Inizialisiere Componente und definiere welche Parameter diese annimmt
function MyApp({ Component, pageProps }) {
	// Return gestyltes JSX
	return (
		<>
			{/* <div className="top-bar">
				<div className="nav">
					<Link href="/">
						<a>Home</a>
					</Link>
					<Link href="/newPet">
						<a>Add Pet</a>
					</Link>
				</div>

				<img
					id="title"
					src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
					alt="pet care logo"
				></img>
			</div> */}

			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}

export default MyApp
