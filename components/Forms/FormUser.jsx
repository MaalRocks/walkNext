import { useState } from "react"
import { useRouter } from "next/router"
import { mutate } from "swr"

const FormUser = ({ formId, userForm, forNewUser = true }) => {
	const router = userRouter()
	const contentType = "application/json"
	const [errors, setErrors] = useState({})
	const [message, setMessage] = useState("")

	const [form, setForm] = useState({
		name: userForm.name,
		email: userForm.email,
		password: userForm.password,
		age: userForm.age,
		avatar_image_url: userForm.avatar_image_url,
		diet: userForm.diet,
		image_url: userForm.image_url,
		likes: userForm.likes,
		dislikes: userForm.dislikes,
	})

	/* Makes sure user info is filled for user name, password, and image url*/
	const formValidate = () => {
		let err = {}
		if (!form.name) err.name = "Name is required"
		// if (!form.email) err.email = "Email is required"
		if (!form.password) err.password = "Password is required"
		return err
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const errs = formValidate()
		if (Object.keys(errs).length === 0) {
			// forNewUser ? postData(form) : putData(form)
		} else {
			setErrors({ errs })
		}
	}

	return <div>Enter</div>
}

export default FormUser
