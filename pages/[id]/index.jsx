// relevant Imports
import Head from "next/head"
import { useEffect, useState } from "react"
import Player from "../../components/Player"
import Enemy from "../../components/Enemy"
import Log from "../../components/Logs/Log"

const Dashboard = () => {
	const [player, setPlayer] = useState({})
	const [enemies, setEnemies] = useState([])
	const [target, setTarget] = useState()
	const [battleLog, setBattleLog] = useState([])
	const [log, setLog] = useState([])
	const [message, setMessage] = useState()
	const [turn, setTurn] = useState("player")

	// eventuell direkt eine Kategorie mitgeben z.B Kampf/Battle
	// diese dann als Object speichern
	// logEntry = {message:"der inhalt der Nachricht", category:"battle"}
	// diesen logEntry irgendwo zwischenspeichern(DB/JSON-file?)
	// nur die message per setLog übergeben
	// soll bei späterer sortierung der log nachrichten helfen (logs: general/event/battle/conversation)
	const writeToLog = (message, category) => {
		setLog((prevLog) => prevLog + `${message}\n`)
	}

	// useEffect Hook holt beim ersten rendern infos aus der DB
	// und schreibt diese in states
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
	}, [])

	const getRandomEnemyFromEnemiesState = () => {
		const randomEnemyIndex = Math.floor(
			Math.random() * (enemies.length - 0) + 0
		)

		console.log("asdjoafh: ", randomEnemyIndex)
	}

	const attack = (attacker, target) => {
		// check for essential data
		if (!attacker) return writeToLog("Kein Angreifer angegeben")
		if (!target) return writeToLog("Kein Ziel ausgewählt")
		if (target.isDead) return writeToLog("Das Ziel ist bereits besiegt")

		// who attacks who - logMessage
		writeToLog(`${attacker.name} greift ${target.name} an`)

		// calculate damage
		const damageAfterDefence = attacker.attack - target.defence
		target.lp -= damageAfterDefence

		// how much damage - logMessage
		writeToLog(`${attacker.name} verursacht ${damageAfterDefence} Schaden`)
	}

	/*  
		BATTLE:
		- 1 Check wessen turn es ist (init?)
		- 2 wähle ziel
		- 3 wähle aktion
		- 4 check ob ziel gestorben ist:
			-- wenn ja:
				--+ Exp werden verteilt
				--+ check ob alle gegner tod sind:
					--+- Wenn ja:
						--+-- looten
						--+-- kampf beendet nachricht ausgeben
					--+- Wenn nein:
						--+-- beginne bei 1
			-- wenn nein:
				--+  beginne bei 1
		- 5 Wenn enemy dran ist: führe angriff nach der reihenfolge aus die das enemiesArray vorgibt
	*/

	const handleClick = (event) => {
		if (!event.target) return

		getRandomEnemyFromEnemiesState()

		const currentTarget = event.target
		const enemyIndex = currentTarget.id

		// get enemy from state by index
		const enemy = enemies[enemyIndex]

		// write current index into targets index
		enemy.index = Number.parseInt(enemyIndex)

		// set target to
		setTarget(enemy)

		// write into generall log
		writeToLog(`aktuelles Ziel: ${enemy.name}`)
	}

	const checkIfTargetIsDead = (target) => {
		if (target.lp <= 0) {
			writeToLog(`${target.name} is dead`)
			return true
		} else return false
	}

	const handleAttack = () => {
		// scope data to function
		const currentTarget = target
		const enemiesTmp = [...enemies]

		attack(player, currentTarget)

		// check if attack has killed target
		currentTarget.isDead = checkIfTargetIsDead(currentTarget)

		// write updated enemy into enemiesTmp
		enemiesTmp[currentTarget.index] = currentTarget

		// update state with tempData
		setEnemies(enemiesTmp)

		enemies.forEach((enemy) => {
			if (!enemy.isDead) {
				attack(enemy, player)
				console.log(player)
			}
		})
	}

	// Render HTML mit JSX Werten
	return (
		<>
			{/* Header componente mit meta informationen für die Seite */}
			<Head>
				<title>Dashboard</title>
			</Head>

			{/* Main Block - Hauptinhalt der Seite */}
			<div className="flex h-screen w-full flex-col">
				<div className="flex h-full flex-col flex-wrap items-center justify-evenly">
					<div className="flex w-full justify-evenly">
						{enemies.map((enemy, index) => (
							<Enemy
								key={index}
								index={index}
								enemy={enemy}
								className={"bg-red-500 bg-opacity-50"}
								onClick={handleClick}
							/>
						))}
					</div>

					<div className="flex w-full justify-evenly">
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

						<Log log={log} />
					</div>
				</div>
			</div>
		</>
	)
}

// Export Component
export default Dashboard
