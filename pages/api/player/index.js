// relevant Import
import dbConnect from "../../../lib/dbConnect"
import Player from "../../../models/Player"

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
				const players = await Player.find({})
				/* Finde alle Goals in der Datenbank */
				res.status(200).json({ success: true, data: players })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		case "POST":
			try {
				const player = await Player.create(
					req.body
				) /* Erstelle ein neues Model in der Datenbank */
				res.status(201).json({ success: true, data: player })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
