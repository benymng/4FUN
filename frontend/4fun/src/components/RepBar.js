import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryGroup, VictoryScatter, VictoryBar, VictoryLabel} from "victory";
import { Bars } from 'react-loader-spinner';
import { months } from "../resources/function";
import { timeFormatter } from "../resources/function";

export const RepBar = () => {
    const [graphcss, setGraphcss] = useState("hidden");
    const [loadcss, setLoadcss] = useState("block");


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [repData, setRepData] = useState(null);

    const [data, setData] = useState([
        { x: 0, y: 0, time: 0 },
    ])
    
    useEffect(() => {
        fetch("https://4fun-pi.vercel.app/get-filtered-data/goodReps").then(response => {
                if (response.ok) {
                    return response.json();
                } throw response;
            }).then(data => { setRepData(data) })
                .catch(error => {
                    console.log(error);
                }).finally(setLoading(false))
        }, [])

    useEffect(
        () => {
            if (repData) {
                let temp = [];
                for (var i = 0; i < repData.length; i++) {
                    temp.push({
                        x:i,
                        y: repData[i]["data"]
                    })
                }
                if (temp != data) {
                    setData(temp);
                }
                setLoadcss("hidden");
                setGraphcss("block");
            }
        },
        [repData])
    if (loading) return loading;
    if (error) return error;


    return (
        <div className="h-36 grid place-items-center lg:h-40 ">
            <div className={loadcss}><Bars color="#B8F993" height="50" width="50" /></div>
            <div className={`grid w-auto h-36 m-0 lg:h-40 overflow-scroll transition-all duration-100 ` + graphcss}>
                <VictoryChart padding={{ left: 60, right: 80, top: 10, bottom: 50 }} height={200} width={600}>
                    <VictoryAxis
                        label="Set"
                        style={{
                            axisLabel: { fill: "#ffffff", fontSize: 20, padding: 30 },
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
                        label="Reps"
                        style={{
                            axisLabel: { fill: "#ffffff", fontSize: 20, padding: 30 },
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

export default RepBar;
