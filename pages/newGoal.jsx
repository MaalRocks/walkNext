// relevant imports
import FormGoal from "../components/Forms/FormGoal"

// Definiere Componente
const NewGoal = () => {
	// Definiere welche felder das Formular hat
	// orientiert sich am goalSchema
	const goalForm = {
		title: "",
		user: localStorage.getItem("userID"),
		description: [],
		category: "",
		comments: [],
		status: "",
		isDeleted: false,
		isChecked: false,
	}

	// Returned und rendered die FormGoal Componente
	// mit den übergebenen Werten
	return (
		<FormGoal
			formId="add-goal-form"
			goalForm={goalForm}
		/>
	)
}

// exportiere Component
export default NewGoal
