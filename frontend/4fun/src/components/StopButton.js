import React, { useEffect } from 'react'
import { useState } from 'react'

export const StopButton = (props) => {
    const [stopButton, setStopButton] = useState({
        name: "Pause",
        value: false
    })

    const handleClick = () => {
        props.pause(stopButton.value);
        setStopButton(stopButton => ({ ...stopButton, ...{ value: !stopButton.value } }));
    }

    useEffect(() => { 
        if (stopButton.value == false) {
            setStopButton(stopButton => ({ ...stopButton, ...{ name: "Pause" } }));
        } else { 
            setStopButton(stopButton => ({ ...stopButton, ...{ name: "Resume" } }));
        }
    }, [stopButton.value])
  return (
      <div className="justify-self-center">
          <button className="bg-green text-black hover:bg-darkGrey hover:text-green hover:outline-green
            transition-all duration-300 font-bold text-xl py-2 px-7 rounded-full
            outline outline-3 outline-darkGrey w-32
            grid grid-flow-col auto-cols-auto items-center gap-4" onClick={() => handleClick()}>{stopButton.name}</button></div>
  )
}

export default StopButton;
