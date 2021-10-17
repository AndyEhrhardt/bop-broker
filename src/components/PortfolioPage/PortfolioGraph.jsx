import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import portfolioStyles from "./portfolioStyles";
import "moment-timezone";

function PortfolioGraph(props) {
  const [labels, setLabels] = useState([]);
  let [totalCash, setTotalCash] = useState([]);

  useEffect(() => {
    assignValues();
  }, []);

  const assignValues = () => {
    if ((props.histData[1].date = "new")) {
      setLabels(["", props.histData[0].date.split("T")[0], "", "", "", "", "", ""]);
      setTotalCash([props.histData[0].value, props.histData[0].value]);
    } else {
    }
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily Total Net",
        data: totalCash,
        fill: false,
        backgroundColor: props.color,
        borderColor: props.color,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <>
        <div className="header"></div>
        <Line data={data} options={options} />
      </>
    </>
  );
}

export default PortfolioGraph;
