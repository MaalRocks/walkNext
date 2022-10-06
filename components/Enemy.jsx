import Image from "next/image"
import { useState } from "react"
import defaultSprite from "../assets/sprites/abc.jpg"

const spriteSize = "150"

const Enemy = ({ enemy, onClick, index }) => {
	if (enemy.spritePath === null) enemy.spritePath = defaultSprite

	return (
		<div className="bg-red-900 p-2 text-center">
			<div>
				{enemy.name} {enemy.isDead ? "dead" : ""}
			</div>
			<div>
				<Image
					src={enemy.spritePath}
					width={spriteSize}
					height={spriteSize}
					layout="responsive"
					priority
				/>
			</div>
			<div className="text-sm text-gray-300"> index im state: {index} </div>
			<div>
				LP: {enemy.lp} / {enemy.maxLp}
			</div>
			<div>
				MP: {enemy.mp} / {enemy.maxMp}
			</div>
			<div>
				EXP: {enemy.exp} / {enemy.maxExp}
			</div>
			<button
				className="bg-red-800 p-1"
				onClick={onClick}
				id={index}
			>
				Anvisieren
			</button>
		</div>
	)
}

export default Enemy
