import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { ClassNames } from "@emotion/react";
import songStyles from "./songDetailsStyles";
import { useSelector, useDispatch } from "react-redux";

function DetailsGraph(props) {
  const [labels, setLabels] = useState([]);
  const [dailyRank, setDailyRank] = useState([]);
  const histData = useSelector((store) => store.songDetails.allRanks);
  const [prevData, setPrevData] = useState([]);
  const classes = songStyles();

  useEffect(() => {
    assignValues();
  }, []);

  const assignValues = () => {
    let newLabels = [];
    let newDailyRank = [];
    let minimum = histData[0].rank;
    let maximum = histData[0].rank;
    console.log(histData.length);
    if (histData.length === 1) {
      newLabels = [
        "",
        histData[0].date.split("T")[0].slice(5),
        "",
        "",
        "",
        "",
        "",
        "",
      ];
      newDailyRank = [histData[0].rank, histData[0].rank];
    } else if (histData.length < 7) {
      for (let i = 0; i < histData.length; i++) {
        newLabels.push(histData[i].date.split("T")[0].slice(5));
        newDailyRank.push(histData[i].rank);
      }
      for (let i = 0; i < 7 - histData.length; i++) {
        newLabels.push("");
      }
    } else {
      for (let i = histData.length - 1; i >= 0; i--) {
        newLabels.push(histData[i].date.split("T")[0].slice(5));
        newDailyRank.push(histData[i].rank);
      }
    }
    setLabels(newLabels);
    setDailyRank(newDailyRank);
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Rank",
        data: dailyRank,
        fill: false,
        backgroundColor: "#e6bb00",
        borderColor: "#e6bb00",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    type: 'line',
    layout: {
      padding: 10
    },
    interaction: {
      intersect: false,
      mode: 'index',
      displayColors: false
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      displayColors: false
   },
    elements: {
      point: {
        radius: 0,
        pointHitRadius: 12,
        mode: 'x',
        backgroundColor: 'none'
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        // suggestedMin: 20,
        // suggestedMax: 30,
        min: 1,
        max: 50,
        grace: '5%',
        display: true,
        reverse: true,
        ticks: {
          stepSize: 5
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
    {histData === undefined ? <>loading</> : 
        <div className={classes.graphwrapper}>
        <Line data={data} options={options} />
        </div>
    }
    </>
  );
}

export default DetailsGraph;

// "#06f202" green  "#f71500" red  "#e6bb00" gold
