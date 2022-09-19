// relevant imports
import mongoose from "mongoose"

// userSchema dient als Blaupause für Einträge in der MongoDB Datenbank
const userSchema = new mongoose.Schema(
	{
		name: {
			// Name des Benutzers

			type: String,
			required: [true, "Please provide a name for the user."],
			maxlength: [60, "Name cannot be more than 60 characters"],
		},
		email: {
			// Email des Benutzers

			type: String,
			// required: [true, "Please provide a email for the user."],
			maxlength: [60, "Email cannot be more than 60 characters"],
		},
		password: {
			// Passwort des Benutzers

			type: String,
			required: [true, "Please provide a password for the user."],
			maxlength: [40, "Password cannot be more than 40 characters"],
		},
		age: {
			// Alter des Benutzers

			type: Number,
		},
		diet: {
			/* List of dietary needs, if applicable */

			type: Array,
		},
		avatar_image_url: {
			/* Url to avatar image */

			type: String,
		},
		likes: {
			/* List of things your pet likes to do */

			type: Array,
		},
		dislikes: {
			/* List of things your pet does not like to do */

			type: Array,
		},
	},
	{
		// Schreibe Zeitstempel zu jedem Eintrag
		timestamps: true,
	}
)

// Exportiere das Model
// Wenn das Model nicht vorhanden ist dann Benutze das Schema
// (Ja?)
export default mongoose.models?.User || mongoose.model("User", userSchema)
