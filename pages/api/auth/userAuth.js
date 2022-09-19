// Relevant Imports
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/User"

// Asynchroner handler der die Request(req) annimmt
export default async function handler(req, res) {
	// Schreibe den Inhalt aus der Request(req) in eine Variable
	const body = req.body

	// Prüfe ob die relevanten Felder einen Wert zugewiesen bekommen haben
	// Return frühzeitig falls nicht
	if (!body.userEmail || !body.userPassword) {
		// Sende einen HTTP bad request error code
		return res.status(400).json({ data: "Daten unvollständig" })
	}

	// Datenbank verbindung wird geöffnet
	await dbConnect()

	// Datenbank Abfrage die anhand des User-Models
	// ein Objekt zurück gibt
	const user = await User.findOne({
		email: body.userEmail,
		password: body.userPassword,
	})

	// Prüfe ob user befüllt ist
	if (!user)
		// Sende einen HTTP bad request error code
		return res.status(400).json({ data: "Benutzer wurde nicht gefunden" })

	// Set Cookie on Browser
	// Set Cookie on Browser
	// const cookies = new Cookies(req, res)
	// cookies.set("userID", `${user._id}`)
	// cookies.set("loggedIn", true)
	// console.log("###########################")
	// console.log("server cookie userID: ", user._id)

	// Falls alles geklappt hat schreibe user in die data Eigenschaft der Response(res)
	// und schicke dieses zurück
	return res.status(200, "Benutzer gefunden").json({ data: user })
}
