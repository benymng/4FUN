import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryGroup, VictoryScatter } from "victory";


export const StabilityGraph = () => {
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
                setStability([{ x: thirdDerX[thirdDerX.length - 1]["data"][0], y: thirdDerY[thirdDerY.length - 1]["data"][0] }]);
                for (var i = 0; i < Math.min(thirdDerX[thirdDerX.length - 1]["data"].length - 1, thirdDerY[thirdDerY.length - 1]["data"].length - 1); i++) {
                    temp.push({
                        x: thirdDerX[thirdDerX.length - 1]["data"][i],
                        y: thirdDerY[thirdDerY.length - 1]["data"][i]
                    })
                }
                if (temp != stability) {
                    setStability(temp);
                }
            }
        },
        [thirdDerX])

    if (loading) return loading;
    if (error) return error;


  return (
      <div className="grid w-auto m-0 overflow-scroll h-48">
          <VictoryChart padding={{ left: 80, right: 40, top: 0, bottom: 20 }} height={300} width={600}>
              <VictoryAxis
                  label="Time (s)"
                  style={{
                      axisLabel: { fill: "#ffffff", fontSize: 30, padding: 130 },
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
                      axisLabel: { fill: "#ffffff", fontSize: 30, padding: 30 },
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
      </div>
  )
}

export default StabilityGraph;
