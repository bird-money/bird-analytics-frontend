import React from "react";
import { GaugeChart } from "bizcharts";

const GaugeRate = (props) => {
  const rating = props.score;

  return (
    <GaugeChart
      title={{
        visible: false,
        text: "My Bird Rating",
      }}
    //   width={400}
      height={400}
      value={rating}
      min={0}
      max={10}
      range={[0, 2.5, 5, 7.5, 10]}
    //   rangeStyle ={}
    //   color={["#39B8FF", "#52619B", "#43E089", "#C0EDF3"]}
      color={["#db7b2b", "#e7b416", "#99c140", "#2dc937"]}
      statistic={{
        visible: true,
        text: rating.toFixed(2),
        color: "#30bf78",
      }}
    />
  );
};

export default GaugeRate;
