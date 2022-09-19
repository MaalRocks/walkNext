// relevant Imports
import Head from "next/head"
import Card from "../../components/Card"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Navbar from "../../components/Navbar"

// Inizialisiere Componente und definiere welche Parameter diese annimmt
// Argumente kommen aus der getServerSideProps()
const Dashboard = () => {
	const router = useRouter()
	// Definiere States
	// goals-State der mit dem Wert aus goalsDB initialisiert wird
	const [goals, setGoals] = useState([])

	//message
	const [message, setMessage] = useState()

	// useEffect Hook wird instanziert
	useEffect(() => {
		const userIdFromLocalStorage = localStorage.getItem("userId")
		const getGoalsByUserID = async (userId) => {
			try {
				const res = await fetch(`/api/goals/byUserId/${userId}`)

				if (!res.ok) {
					throw new Error(res.status)
				}

				const { data } = await res.json()
				setGoals(data)
			} catch (error) {
				setMessage("Failed to add goal")
			}
		}

		getGoalsByUserID(userIdFromLocalStorage)
	}, [])

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
	const handleChange = (e) => {
		// Definiere eine Variable die als Inhalt den Auslöser des events hat
		const target = e.target

		console.log("target: ", target.id)
		console.log("targetChecked1: ", target.checked)

		console.log("isChecked :", isChecked)
		console.log("id :", _id)

		console.log("targetChecked2: ", target.checked)
	}

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

	// Render HTML mit JSX Werten
	return (
		<>
			{/* Header componente mit meta informationen für die Seite */}
			<Head>
				<title>Dashboard</title>
			</Head>

			{/* Main Block - Hauptinhalt der Seite */}
			<div className="flex h-screen w-full flex-col">
				{/* Componente: logout anhand von userData */}
				{/* <Navbar data={user} /> */}

				{/* 
					Hier durch das goals array loopen und for 
					jeden eintrag eine Card generieren 
				*/}
				<div className="flex h-full flex-wrap items-center justify-evenly">
					{goals.map((goal, index) => (
						// Wenn ja dann stelle das goals als Card da
						<Card
							key={index}
							avatarImageUrl={goal.avatarImageUrl}
							title={goal.title}
							description={goal.description}
							category={goal.category}
							comments={goal.comments}
							isChecked={goal.isChecked}
							status={goal.status}
							userID={goal.user}
							contentID={goal._id}
							onChange={handleChange}
							onClick={handleDelete}
						/>
					))}
				</div>
			</div>
		</>
	)
}

// Export Component
export default Dashboard
