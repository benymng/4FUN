import React from 'react'
import { useState, useEffect } from 'react'


export const Goal = (props) => {
  const [goal, setGoal] = useState({
    name: props.name,
    repxsets: props.repxsets,
    icon: props.icon,
    selected: props.selected,
    id: props.id,
    color: props.selected ? "bg-white text-black" : "bg-darkGrey hover:bg-mediumGrey text-white",
    outline: props.selected ? "border-black" : "border-white"
  })

  const handleClick = (e) => {
    props.setSelectedGoal(goal.id);
  }

  useEffect(() => {
    setGoal(goal => ({ ...goal, ...{ selected: props.selected, color: props.selected ? "bg-white text-black" : "bg-darkGrey hover:bg-mediumGrey text-white", outline: props.selected ? "border-black" : "border-white" } }))}, [props.selected]);
  
  return (
    <div className={`grid grid-rows-5 rounded-3xl p-3 justify-items-center w-32 h-32 gap-3 transition-all duration-300 ` + goal.color} 
      onClick={(e) => handleClick(e)}>
      <div className={`row-span-2 border-2  w-12 h-12 rounded-full p-2 transition-[border-color] duration-300 ` + goal.outline}><center>{React.createElement(goal.icon, { style: { fontSize: "1.6rem" } })}</center></div>
      <h1 className="row-span-1 font-bold text-sm mt-2">{goal.name}</h1>
      <h1 className="row-span-2 font-extrabold text-xl mt-1">{goal.repxsets}</h1>
    </div>
  )
}

export default Goal;