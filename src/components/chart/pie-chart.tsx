import ReactEcharts from "echarts-for-react";

interface Props {
  data: any;
  title: string;
  unit: string;
}
const PieChart = ({ data, title, unit }: Props) => {
  //   const dataNames = data.map((i: any) => i.title);

  let dataChart = [...data];

  //Chart style
  const style = {
    height: "50vh",
    width: "100%",
  };

  //Chart options
  let option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    visualMap: {
      show: false,
      min: 0,
      max: 240,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: "70%",
        center: ["50%", "50%"],
        data: dataChart.sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: "radius",
        label: {
          color: "#000",
        },
        labelLine: {
          lineStyle: {
            color: "#000",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: "#c23531",
          shadowBlur: 200,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function () {
          return Math.random() * 200;
        },
      },
    ],
  };
  return (
    <ReactEcharts
      lazyUpdate={true}
      option={option}
      style={style}
      className="pie-chart p-4 rounded-md"
    />
  );
};

export default PieChart;
