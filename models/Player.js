// relevant imports
import mongoose from "mongoose"

// playerSchema dient als Blaupause für Einträge in der MongoDB Datenbank
const playerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		level: {
			type: Number,
		},
		strength: {
			type: Number,
		},
		dexterity: {
			type: Number,
		},
		intelligence: {
			type: Number,
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
	},
	{
		// Schreibe Zeitstempel zu jedem Eintrag
		timestamps: true,
	}
)

export default mongoose.models?.Player || mongoose.model("Player", playerSchema)
