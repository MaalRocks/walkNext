// relevant imports
import mongoose from "mongoose"

// goalSchema dient als Blaupause für Einträge in der MongoDB Datenbank
const goalSchema = new mongoose.Schema(
	{
		title: {
			// Name des Goals

			type: String,
			required: [true, "Please provide a name for this goal."],
			maxlength: [60, "Name cannot be more than 60 characters"],
		},
		user: {
			// Zu welchem Benutzer gehört das Goal
			type: mongoose.Types.ObjectId,
			require: true,
			ref: "User",
		},
		description: {
			// Beschreibung des Goals

			type: String,
			required: [true, "Please provide a description for this goal."],
			maxlength: [60, "Name cannot be more than 60 characters"],
		},
		category: {
			// Kategorie des Goals

			type: String,
			required: [true, "Please specify the category of your goal."],
			maxlength: [40, "Species specified cannot be more than 40 characters"],
		},
		comments: {
			// Kommentare des Goals

			type: Array,
		},
		isDeleted: {
			// Check ob das Goal gelöscht wurde

			type: Boolean,
		},
		isChecked: {
			// Check ob das Goal abgeharkt wurde

			type: Boolean,
		},
		status: {
			// Status des Goals

			type: String,
			require: [true, "Please provide a status for this goal."],
		},
	},
	{
		timestamps: true,
	}
)

// Exportiere das Model
// Wenn das Model nicht vorhanden ist dann Benutze das Schema
// (Ja?)
export default mongoose.models?.Goal || mongoose.model("Goal", goalSchema)
