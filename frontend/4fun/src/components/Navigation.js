import React from 'react'
import { useState, useEffect } from 'react'
import NavButton from './NavButton.js'
import { GiWeightLiftingUp } from "react-icons/gi";
import { BiStats } from 'react-icons/bi';


export const Navigation = (props) => {

  const [navBar, setNavBar] = useState([
    { name: "Home", id: 1, path: "/", icon: GiWeightLiftingUp, color: true},
    { name: "Stats", id: 2, path: "/stats", icon: BiStats, color: false }
  ])

  return (
    <div className="grid grid-cols-2 place-items-center gap-3 self-end">
      {navBar.map(button =>
        <NavButton name={button.name} key={button.id} path={button.path} icon={button.icon} color={button.color} />)
      }
    </div>
  );
}

export default Navigation;