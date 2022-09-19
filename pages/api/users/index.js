// relevant Import
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/User"

// Definiere und exportiere eine asynchandler
export default async function handler(req, res) {
	// Destrukturierung der Request
	const { method } = req

	// Öffne eine Verbindung zur Datenbank
	await dbConnect()

	// Definiere ein Switch-Statement
	switch (method) {
		case "GET":
			try {
				const users = await User.find({})
				/* Finde alle Goals in der Datenbank */
				res.status(200).json({ success: true, data: users })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		case "POST":
			try {
				const user = await User.create(
					req.body
				) /* Erstelle ein neues Model in der Datenbank */
				res.status(201).json({ success: true, data: user })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
