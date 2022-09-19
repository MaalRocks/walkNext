// relevant Import
import dbConnect from "../../../lib/dbConnect"
import Enemy from "../../../models/Enemy"

// Definiere und exporiere einen asynchandler
export default async function handler(req, res) {
	// Destrukturierung der Request
	const {
		query: { id },
		method,
	} = req

	// Öffne eine Verbindung zur Datenbank
	await dbConnect()

	// Definiere ein Switch-Statement
	switch (method) {
		case "GET" /* Bekomme ein Model anhand der ID */:
			try {
				// Mongoose Datenbank-query um einen Eintrag anhand seiner ID zu finden
				const enemy = await Enemy.findById(id)

				// Check ob ein Eintrag zurück kam
				// Sende das Ergebiss als HTML-status zurück
				if (!enemy) {
					return res.status(400).json({ success: false })
				}
				res.status(200).json({ success: true, data: enemy })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case "PUT" /* Editiere ein Model anhand der ID */:
			try {
				// Mongoose Datenbank-query um einen Eintrag anhand seiner ID zu Editieren
				const enemy = await Enemy.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				})

				// Check ob eine Updatebestätigung zurück kam
				// Sende das Ergebniss als HTML-status zurück
				if (!enemy) {
					return res.status(400).json({ success: false })
				}
				res.status(200).json({ success: true, data: enemy })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case "DELETE" /* Lösche ein Model anhand der ID */:
			try {
				// Mongoose Datenbank-query um einen Eintrag anhand seiner ID zu löschen
				const deletedEnemy = await Enemy.deleteOne({ _id: id })

				// Check ob eine Löschbestätigung zurück kam
				// Sende das Ergebiss als HTML-status zurück
				if (!deletedEnemy) {
					return res.status(400).json({ success: false })
				}
				res.status(200).json({ success: true, data: {} })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		default:
			res.status(400).json({ success: false })
			break
	}
}
