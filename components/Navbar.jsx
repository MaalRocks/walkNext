// relevante Imports
import Link from "next/link"
import Router from "next/router"

// Inizialisiere Componente und definiere welche Parameter diese annimmt
const Navbar = ({ data }) => {
	// Schreibe data in neue, beschreibendere, Variabel
	const user = data

	// Definiere Klickhandler
	const handleClick = () => {
		// erstelle Variabel und schreibe den Wert von loggedIn aus dem localStorage rein
		const loggedIn = localStorage.getItem("loggedIn")

		// Check ob der Benutzer eingelogt ist
		// falls nicht gibt es einen Alarm mit Hinweis
		// und es wird frühzeitig returned
		if (!loggedIn) {
			return alert("Du bist nicht angemeldet")
		}

		// Falls der Benutzer eingelogt ist
		// wird loggedIn im localStorage auf "false" gesetzt
		localStorage.setItem("loggedIn", false)

		// Danach wird der Benutzer zur Login-Seite geleitet
		Router.push("/")
	}

	// Return gestyltes JSX
	return (
		<nav className="bg-[#f497ab] flex w-screen">
			<span className="my-1 mx-3 flex-auto">Hallo {user.name}!</span>
			{/* NextJS Link Component: leitet den Benutzer über einen internen Router zur angegebenen Seite */}
			<Link href={"/newGoal"}>
				<a
					className="
						my-1 
						mx-3 
						flex-auto 
						text-center
					"
				>
					Neuer Eintrag
				</a>
			</Link>

			{/* Button der die handleClick Funktion ausführt */}
			<button
				onClick={handleClick}
				className="
					my-1 
					mx-3
					flex-auto 
					text-right
			 "
			>
				Logout
			</button>
		</nav>
	)
}

// export Component
export default Navbar
