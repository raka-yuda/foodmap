import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

interface Props {
  data: any;
  title: string;
  unit: string;
}
const BarChart = ({ data, title, unit }: Props) => {
  let dataChart = [...data];

  const dataNames = dataChart.map((i: any) => i.name);
  const dataValue = dataChart.map((i: any) => i.value);

  //Chart style
  const style = {
    height: "50vh",
    width: "100%",
  };

  //Chart options
  let option = {
    name: title,
    xAxis: {
      type: "category",
      data: dataNames,
    },
    yAxis: {
      type: "value",
    },
    axisLabel: {
      margin: 20,
      width: "100",
      overflow: "truncate",
    },
    tooltip: {
      trigger: "item",
      extraCssText: "width:210px; white-space:pre-wrap;",
      formatter: "Restaurants <br/>{b} : {c}",
    },
    series: [
      {
        data: dataValue,
        type: "bar",
        itemStyle: {
          color: "#c23531",
          shadowBlur: 200,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    ],
  };

  return (
    <ReactEcharts
      lazyUpdate={true}
      option={option}
      style={style}
      className="bar-chart p-4"
    />
  );
};

export default BarChart;
