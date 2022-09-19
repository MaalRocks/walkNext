// relevant imports
import { useState } from "react"
import { useRouter } from "next/router"
import { mutate } from "swr"
import Input from "../Inputs/Input"
import Button from "../Button"
import { check } from "prettier"

// Definiere Componente und welche Parameter diese hat
const FormGoal = ({ formId, goalForm, forNewGoal = true }) => {
	// Instanziere Router
	const router = useRouter()
	// Definiere einen contentType
	const contentType = "application/json"

	// Definiere States
	const [errors, setErrors] = useState({})
	const [message, setMessage] = useState("")

	// Definiere State der ein Object als initialen Wert hat
	const [form, setForm] = useState({
		title: goalForm.title,
		user: goalForm.user,
		description: goalForm.description,
		category: goalForm.category,
		comments: goalForm.comments,
		isDeleted: goalForm.isDeleted,
		isChecked: goalForm.isChecked,
		status: goalForm.status,
	})

	/* Die PUT methode editiert einen existierenden Eintrag in der MongoDB Datenbank */
	// Definiere Componente und welche Parameter diese hat
	const putData = async (form) => {
		// Destrukturierung des router.querys
		const id = form.user

		// Try-Catch Block
		try {
			// Fetch wird ausgeführt und die Response wird in eine Variabel geschrieben
			const res = await fetch(`/api/goals/${id}`, {
				method: "PUT",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(form),
			})

			// Schmeißt einen Error mit einem Statuscode wenn die Fetch API Request scheitert
			if (!res.ok) {
				throw new Error(res.status)
			}

			// Parse die Response zu JSON
			// und schreibe sie in ein Objekt mit dem Key="data"
			const { data } = await res.json()

			// Weiß nicht genau
			// Eventuell:
			// macht eine Anfrage an die API und vergleicht das Ergebniss der Response mit local gespeicherten Daten
			// Es werden nur die Daten geupdatet die sich auch verändert haben
			// schnellere darstellung der aktualisierten Daten
			mutate(`/api/goals/${id}`, data, false)
			// Leite den Benutzer weiter zum Login
			router.push("/")
		} catch (error) {
			// Setze den message-State auf den angegebenen String
			setMessage("Failed to update goal")
		}
	}

	// Die POST methode erstellt einen neuen Eintrag in der MongoDB Datenbank
	const postData = async (form) => {
		// Try-Catch Block
		try {
			// POST an goals API mit den Werten aus dem Formular als payload
			const res = await fetch("/api/goals", {
				method: "POST",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(form),
			})

			// Schmeiße Error mit status falls die Fetch API Request scheitert
			if (!res.ok) {
				throw new Error(res.status)
			}

			// Falls Request erfolgreich war wird der Benutzer an /[id] weitergeleitet
			// wobei [id] = id des users aus dem form
			router.push(`/${form.user}`)
		} catch (error) {
			setMessage("Failed to add goal")
		}
	}

	// Definiere handleChange Funktion
	const handleChange = (e) => {
		// Definiere eine Variable die als Inhalt den Auslöser des events hat
		const target = e.target
		const name = target.name

		// Check on es sich um eine checkboy handelt
		console.log("checked :", target.type)
		console.log("checked :", target.checked)
		console.log("checked :", target.value)
		const value = target.type === "checkbox" ? target.checked : target.value

		// Definiere eine Variabel die den formn des Eventauslösers bekommt
		const form = target.form
		// setzt den State des Formulares auf den akuellen wert

		// Kopiere das vorherige form-objekt mit dem spread operator
		// dann überschreibe das was unter name steht mit dem neuen wert

		console.log("name: ", [name][0])
		console.log("value: ", value)

		setForm({
			...form,
			[name]: value,
		})
	}

	console.log("form for validate: ", form)

	// Check ob die angegebenen Felder ausgefüllt wurden
	const formValidate = () => {
		console.log("form.title :", form)
		let err = {}
		if (!form.title) err.title = "Titel ist erforderlich"
		if (!form.user) err.user = "Besitzer ist erforderlich"
		if (!form.description) err.description = "Beschreibung ist erforderlich"
		if (!form.category) err.category = "Kategorie ist erforderlich"

		// Log errors in die Konsole
		console.log("errors auf FormGoal: ", err)

		return err
	}

	// Definiere handleSubmit Funktion
	const handleSubmit = (e) => {
		// Verhindert Default
		e.preventDefault()

		// Ruft formValidate auf und schreibt das Ergebniss in einer Variabel
		const errs = formValidate()

		// Check die länge des error-Objektes
		if (Object.keys(errs).length === 0) {
			// Falls es keine errors gabe(länge === 0)
			// Check ob forNewGoal gesetzt wurde
			// Falls ja: führe die postData() Funktion aus
			// Falls nein: führe die putData() Funktion aus
			forNewGoal ? postData(form) : putData(form)
		} else {
			// Bei errors länger als 0
			setErrors({ errs })
		}
	}

	// Return gestyltes JSX
	return (
		<>
			<form
				id={formId}
				onSubmit={handleSubmit}
				className="flex h-fit w-80 flex-col rounded-md  bg-black bg-opacity-75 p-2"
			>
				<div className="flex flex-col bg-black">
					<input
						type="text"
						maxLength="20"
						name="title"
						id="title"
						title="title"
						placeholder="Bitte titel angeben"
						value={form.title}
						onChange={handleChange}
						required
						className="bg-transparent p-2 text-red-200"
					/>
					<input
						type="text"
						maxLength="20"
						name="user"
						id="user"
						placeholder={form.user}
						value={form.user}
						onChange={handleChange}
						required
						readOnly
						className="bg-transparent p-2 text-red-200 read-only:border-gray-400 focus:border-gray-400 active:border-gray-400"
					/>
					{/* <label htmlFor="description">Beschreibung</label> */}
					<textarea
						type="text"
						maxLength="120"
						name="description"
						placeholder="Beschreibung"
						value={form.description}
						onChange={handleChange}
						required
						className="bg-transparent p-2 text-red-200"
					/>
					{/* <label htmlFor="category">Kategorie</label> */}
					<input
						type="text"
						maxLength="30"
						name="category"
						placeholder="Kategorie"
						value={form.category}
						onChange={handleChange}
						className="bg-transparent p-2 text-red-200"
					/>
					{/* <label htmlFor="comments">Kommentar</label> */}
					<textarea
						type="text"
						name="comments"
						maxLength="60"
						placeholder="Kommentar"
						value={form.comments}
						onChange={handleChange}
						className="bg-transparent p-2 text-red-200"
					/>
				</div>

				<div className="flex flex-auto flex-col justify-evenly rounded-b-xl bg-black bg-opacity-25 p-2">
					<div className="m-1 flex justify-evenly text-red-200">
						<div className="flex flex-col items-center justify-center ">
							<label htmlFor="isDeleted">Gelöscht</label>
							<input
								type="checkbox"
								name="isDeleted"
								checked={form.isDeleted}
								onChange={handleChange}
								className="
									m-1
									h-5
									w-5
									rounded-sm
										border-red-200
										bg-black
										text-black

										transition-all checked:border-red-200 focus:border-red-200
										focus:ring-black
										active:border-red-200
										"
							/>
						</div>
						<div className="flex flex-col items-center justify-center ">
							<label htmlFor="isChecked">Abgehakt</label>
							<input
								type="checkbox"
								name="isChecked"
								checked={form.isChecked}
								onChange={handleChange}
								className="
									m-1
									h-5
									w-5
									rounded-sm
										border-red-200
										bg-black
										text-black
										transition-all checked:border-red-200 focus:border-red-200
										focus:ring-black
										active:border-red-200
										"
							/>
						</div>
					</div>
					<div className="mt-3 flex justify-center pb-1">
						<Button
							className="w-32"
							type="submit"
							text="Submit"
						/>
					</div>
				</div>
			</form>
			<p>{message}</p>
			<div>
				{Object.keys(errors).map((err, index) => (
					<li key={index}>{err}</li>
				))}
			</div>
		</>
	)
}

export default FormGoal
