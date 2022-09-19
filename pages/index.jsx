// relevant Imports
import Head from "next/head"
import Input from "../components/Inputs/Input"
import FormLogin from "../components/Forms/FormLogin"
import { useRouter } from "next/router"
import { useEffect } from "react"

// Inizialisiere Componente
const Login = () => {
	// Router instanzieren
	const router = useRouter()
	useEffect(() => {
		// Definiere Funktion die checkt ob der Benutzer bereits eingeloggt ist
		const checkIfLoggedIn = () => {
			// localStorage gibt seinen Wert als String zurück
			if (localStorage.getItem("loggedIn") === "true") {
				// Wenn eingeloggt leite den Benutzer Auf das Dashboard weiter
				router.replace(`/${localStorage.getItem("userId")}`, "Dashboard", {
					shallow: true,
				})
			}
		}

		// Initializieren die Funktion
		checkIfLoggedIn()
	}, [])

	// Return gestyltes JSX
	return (
		<>
			{/* Header componente mit meta Information für die aktuelle Seite */}
			<Head>
				<title>Login</title>
			</Head>

			{/* Main Block - Hauptinhalt der aktuellen Seite */}
			<main className="container mx-auto flex h-full flex-col items-center justify-center py-8 ">
				<div className="flex flex-col border border-gray-500 bg-black bg-opacity-80 text-white">
					<h1 className="text-center text-9xl">login</h1>
					{/* Component: handles user login and authentifikation */}
					<FormLogin>
						<div>
							{/* Component: input for email */}
							<Input
								type="email"
								id="userEmail"
								name="userEmail"
								labelText="Email"
								placeholder="Email"
								required="required"
							/>

							{/* Component: input for password */}
							<Input
								type="password"
								id="userPassword"
								name="userPassword"
								labelText="Passwort"
								placeholder="Passwort"
								required="required"
								pattern="[a-z0-9]{1,15}"
							/>
						</div>

						<button
							className="
							place-self-center 
							p-1 text-3xl 
							transition 
							delay-75 duration-700
							ease-linear  
							hover:bg-gray-100 
							hover:text-black"
							type="submit"
						>
							Absenden
						</button>
					</FormLogin>
				</div>
			</main>
		</>
	)
}

// Export Component
export default Login
