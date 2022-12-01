import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryGroup, VictoryScatter } from "victory";
import { Bars } from 'react-loader-spinner';


export const StabilityGraph = () => {
    const [graphcss, setGraphcss] = useState("hidden");
    const [loadcss, setLoadcss] = useState("block");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [thirdDerX, setThirdDerX] = useState(null);
    const [thirdDerY, setThirdDerY] = useState(null);
    
    const [stability, setStability] = useState([
        { x: 0, y: 0 },
    ])

    useEffect(() => {
        fetch("https://4fun-pi.vercel.app/get-filtered-data/thirdDerX").then(response => {
            if (response.ok) {
                return response.json();
            } throw response;
        }).then(data => { setThirdDerX(data) })
            .catch(error => {
                console.log(error);
            }).finally(setLoading(false))

        fetch("https://4fun-pi.vercel.app/get-filtered-data/thirdDerY").then(response => {
            if (response.ok) {
                return response.json();
            } throw response;
        }).then(data => { setThirdDerY(data) })
            .catch(error => {
                console.log(error);
            }).finally(setLoading(false))
    }, [])

    useEffect(
        () => {
            if (thirdDerX && thirdDerY) {
                let temp = [];
                for (var i = 0; i < Math.min(thirdDerX[thirdDerX.length - 1]["data"].length - 1, thirdDerY[thirdDerY.length - 1]["data"].length - 1); i++) {
                    temp.push({
                        x: thirdDerX[thirdDerX.length - 1]["data"][i],
                        y: thirdDerY[thirdDerY.length - 1]["data"][i]
                    })
                }
                if (temp != stability) {
                    setStability(temp);
                }
                setLoadcss("hidden");
                setGraphcss("block");
            }
        },
        [thirdDerX])

    if (loading) return loading;
    if (error) return error;


  return (
      <div className="h-48 grid place-items-center lg:h-40 ">
          <div className={loadcss}><Bars color="#B8F993" height="50" width="50" /></div>
          <div className={`grid w-auto h-52 m-0 lg:h-40 overflow-scroll transition-all duration-100 ` + graphcss}>
           <VictoryChart padding={{ left: 60, right: 40, top: 0, bottom: 10 }} height={300} width={600}>
              <VictoryAxis
                  label="Time (s)"
                  style={{
                      axisLabel: { fill: "#ffffff", fontSize: 20, padding: 130 },
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
                  label="Rep Stability"
                  style={{
                      axisLabel: { fill: "#ffffff", fontSize: 20, padding: 15 },
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
                  data={stability}
              >
                  <VictoryLine style={{ data: { stroke: "#B8F993", strokeWidth: 2, strokeLinecap: "round" } }} />
              </VictoryGroup>
          </VictoryChart>
      </div></div>
  )
}

export default StabilityGraph;
