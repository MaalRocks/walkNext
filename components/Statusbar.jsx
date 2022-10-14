const Statusbar = ({ valueName, value, maxValue, color }) => {
	return (
		<div className={`text-xl font-extrabold text-${color}-900`}>
			{valueName}: {value} / {maxValue}
		</div>
	)
}

export default Statusbar
