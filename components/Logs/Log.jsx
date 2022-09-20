const Log = ({ log }) => {
	return (
		<textarea
			name="log"
			id="log"
			cols="30"
			rows="10"
			value={log}
			className="bg-gray-900"
			readOnly
		></textarea>
	)
}

export default Log
