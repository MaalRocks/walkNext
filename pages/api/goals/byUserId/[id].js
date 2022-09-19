// relevant Import
import dbConnect from "../../../../lib/dbConnect"
import Goal from "../../../../models/Goal"

// Definiere und exporiere einen asynchandler
export default async function handler(req, res) {
	// Destrukturierung der Request
	const {
		query: { id },
		method,
	} = req

	// Öffne eine Verbindung zur Datenbank
	dbConnect()

	// Definiere ein Switch-Statement
	switch (method) {
		case "GET" /* Bekomme ein Model anhand der ID */:
			try {
				const goals = await Goal.find({ user: id })
				if (!goals) {
					return res.status(400).json({ success: false })
				}

				res.status(200).json({ success: true, data: goals })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
