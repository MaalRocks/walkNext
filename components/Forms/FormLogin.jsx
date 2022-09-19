// relevant Imports
import { useRouter } from "next/router"
import { useState } from "react"

// Inizialisiere Componente und definiere welche Parameter diese annimmt
const FormLogin = ({ children }) => {
	// Instanziere router
	const router = useRouter()
	const [message, setMessage] = useState("")

	// Eventhandler(submit) des Loginformulares
	const handleSubmit = async (event) => {
		// Verhindert default verhalten des events
		event.preventDefault()

		// Werte aus dem Inputfeldern des Loginformulares in ein Object(formData) schreiben
		const formData = {
			userEmail: event.target.userEmail.value,
			userPassword: event.target.userPassword.value,
		}

		// Das Object(formData) in JSON parsen
		const JSONdata = JSON.stringify(formData)

		// Definiere welche URL die fetch funktion ansteuern soll
		const endpoint = "http://localhost:3000/api/auth/userAuth"

		// Definiere die parameter der fetch funktion
		const options = {
			// Es sollen daten geschickt werden daher POST
			method: "POST",
			// Daten werden im JSON-Format geschickt
			headers: {
				"Content-type": "application/json",
			},
			// Die Daten im JSON-Format
			body: JSONdata,
		}

		// Führe die fetch funktion mit den definierten Argumenten aus
		// und schreibe die Antwort(Response) in res
		// Antwort entspricht einer UserID
		const res = await fetch(endpoint, options)

		// Parse die Response(res) in ein JavaScript Object
		const result = await res.json()

		// Check ob die "data" Eigenschaft das Objectes leer ist
		// und gibt einen error falls leer
		if (!result.data) {
			return res.status(400, "data ist leer")
		}

		// Schreibe die userID in den localStorage
		localStorage.setItem("userId", result.data._id)

		// Schreibt eine loggedIn Variable in den localStorage
		// und setzt sie auf true
		localStorage.setItem("loggedIn", true)

		// Leite den Benutzer auf pages/[id]/
		// wobei [id] = userID nach authentifizierung
		router.push(`/${result.data._id}`)
	}

	// Return gestyltes JSX
	return (
		<form
			className="flex flex-col"
			onSubmit={handleSubmit}
		>
			{children}
		</form>
	)
}

// Export Componente
export default FormLogin
