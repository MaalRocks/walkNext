// relevant Imports
import Head from "next/head"
import Card from "../../components/Card"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Navbar from "../../components/Navbar"
import Player from "../../components/Player"
import Enemy from "../../components/Enemy"

// Inizialisiere Componente und definiere welche Parameter diese annimmt
// Argumente kommen aus der getServerSideProps()
const Dashboard = () => {
	const router = useRouter()
	// Definiere States
	// goals-State der mit dem Wert aus goalsDB initialisiert wird
	const [player, setPlayer] = useState({})
	const [enemies, setEnemies] = useState([])
	const [target, setTarget] = useState("")
	const [battleLog, setBattleLog] = useState([])

	//message
	const [message, setMessage] = useState()

	// useEffect Hook wird instanziert
	useEffect(() => {
		const getPlayer = async () => {
			try {
				const res = await fetch(`/api/player/`)

				if (!res.ok) {
					throw new Error(res.status)
				}

				const { data } = await res.json()

				setPlayer(data[0])
			} catch (error) {
				setMessage("Failed to get player")
			}
		}

		const getEnemies = async () => {
			try {
				const res = await fetch(`/api/enemies/`)

				if (!res.ok) {
					throw new Error(res.status)
				}

				const { data } = await res.json()

				setEnemies(data)
			} catch (error) {
				setMessage("Failed to get Enemy")
			}
		}

		getPlayer()
		getEnemies()
	}, [target])

	// const changeBgColor = (e) => {
	// 	const target = e.target
	// 	const redBG = "bg-red-700"
	// 	const blueBG = "bg-blue-700"

	// 	if (target.className === redBG) {
	// 		target.className = blueBG
	// 	}

	// 	console.log(target.className)
	// }

	// Definiere handleChange Funktion

	// Deletehandler wird definiert
	const handleDelete = async (event) => {
		// Es wird eine Variable "contentID" definiert
		// In diese wird die ID des Elementes geschrieben die das event ausgelöst hat.
		const contentID = event.target.id

		// Try-Catch Block
		try {
			// Der Goals-Endpoint mit der dynamischen Route: "/api/goals/${contentID}" wird angesprochen
			// per POST wird der Key="methode" mit dem Value="Delete" übergeben
			await fetch(`/api/goals/${contentID}`, {
				method: "Delete",
			})

			// Falls erfolgreich lade die akutelle Seite neu
			Router.reload()
		} catch (error) {
			// Fall Try-Block scheitert setze message auf:
			setMessage("Löschen fehlgeschlagen.")
		}
	}

	const handleClick = (event) => {
		const target = event.target
		const enemyId = target.id

		setTarget(enemyId)
	}

	// Ich sollte eventuell das ganze enemyObject in target packen
	// state ist getter/setter
	// click auf target -> target wird gesetted
	// click auf attack -> attacke wird ausgeführt
	// attacke besteht aus:
	//	errechnen des schadens
	// 	set den schaden

	const handleAttack = () => {
		setBattleLog(`attack ${target}!`)

		// hier muss ich an den attack-wert von player kommen
		// und an den def- und lp-wert von target
	}

	// Render HTML mit JSX Werten
	return (
		<>
			{/* Header componente mit meta informationen für die Seite */}
			<Head>
				<title>Dashboard</title>
			</Head>

			<div className="text-white">currentTarget: {target}</div>
			<div className="text-white">target string: {battleLog}</div>

			{/* Main Block - Hauptinhalt der Seite */}
			<div className="flex h-screen w-full flex-col">
				<div className="flex h-full flex-col flex-wrap items-center justify-evenly">
					{enemies.map((enemy, index) => (
						<Enemy
							key={index}
							enemyId={enemy.name}
							enemy={enemy}
							onClick={handleClick}
						/>
					))}

					<div className="bg-gray-500 bg-opacity-30 p-2">
						<Player player={player} />

						<div className="m-2">
							<button
								className="
								m-1 
								bg-white
								p-1
								text-black
								hover:bg-gray-700
								hover:text-gray-300
							   "
								onClick={handleAttack}
							>
								angriff
							</button>

							<button
								className="
								m-1 
								bg-white
								p-1
								text-black
								hover:bg-gray-700
								hover:text-gray-300
							   "
							>
								verteidigen
							</button>

							<button
								className="
								m-1 
								bg-white
								p-1
								text-black
								hover:bg-gray-700
								hover:text-gray-300
							   "
							>
								fliehen
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

// Export Component
export default Dashboard
