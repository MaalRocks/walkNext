// relevant Imports
import Head from "next/head"
import { useEffect, useState } from "react"
import Player from "../../components/Player"
import Enemy from "../../components/Enemy"
import Log from "../../components/Logs/Log"
import CurrentTarget from "../../components/CurrentTarget"

// stateUpdate
// // Array

// setState((prevState) => {
// 	const newState = Array.from(prevState);
// 	newState.push('foo');
// 	return newState;
//   });

//   // Object

//   setState((prevState) => {
// 	return({
// 	  ...prevState,
// 	  foo: 'bar'
// 	});

const Dashboard = () => {
	const [player, setPlayer] = useState({})
	const [enemies, setEnemies] = useState([])
	const [enemyIndex, setEnemyIndex] = useState(null)
	const [battleLog, setBattleLog] = useState([])
	const [log, setLog] = useState([])
	const [message, setMessage] = useState()
	const [isPlayerTurn, setIsPlayerTurn] = useState(true)
	const [counter, setCounter] = useState(0)

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

	const getRandomIndex = (array) => {
		return Math.floor(Math.random() * array.length)
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

	const getEnemyByIndex = (index) => {
		if (!index) return console.log("getEnemyByIndex _ index nicht vorhanden")
		// get enemy from state by index
		return enemies[index]
	}

	const setTargetToButtonId = (event) => {
		if (!event.target) return console.log("event.target nicht vorhanden")

		const btnId = event.target.id
		setEnemyIndex(btnId)
	}

	const isDead = (target) => {
		if (target.lp <= 0) {
			writeToLog(`${target.name} is dead`)

			return true
		} else return false
	}

	const calcDamage = (attacker, target) => {
		// check for essential data
		if (!attacker) return writeToLog("Kein Angreifer angegeben")
		if (!target) return writeToLog("Kein Ziel ausgewählt")
		if (target.isDead) return writeToLog("Das Ziel ist bereits besiegt")

		// who attacks who - logMessage
		writeToLog(`${attacker.name} greift ${target.name} an`)

		// calculate damage
		const damageAfterDefence = attacker.attack - target.defence

		// how much damage - logMessage
		writeToLog(`${attacker.name} verursacht ${damageAfterDefence} Schaden`)

		return damageAfterDefence
	}

	const handleAttack = () => {
		if (!enemyIndex) return writeToLog("Kein enemyIndex")

		const target = getEnemyByIndex(enemyIndex)

		if (target.lp <= 0) return writeToLog("Sinnlos")

		const damage = calcDamage(player, target)

		target.lp = target.lp - damage

		// nicht das target bearbeiten sondern die position im enemysArray
		// wenn man danach geht alles nur im enemysArray machen und
		// über das target nur den index innerhalb des enemyArrays überreichen

		setTarget((prevState) => {
			return { ...prevState, lp: target.lp - calcDamage(player, target) }
		})

		// Wieso klappt das aber setState nicht?
		// target.lp -= calcDamage(player, target)

		// check if attack has killed target
		target.isDead = isDead(target)

		// IF target dead, give exp
		if (target.isDead) {
			player.exp += target.exp
		}

		// write updated enemy into enemies
		enemies[target.index] = target

		// update state with tempData
		setEnemies(enemies)

		// enemies.forEach((enemy) => {
		// 	if (!enemy.isDead) {
		// 		const coinToss = Math.floor(Math.random() * 2)
		// 		console.log("coinToss: ", coinToss)
		// 		if (coinToss === 1) {
		// 			calcDamage(enemy, player)
		// 			setPlayer(player.lp)
		// 			console.log("feind: ", enemy)
		// 			console.log("gegen")
		// 			console.log("spieler: ", player.lp)
		// 		} else {
		// 			console.log(`${enemy.name} hat verfehlt`)
		// 		}
		// 	}
		// })
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
								onClick={setTargetToButtonId}
							/>
						))}
					</div>

					{/* playerSide */}
					<div className="flex w-full justify-evenly bg-blue-600">
						<div className="bg-gray-500 bg-opacity-30 p-2">
							<Player player={player} />
							<div>Player turn: {isPlayerTurn.toString()}</div>
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

						<CurrentTarget
							enemyIndex={enemyIndex}
							getEnemyByIndex={getEnemyByIndex}
						/>

						<Log log={log} />
					</div>
				</div>
			</div>
		</>
	)
}

// Export Component
export default Dashboard
