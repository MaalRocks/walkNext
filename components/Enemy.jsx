const Enemy = ({ enemy, onClick, enemyId }) => {
	return (
		<div
			onClick={onClick}
			id={enemyId}
			className="bg-red-500 bg-opacity-50"
		>
			<div className=" p-2">
				<div id={enemyId}> {enemy.name} </div>
				<div id={enemyId}> {enemyId} </div>
				<div id={enemyId}>
					LP: {enemy.lp} / {enemy.maxLp}
				</div>
				<div id={enemyId}>
					MP: {enemy.mp} / {enemy.maxMp}
				</div>
				<div id={enemyId}>
					EXP: {enemy.exp} / {enemy.maxExp}
				</div>
			</div>
		</div>
	)
}

export default Enemy
