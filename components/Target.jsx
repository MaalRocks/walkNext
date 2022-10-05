const Target = ({ target }) => {
	return (
		<div className="break-word flex h-24 w-36 flex-col">
			<div>Momentanes Ziel: </div>

			<div className="flex flex-col items-center">
				<div>{target.name}</div>
				{target.lp ? (
					<div>
						HP: {target.lp} / {target.maxLp}
					</div>
				) : (
					<div></div>
				)}
			</div>

			{/* <div>
				{Object.entries(target).map((entry, index) => (
					<div key={index}>{`${entry[0]} : ${entry[1]}`}</div>
				))}
			</div> */}
		</div>
	)
}

export default Target
