const Enemy = ({ enemy, onClick, index, className }) => {
  return (
    <div
      onClick={onClick}
      id={index}
      className={className}
    >
      <div className=" p-2">
        <div id={index}>
          {enemy.name} {enemy.isDead ? "dead" : ""}
        </div>
        <div id={index}> index im state: {index} </div>
        <div id={index}>
          LP: {enemy.lp} / {enemy.maxLp}
        </div>
        <div id={index}>
          MP: {enemy.mp} / {enemy.maxMp}
        </div>
        <div id={index}>
          EXP: {enemy.exp} / {enemy.maxExp}
        </div>
      </div>
    </div>
  )
}

export default Enemy
