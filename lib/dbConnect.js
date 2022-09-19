// relevante imports
import mongoose from "mongoose"

// Definiere eine Variable in die der Wert aus der
// Umgebungsvariable NEXT_PUBLIC_MONGODB_URI aus .env.local gespeichert wird
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI

// Check ob die Variable vorhanden und gefüllt ist
if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	)
}

// Um eine gecachte Verbindung auch über Hot-Reloads aufrecht zu erhalten
// wird hier global benutzt
// Das verhindert exponentielles Wachsen wärend des verwendens der API Routen
let cached = global.mongoose

// Check ob cached vorhanden und befülltn ist
if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

// Definiere die Verbindung zur MongoDB Datenbank
async function dbConnect() {
	// Wenn bereits eine Verbindung aufgebaut ist, verwende diese
	if (cached.conn) {
		return cached.conn
	}

	// Check ob bereits eine Datenbankverbindung angefordert wurde
	// falls nicht wird eine Verbindung anhand der .env.local hergestellt
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose
		})
	}

	cached.conn = await cached.promise

	// Gibt die offene Verbindung zurück
	return cached.conn
}

// Exportiere Componente
export default dbConnect
