import React, { useState, useEffect } from "react";
import { months } from "../resources/function";
import { timeFormatter } from "../resources/function";
import { Bars } from 'react-loader-spinner';


export const Sessions = () => {
    const [graphcss, setGraphcss] = useState("hidden");
    const [loadcss, setLoadcss] = useState("block");

    const [loading, setLoading] = useState(true);
    const [workoutSummary, setWorkoutSummary] = useState(null);
    const [workoutSummaryStr, setWorkoutSummaryStr] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch("https://4fun-pi.vercel.app/get-workout-summary").then(response => {
            if (response.ok) {
                return response.json();
            } throw response;
        }).then(data => { setWorkoutSummary(data) })
            .catch(error => {
                console.log(error);
            }).finally(setLoading(false))
    }, [])

    useEffect(() => {
        if (workoutSummary) {
            let temp = ""
            workoutSummary.forEach((summary) => {
                var date = new Date(summary.timestamp);
                temp = temp + months[date.getMonth()] + " " + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + " - " + timeFormatter(summary.workoutLength) + "\n";
            })
            if (temp != workoutSummaryStr) {
                setWorkoutSummaryStr(temp);
            }
            setLoadcss("hidden");
            setGraphcss("block");
        }
    }, [workoutSummary])

    if (loading) return "loading";
    if (error) return error;
    return (
        <div className="h-12">
            <div className={`grid place-items-center    ` + loadcss}><Bars color="#B8F993" height="50" width="50" /></div>

            <div className={graphcss}>
            <h1 className="grid col-span-1 h-12 text-sm font-extrabold inline-block overflow-scroll whitespace-pre-line">{workoutSummaryStr}</h1></div>
        </div>
    )
    
}

export default Sessions;
