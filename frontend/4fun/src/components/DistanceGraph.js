import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryGroup, VictoryScatter } from "victory";
import {Bars} from 'react-loader-spinner';

export const DistanceGraph = () => {
    const [graphcss, setGraphcss] = useState("hidden");
    const [loadcss, setLoadcss] = useState("block");


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [distanceXarr, setDistanceXarr] = useState(null);
    const [distanceYarr, setDistanceYarr] = useState(null);
    
    const [distance, setDistance] = useState([
        { x: 0, y: 0 },
    ])

    useEffect(() => {
        fetch("https://4fun-pi.vercel.app/get-filtered-data/distanceX").then(response => {
            if (response.ok) {
                return response.json();
            } throw response;
        }).then(data => { setDistanceXarr(data) })
            .catch(error => {
                console.log(error);
            }).finally(setLoading(false))

        fetch("https://4fun-pi.vercel.app/get-filtered-data/distanceY").then(response => {
            if (response.ok) {
                return response.json();
            } throw response;
        }).then(data => { setDistanceYarr(data) })
            .catch(error => {
                console.log(error);
            }).finally(setLoading(false))
    }, [])

    useEffect(
        () => {
            if (distanceXarr && distanceYarr) {
                let temp = [];
                for (var i = 0; i < Math.min(distanceXarr[distanceXarr.length - 1]["data"].length - 1, distanceYarr[distanceYarr.length - 1]["data"].length - 1); i++) {
                    temp.push({
                        x: distanceXarr[distanceXarr.length - 1]["data"][i],
                        y: distanceYarr[distanceYarr.length - 1]["data"][i]
                    })
                }
                if (temp != distance) {
                    setDistance(temp);
                }
                setLoadcss("hidden");
                setGraphcss("block");

            }
        },
        [distanceXarr])
    if (loading) return loading;
    if (error) return error;


    return (
        <div className="h-48 grid place-items-center">
            <div className={loadcss}><Bars color="#B8F993" height="50" width="50" /></div>
      <div className={`grid w-auto h-48 m-0 overflow-scroll transition-all duration-100 ` + graphcss}>
          <VictoryChart padding={{ left: 80, right: 40, top: 0, bottom: 60 }} height={300} width={600}>
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
                  data={distance}
              >
                  <VictoryLine style={{ data: { stroke: "#B8F993", strokeWidth: 2, strokeLinecap: "round" } }} />
              </VictoryGroup>
          </VictoryChart>
            </div>
            </div>
  )
}

export default DistanceGraph;
