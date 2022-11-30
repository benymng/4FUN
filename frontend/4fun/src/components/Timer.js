import React from 'react'
import { useState, useEffect } from 'react'
import { timeFormatter } from '../resources/function';

export const Timer = (props) => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(props.running);
    
    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => { return prevTime + 1 });
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        setRunning(props.running);
    }, [props.running]);

    useEffect(() => { 
        if (props.func) { props.func(time) };
    }, [time])
    
  return (
      <div className="text-green text-4xl font-extrabold z-50 self-start">{ timeFormatter(time)}</div>
    
  )
}

export default Timer;