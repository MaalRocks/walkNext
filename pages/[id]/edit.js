// relevant imports
import { useRouter } from "next/router"
import useSWR from "swr"
import FormGoal from "../../components/Forms/FormGoal"

// Definiere einen SWR-Fetcher
const fetcher = (url) =>
	// Fetch per fetch()
	fetch(url)
		// Response zu JSON parsen
		.then((res) => res.json())
		// Schreibe json in jsob.data
		.then((json) => json.data)

// Definiere Componente
const EditGoal = () => {
	// Instanziere router
	const router = useRouter()

	// Destrukturierung des router.querys
	const { id } = router.query

	// Destrukturierung der SWR Responses
	const { data: goal, error } = useSWR(id ? `/api/goals/${id}` : null, fetcher)

	// Check ob es Errors gab und ob goal gefüllt ist
	if (error) return <p>Failed to load</p>
	if (!goal) return <p>Loading...</p>

	// Definiere goalForm
	const goalForm = {
		name: goal.name,
		user: localStorage.getItem("userID"),
		description: goal.description,
		category: goal.category,
		comments: goal.comments,
		status: goal.status,
	}

	// Return JSX mit Werten
	return (
		<FormGoal formId="edit-goal-form" goalForm={goalForm} forNewGoal={false} />
	)
}

// Export Component
export default EditGoal
