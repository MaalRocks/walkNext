const CurrentTarget = ({ enemyIndex, getEnemyByIndex }) => {
	if (!enemyIndex) return <div>Kein Gegner ausgewählt</div>

	const currentTarget = getEnemyByIndex(enemyIndex)

	if (!currentTarget) {
		return <div>Kein Ziel ausgewählt</div>
	} else if (currentTarget) {
		return (
			<div className="break-word flex h-24 w-36 flex-col">
				<div>Momentanes Ziel: </div>

				<div className="flex flex-col items-center">
					<div>{currentTarget.name}</div>
					<div>
						HP: {currentTarget.lp} / {currentTarget.maxLp}
					</div>
				</div>
			</div>
		)
	}

	return <div>asd</div>
}

export default CurrentTarget
