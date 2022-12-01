import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryGroup, VictoryScatter } from "victory";
import { Bars } from 'react-loader-spinner';


export const AccelGraph = () => {
    const [graphcss, setGraphcss] = useState("hidden");
    const [loadcss, setLoadcss] = useState("block");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [accelXarr, setaccelXarr] = useState(null);
    const [accelYarr, setaccelYarr] = useState(null);

    const [accel, setAccel] = useState([
        { x: 0, y: 0 },
    ])

    useEffect(() => {
        fetch("https://4fun-pi.vercel.app/get-filtered-data/accelX").then(response => {
            if (response.ok) {
                return response.json();
            } throw response;
        }).then(data => { setaccelXarr(data) })
            .catch(error => {
                console.log(error);
            }).finally(setLoading(false))
        fetch("https://4fun-pi.vercel.app/get-filtered-data/accelY").then(response => {
            if (response.ok) {
                return response.json();
            } throw response;
        }).then(data => { setaccelYarr(data) })
            .catch(error => {
                console.log(error);
            }).finally(setLoading(false))
    }, [])

    useEffect(
        () => {
            if (accelXarr && accelYarr) {
                let temp = [];
                for (var i = 0; i < Math.min(accelXarr[accelXarr.length - 1]["data"].length - 1, accelYarr[accelYarr.length - 1]["data"].length - 1); i++) {
                    temp.push({
                        x: accelXarr[accelXarr.length - 1]["data"][i],
                        y: accelYarr[accelYarr.length - 1]["data"][i]
                    })
                }
                if (temp != accel) {
                    setAccel(temp);
                }
                setLoadcss("hidden");
                setGraphcss("block");
            }
        },
        [accelXarr])

    if (loading) return loading;
    if (error) return error;


    return (
        <div className="h-48 grid place-items-center">
            <div className={loadcss}><Bars color="#B8F993" height="50" width="50" /></div>
            <div className={`grid w-auto h-48 m-0 overflow-scroll transition-all duration-100 ` + graphcss}>
          <VictoryChart padding={{ left: 60, right: 40, top: 0, bottom: 10 }} height={300} width={600}>
                <VictoryAxis
                    label="Time (s)"
                    style={{
                        axisLabel: { fill: "#ffffff", fontSize: 25, padding: 100 },
                        axis: {
                            stroke: '#ffffff',
                        },
                        ticks: {
                            stroke: '#ffffff',
                        },
                        tickLabels: {
                            color: "transparent",
                            fill: "transparent"
                        }
                    }}
                    standalone={false}
                />
                <VictoryAxis dependentAxis
                    label="Acceleration"
                    style={{
                        axisLabel: { fill: "#ffffff", fontSize: 25, padding: 15 },
                        axis: {
                            stroke: '#ffffff',
                        },
                        ticks: {
                            stroke: '#ffffff',
                        },
                        tickLabels: {
                            color: "transparent",
                            fill: "transparent"
                        }
                    }}
                    standalone={false}
                />
                <VictoryGroup
                    color="#B8F993"
                    data={accel}
                >
                    <VictoryLine style={{ data: { stroke: "#B8F993", strokeWidth: 2, strokeLinecap: "round" } }} />
                </VictoryGroup>
            </VictoryChart>
        </div></div>
    )
}

export default AccelGraph;
