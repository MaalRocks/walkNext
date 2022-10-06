// relevant imports
import mongoose from "mongoose"

// enemySchema dient als Blaupause für Einträge in der MongoDB Datenbank
const enemySchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		level: {
			type: Number,
		},
		eid: {
			type: String,
		},
		spritePath: {
			type: String,
		},
		attack: {
			type: Number,
		},
		defence: {
			type: Number,
		},
		lp: {
			type: Number,
		},
		maxLp: {
			type: Number,
		},
		mp: {
			type: Number,
		},
		maxMp: {
			type: Number,
		},
		exp: {
			type: Number,
		},
		maxExp: {
			type: Number,
		},
		inventory: {
			type: Array,
		},
		isDead: {
			type: Boolean,
		},
		category: {
			type: String,
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
export default mongoose.models?.Enemy || mongoose.model("Enemy", enemySchema)
