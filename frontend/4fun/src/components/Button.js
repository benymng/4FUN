import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const Button = (props) => {
    const [buttonState, setButtonState] = useState({
        name: props.name,
        path: props.path,
        goal: props.goal,
        startTime: props.time
    });
    useEffect(() => {
        setButtonState(buttonState => ({
            ...buttonState, ...{ goal: props.goal}
        }));
    }, [props.goal]);

    let navigate = useNavigate();
    const routeChange = () => {
        navigate(buttonState.path, {
            state: {
                goal: buttonState.goal,
                startTime: buttonState.startTime
            }
        });
    }

    return (
        <div>
            <button
            onClick={() => routeChange()}
                className={`bg-green text-black hover:bg-darkGrey hover:text-green hover:outline-green
            transition-all duration-300 font-bold text-xl py-2 px-7 rounded-full
            outline outline-3 outline-darkGrey
            grid grid-flow-col auto-cols-auto items-center gap-4 `}>
                <div className="col-span-3">{props.name}</div>
            </button>
            </div>
    )
}

export default Button;