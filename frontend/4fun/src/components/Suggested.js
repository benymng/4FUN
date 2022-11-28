import React from 'react'
import { useState, useEffect } from 'react'
import Goal from './Goal'
import { IoFootstepsOutline } from "react-icons/io5";

export const Suggested = () => {
    const [goals, setGoals] = useState([
        { name: "Beginner", id: 1, repxsets: "3x5", icon: IoFootstepsOutline, selected: true},
        { name: "Intermediate", id: 2, repxsets: "4x8", icon: IoFootstepsOutline, selected: false },
        { name: "Advanced", id: 3, repxsets: "5x10", icon: IoFootstepsOutline, selected: false },
        { name: "Expert", id: 4, repxsets: "10x10", icon: IoFootstepsOutline, selected: false },
    ])

    const [selectedGoal, setSelectedGoal] = useState(1);

    useEffect(() => {
        setGoals(goals => goals.map(
            goal => { 
                if (goal.id == selectedGoal) {
                    return { ...goal, selected: true };
                } 
                return { ...goal, selected: false};
            }
        ))
    }, [selectedGoal])
    
  return (
    <div className="grid grid-cols-7 pr-1 place-items-start">
          <h1 className="col-span-1 text-xl text-lightGrey font-extrabold">S<br />U<br />G<br />G<br />E<br />S<br />T<br />E<br />D</h1>
          <div className="col-span-6 grid grid-rows-1 grid-cols-2 place-items-center gap-3">
              {goals.map(goal => 
                  <Goal name={goal.name} key={goal.id} id={goal.id} selected={goal.selected}  repxsets={goal.repxsets} icon={goal.icon} className="row-span-1 col-span-1" setSelectedGoal={setSelectedGoal}/>)}
          </div>
    </div>
    
  )
}

export default Suggested;