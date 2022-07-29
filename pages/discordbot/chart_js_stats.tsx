import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import * as chart from "chart.js";
import { getStats } from "features/stats";
import { GetServerSideProps } from "next";

export default function Chart_js_stats({ highScore }) {
  const Doughnut = dynamic(
    () => {
      return import("react-chartjs-2").then((mod) => mod.Doughnut);
    },
    { ssr: false }
  );
  chart.Chart.register(
    chart.ArcElement,
    chart.LineElement,
    chart.BarElement,
    chart.PointElement,
    chart.BarController,
    chart.BubbleController,
    chart.DoughnutController,
    chart.LineController,
    chart.PieController,
    chart.PolarAreaController,
    chart.RadarController,
    chart.ScatterController,
    chart.CategoryScale,
    chart.LinearScale,
    chart.LogarithmicScale,
    chart.RadialLinearScale,
    chart.TimeScale,
    chart.TimeSeriesScale,
    chart.Decimation,
    chart.Filler,
    chart.Legend,
    chart.Title,
    chart.Tooltip,
    chart.SubTitle
  );
  let chartRef = useRef(null);
  let [chartJS, setChartJS] = useState(null);

  let [dataState, setData] = useState({
    labels: highScore.map((score) => score.userName),
    datasets: [
      {
        data: highScore.map((score) => score.seconds),
        backgroundColor: [
          "#EAEFBD",
          "#AEA4BF",
          "#c9e3ac",
          "#8F6593",
          "#90BE6D",
        ],
        hoverBackgroundColor: [
          "#FAFBEF",
          "#CAC3D5",
          "#E1F0D1",
          "#A986AC",
          "#A9CC8E",
        ],
      },
    ],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      console.log("ChartJS", chart);
      chart.retry();
    }
  }, []);

  useEffect(() => {
    if (dataState.datasets?.length === 0) {
      getStats().then((scores) => {
        //console.log(scores);
        setData((data) => {
          data.datasets[0].data = scores.map((score) => {
            return { data: score.seconds, label: score.userName };
          });
          return data;
        });
      });
    }

    return () => {};
  });
  useEffect(() => {
    console.log("============Data Changed==========");
    console.log(dataState);
    console.log("====================================");
  }, [dataState]);

  function addData() {
    console.log("adding data");
    setData((currData) => {
      console.log(currData);

      currData.datasets[0].data.push(Math.random() * 100);
      currData.labels.push("Series-" + currData.labels.length);
      console.log(currData);

      return currData;
    });
  }
  function logData() {
    console.log(dataState);
    const chart = chartRef.current;

    if (chart) {
      console.log("ChartJS", chart);
      chart.retry();
    }
  }

  return (
    <>
      <div className="d-flex">
        <div className="chartArea col-6">
          {/* @ts-ignore*/}
          <Doughnut data={dataState} ref={chartRef} />
        </div>
        <div className="controlls col-6 d-flex justify-content-around align-items-center">
          <input
            type="button"
            className="btn btn-primary"
            value="Add data"
            onClick={addData}
          />
          <input
            type="button"
            className="btn btn-primary"
            value="Log data"
            onClick={logData}
          />
        </div>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("====================================");
  console.log("getting server side props");
  console.log("====================================");
  let data = await getStats();
  return {
    props: { highScore: data },
  };
};
