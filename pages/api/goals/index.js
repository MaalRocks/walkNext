// relevant Import
import dbConnect from "../../../lib/dbConnect"
import Goal from "../../../models/Goal"

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
				const goals = await Goal.find({})
				/* Finde alle Goals in der Datenbank */
				res.status(200).json({ success: true, data: goals })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		case "POST":
			try {
				const goal = await Goal.create(
					req.body
				) /* Erstelle ein neues Model in der Datenbank */
				res.status(201).json({ success: true, data: goal })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
