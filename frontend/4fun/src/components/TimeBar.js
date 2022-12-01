import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryGroup, VictoryScatter, VictoryBar, VictoryLabel} from "victory";
import { Bars } from 'react-loader-spinner';
import { months } from "../resources/function";
import { timeFormatter } from "../resources/function";

export const DistanceGraph = () => {
    const [graphcss, setGraphcss] = useState("hidden");
    const [loadcss, setLoadcss] = useState("block");


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [workoutSummary, setWorkoutSummary] = useState(null);

    const [data, setData] = useState([
        { x: 0, y: 0, time: 0 },
    ])
    
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

    useEffect(
        () => {
            if (workoutSummary) {
                let temp = [];
                for (var i = 0; i < workoutSummary.length; i++) {
                    var date = new Date(workoutSummary[i].timestamp);
                    var time = months[date.getMonth()] + " " + date.getDate() + " ";
                    temp.push({
                        x:i,
                        y: workoutSummary[i].workoutLength,
                        time: time
                    })
                }
                if (temp != data) {
                    setData(temp);
                }
                setLoadcss("hidden");
                setGraphcss("block");

            }
        },
        [workoutSummary])
    if (loading) return loading;
    if (error) return error;


    return (
        <div className="h-36 grid place-items-center">
            <div className={loadcss}><Bars color="#B8F993" height="50" width="50" /></div>
            <div className={`grid w-auto h-36 m-0 overflow-scroll transition-all duration-100 ` + graphcss}>
                <VictoryChart padding={{ left: 80, right: 80, top: 25, bottom: 60 }} height={200} width={600}>
                    <VictoryAxis
                        label="Time (s)"
                        style={{
                            axisLabel: { fill: "#ffffff", fontSize: 25, padding: 30 },
                            axis: {
                                stroke: '#ffffff',
                            },
                            ticks: {
                                stroke: '#ffffff',
                            },
                            tickLabels: {
                                color: "#ffffff",
                                fill: "#ffffff"
                            }
                        }}
                        standalone={false}
                    />
                    <VictoryAxis dependentAxis
                        label="Distance (cm)"
                        style={{
                            axisLabel: { fill: "#ffffff", fontSize: 25, padding: 30 },
                            axis: {
                                stroke: '#ffffff',
                            },
                            ticks: {
                                stroke: '#ffffff',
                            },
                            tickLabels: {
                                color: "#ffffff",
                                fill: "#ffffff"
                            }
                        }}
                        standalone={false}
                    />
                    <VictoryGroup
                        color="#B8F993"
                        data={data.length > 7 ? data.slice(-8, -1) : data}
                    >
                        <VictoryBar labels={({ datum }) => { return datum.time}}

                            style={{
                                data: { stroke: "#B8F993", strokeWidth: 3, strokeLinecap: "round" },
                                labels: { fill: "#ffffff", fontSize: 15}
                            }}
                            alignment="start"
                            
                            labelComponent={<VictoryLabel dx={ 27} />}/>
                    </VictoryGroup>
                </VictoryChart>
            </div>
        </div>
    )
}

export default DistanceGraph;
