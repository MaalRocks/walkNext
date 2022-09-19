// relevant Import
import dbConnect from "../../../lib/dbConnect"
import Goal from "../../../models/Goal"

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
				const goal = await Goal.findById(id)

				// Check ob ein Eintrag zurück kam
				// Sende das Ergebiss als HTML-status zurück
				if (!goal) {
					return res.status(400).json({ success: false })
				}
				res.status(200).json({ success: true, data: goal })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case "PUT" /* Editiere ein Model anhand der ID */:
			try {
				// Mongoose Datenbank-query um einen Eintrag anhand seiner ID zu Editieren
				const goal = await Goal.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				})

				console.log(req.body)

				// Check ob eine Updatebestätigung zurück kam
				// Sende das Ergebniss als HTML-status zurück
				if (!goal) {
					return res.status(400).json({ success: false })
				}
				res.status(200).json({ success: true, data: goal })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case "DELETE" /* Lösche ein Model anhand der ID */:
			try {
				// Mongoose Datenbank-query um einen Eintrag anhand seiner ID zu löschen
				const deletedGoal = await Goal.deleteOne({ _id: id })

				// Check ob eine Löschbestätigung zurück kam
				// Sende das Ergebiss als HTML-status zurück
				if (!deletedGoal) {
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
