import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { goalTranslater } from '../resources/function';

export const Switch = (props) => {
    const [switchState, setSwitchState] = useState({
        name: props.name,
        id: props.id,
        selected: props.selected,
        color: props.selected == props.id ? "text-black bg-green outline-green" : "text-green outline-green hover:bg-green"
    });
    useEffect(() => {
        setSwitchState(switchState => ({
            ...switchState, ...{ selected: props.selected, color: props.selected == props.id ? "text-black bg-green outline-green" : "text-green outline-green hover:bg-green" }
        }));
    }, [props.selected]);

    const handleClick = (e) => {
        props.func(switchState.id);
    }

    return (
        <div>
            <button
                onClick={(e) => handleClick(e)}
                className={`text-green hover:text-black outline-green
            transition-all duration-300 font-bold text-sm p-2 rounded-full
            outline outline-3 inline-block ` + switchState.color}>
                {props.name}
            </button>
        </div>
    )
}

export default Switch;