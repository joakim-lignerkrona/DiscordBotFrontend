import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getStats } from "features/stats";
import Navbar from "Components/bot/Navbar";
import Switches from "features/stats/components/Switches";
import Datepicker from "features/stats/components/Datepicker";

export default function Stats({ highScore }) {
  let [listedSeries, setListedSeries] = useState([]);
  let [listedLabels, setListedLabels] = useState([]);
  const Chart = dynamic(
    () => {
      return import("react-apexcharts");
    },
    { ssr: false }
  );

  const chartRef = React.useRef();
  const [clientWidth, setClientWidth] = useState(0);
  useEffect(() => {
    if (chartRef.current) {
      let reziseobserver = new ResizeObserver((entries) => {
        setClientWidth(entries[0].contentRect.width);
      });
      reziseobserver.observe(chartRef.current);
    }
  }, []);

  useEffect(() => {
    console.log("rendered");
    setListedSeries(
      highScore.map((score) => {
        console.log("setting series initial state");
        return score.seconds;
      })
    );
    setListedLabels(highScore.map((score) => score.userName));

    return () => {};
  }, []);

  const onCheck = useCallback(
    (userIDs: string[]) => {
      console.log("logging: " + userIDs.length);
      if (userIDs.length !== 0) {
        setListedSeries(
          highScore
            .filter((user) => {
              return userIDs.includes(user.userID);
            })
            .map((user) => user.seconds)
        );
        setListedLabels(
          highScore
            .filter((user) => {
              return userIDs.includes(user.userID);
            })
            .map((user) => user.userName)
        );
      } else {
        setListedSeries(highScore.map((user) => user.seconds));
        setListedLabels(highScore.map((user) => user.userName));
      }
    },
    [highScore]
  );
  function onDatepick(from?: Date, to?: Date) {}

  return (
    <>
      <Navbar />
      <div
        className="row d-flex flex-wrap align-items-center"
        style={{ padding: "5rem 0" }}
      >
        <div className="col-md-3">
          <Datepicker onDatepick={onDatepick} />
          <Switches highScore={highScore} onCheck={onCheck} />
        </div>
        <div ref={chartRef} className="col-md-9">
          <Chart
            options={{
              chart: {
                type: "donut",
              },
              dataLabels: { enabled: false },
              labels: listedLabels,
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      show: false,
                    },
                  },
                },
              ],
            }}
            series={listedSeries}
            type="donut"
            width={clientWidth}
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
  getStats();
  let data = await getStats();
  return {
    props: { highScore: data },
  };
};
