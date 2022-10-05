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
					<button
						onClick={() => router.push("/Battle")}
						className="px-2 py-1"
					>
						GO!
					</button>
				</div>
			</main>
		</>
	)
}

// Export Component
export default Login
