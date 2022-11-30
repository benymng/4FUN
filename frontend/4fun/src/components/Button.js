import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { goalTranslater } from '../resources/function';

export const Button = (props) => {
    const [buttonState, setButtonState] = useState({
        name: props.name,
        path: props.path,
        goal: props.goal,
        time: props.time
    });
    useEffect(() => {
        setButtonState(buttonState => ({
            ...buttonState, ...{ goal: props.goal}
        }));
    }, [props.goal]);
    useEffect(() => {
        setButtonState(buttonState => ({
            ...buttonState, ...{ time: props.time }
        }));
    }, [props.time]);
    let navigate = useNavigate();
    const routeChange = () => {
        navigate(buttonState.path, {
            state: {
                goal: buttonState.goal,
                time: buttonState.time
            }
        });
    }

    return (
        <div>
            <button
            onClick={() => routeChange()}
                className={`bg-darkGrey text-green hover:bg-green hover:text-black outline-green
            transition-all duration-300 font-bold text-xl py-2 px-7 rounded-full
            outline outline-3
            grid grid-flow-col auto-cols-auto items-center gap-4 w-32 `}>
                <div className="col-span-3">{props.name}</div>
            </button>
            </div>
    )
}

export default Button;