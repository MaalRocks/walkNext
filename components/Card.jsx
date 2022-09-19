// relevant Imports
import Link from "next/link"
import Button from "./Button"

// Definiere Componente und welche Parameter diese hat
const Card = ({
	avatarImageUrl,
	title,
	description,
	category,
	comments,
	isChecked,
	status,
	userID,
	contentID,
	onClick,
	onChange,
}) => {
	// Return gestyltes JSX
	return (
		<div
			className="
				flex 
				h-96 
				w-96
				rounded-md
				bg-black
				bg-opacity-70
				text-white
			"
		>
			<div
				className="
					flex 
					w-full 
					flex-grow flex-col 
					rounded-lg
					bg-black 
					bg-opacity-40
				"
			>
				<div className="flex items-center justify-around">
					<p
						className="
							bg-transparent
							p-2
							text-center
							text-2xl
							text-red-200
						"
					>
						{title}
					</p>
					<p
						className="
							text-1xl
							bg-transparent
							p-2
							text-center
							text-red-200
						"
					>
						Status {status}
					</p>
				</div>

				<div className="flex flex-grow items-center justify-center">
					<div className="flex h-full flex-grow flex-col items-center justify-center">
						<p
							className="
								bg-transparent
								p-2
								text-center
								text-2xl
								text-red-200
							"
						>
							<span className="text-xs">Kategorie:</span> {category}
						</p>
						<div className="flex h-full w-full flex-grow items-center justify-center">
							<label
								htmlFor="isChecked"
								hidden
							/>
							<input
								type="checkbox"
								onChange={onChange}
								className="
									m-1
									h-10
									w-10
									rounded-sm
										border-red-200
										bg-black
										text-black
										transition-all
										checked:border-red-200
										focus:border-red-200
										focus:ring-black
										active:border-red-200
									"
							/>
						</div>
					</div>
					<div className="m-2 flex h-full flex-grow flex-col items-center justify-center">
						<textarea
							className="
								bg-transparent
								text-red-200
							"
							defaultValue={description}
							name="txtAreadescription"
						></textarea>
						<textarea
							className="
								bg-transparent
								text-red-200
							"
							defaultValue={comments}
							name="txtAreaComments"
						></textarea>
					</div>
				</div>

				<div className="mb-5 flex items-center justify-evenly">
					<Link href={`/${contentID}/edit`}>
						[Hier muss ne alternative zum button hin]
						{/* <Button
							text="Edit"
							className="h-12 w-28"
						/> */}
					</Link>

					<Button
						className="h-12 w-28"
						text="Löschen"
						id={contentID}
						onClick={onClick}
					/>
				</div>
			</div>
		</div>
	)
}

// export Component
export default Card
