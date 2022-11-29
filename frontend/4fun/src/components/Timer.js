import React from 'react'
import { useState, useEffect } from 'react'

export const Timer = (props) => {
    const [time, setTime] = useState(props.startTime);
    const [running, setRunning] = useState(props.running);
    const timeFormatter = (time) => { 
        let hour = Math.floor(time / 3600);
        let minute = Math.floor((time - hour * 3600) / 60);
        let second = time - hour * 3600 - minute * 60;
        return (hour < 10 ? "0" : "") + hour + " : " + (minute < 10 ? "0" : "") + minute + " : " + (second < 10 ? "0" : "") + second;
    }
    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        setRunning(props.running);
    }, [props.running]);
    
  return (
      <div className="text-green text-4xl font-extrabold z-50 self-start">{ timeFormatter(time)}</div>
    
  )
}

export default Timer;