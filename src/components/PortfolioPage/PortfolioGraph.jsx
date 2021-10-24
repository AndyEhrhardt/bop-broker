import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import portfolioStyles from "./portfolioStyles";
import { ClassNames } from "@emotion/react";

function PortfolioGraph(props) {
  const [labels, setLabels] = useState([]);
  let [dailyTotal, setDailyTotal] = useState([]);
  const classes = portfolioStyles();  
  useEffect(() => {
    assignValues();
  }, []);

  const assignValues = () => {
    let newLabels = [];
    let newDailyTotal = [];
    console.log(props.histData.length)
    if ((props.histData[1].date === "new")) {
        newLabels = ["", props.histData[0].date.split("T")[0].slice(5), "", "", "", "", "", ""];
        newDailyTotal = [props.histData[0].value, props.histData[0].value];
    } else if (props.histData.length < 7){
      for (let i = 0; i < props.histData.length; i++) {
        newLabels.push(props.histData[i].date.split("T")[0].slice(5));
        newDailyTotal.push(props.histData[i].value);
      }
      for (let i = 0; i < 7- props.histData.length; i++){
          newLabels.push("");
      }
    } else{
        for (let i = props.histData.length-1; i >= 0; i--){
            newLabels.push(props.histData[i].date.split("T")[0].slice(5))
            newDailyTotal.push(props.histData[i].value)
        }
    }
    setLabels(newLabels);
    setDailyTotal(newDailyTotal);
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily Total",
        data: dailyTotal,
        fill: false,
        backgroundColor: props.color,
        borderColor: props.color,
        tension: 0.2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      point:{
        radius: 0
      }
    },
    scales: {
      x: {
        grid:{
         display:false
             }
       },
    y: 
       {
     grid:{
      display:false
          }
       }
    }
  };

  return (
      <div className={classes.graphwrapper} >
        <Line data={data} options={options} />
      </div>
  );
}

export default PortfolioGraph;
