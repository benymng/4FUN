import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const NavButton = (props) => {
    const [State, setState] = useState({
        name: props.name,
        path: props.path,
        icon: props.icon,
        color: props.color ? "text-green outline-green hover:bg-green" : "text-white outline-white hover:bg-white"
    });

    let navigate = useNavigate();
    const routeChange = () => {
        navigate(State.path);
    }

    return (
        <div>
            <button
            onClick={() => routeChange()}
            className={`bg-darkGrey hover:text-black 
            transition-all duration-300 font-bold text-xl py-2 px-7 rounded-full
            outline outline-3
            grid grid-flow-col auto-cols-auto items-center gap-4 ` + State.color}>
                {React.createElement(State.icon, { style: { fontSize: "1.8rem"}})}
                <div className="col-span-3">{props.name}</div>
        </button>
            </div>
    )
}

export default NavButton;