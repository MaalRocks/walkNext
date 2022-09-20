const Player = ({ player }) => {
	return (
		<div className="flex flex-col">
			<div className="mx-auto text-2xl text-gray-400">
				{player.name} lvl {player.level}
			</div>
			<div className="m-1 flex flex-col items-center">
				<div className="text-xl font-extrabold text-red-900">
					LP: {player.lp} / {player.maxLp}
				</div>
				<div className="text-xl font-extrabold text-blue-900">
					MP: {player.mp} / {player.maxMp}
				</div>
				<div className="text-xl font-extrabold text-green-900">
					EXP: {player.exp} / {player.maxExp}
				</div>
			</div>
			<div className="m-1 flex flex-col justify-evenly">
				<div className="flex justify-evenly p-1">
					<div className="bg-gray-700 p-2">attack: {player.attack}</div>
					<div className="bg-gray-700 p-2">defence: {player.defence}</div>
				</div>
				<div className="flex justify-evenly p-1">
					<div>STR: {player.strength}</div>
					<div>DEX: {player.dexterity}</div>
					<div>INT: {player.intelligence}</div>
				</div>
			</div>
		</div>
	)
}

export default Player
