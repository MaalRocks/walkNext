const Player = ({ player }) => {
	return (
		<div className="flex flex-col">
			<div className="mx-auto"> {player.name} </div>
			<div>
				LP: {player.lp} / {player.maxLp}
			</div>
			<div>
				MP: {player.mp} / {player.maxMp}
			</div>
			<div>
				EXP: {player.exp} / {player.maxExp}
			</div>
			<div>
				<div>STR: {player.strength}</div>
				<div>DEX: {player.dexterity}</div>
				<div>INT: {player.intelligence}</div>
			</div>
		</div>
	)
}

export default Player
