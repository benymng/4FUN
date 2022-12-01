import React from 'react'
import quotes from '../resources/quotes';
import { useState, useEffect } from 'react'

export const Motivation = () => {
    const [quote, setQuote] = useState(0);

    useEffect(() => { 
        const interval = setInterval(() => {
            let rand = Math.floor(Math.random() * quotes.length);
            setQuote(rand);
        }, 3000);
        return () => clearInterval(interval);
    })

    return (
        <h1 className="text-white text-md font-extrabold h-20 lg:mt-8 animate-type text-brand-accent will-change-transform"><center>{`"` + quotes[quote] + `"`}</center></h1>
  )
}

export default Motivation;