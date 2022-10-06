// relevant Imports
import Head from "next/head"
import Link from "next/link"

// Inizialisiere Componente
const Startpage = () => {
	// Return gestyltes JSX
	return (
		<>
			{/* Header componente mit meta Information für die aktuelle Seite */}
			<Head>
				<title>Startpage</title>
			</Head>

			{/* Main Block - Hauptinhalt der aktuellen Seite */}
			<main className="container mx-auto flex h-full flex-col items-center justify-center py-8 ">
				<div className="flex flex-col border border-gray-500 bg-black bg-opacity-80 text-white">
					<Link href="/Battle">
						<a className="px-2 py-1">Battle!</a>
					</Link>
				</div>
			</main>
		</>
	)
}

// Export Component
export default Startpage
