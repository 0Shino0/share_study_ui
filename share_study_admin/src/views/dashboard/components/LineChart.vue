<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
// require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const data = [
  ["2000-06-05", 116],
  ["2000-06-06", 129],
  ["2000-06-07", 135],
  ["2000-06-08", 86],
  ["2000-06-09", 73],
  ["2000-06-10", 85],
  ["2000-06-11", 73],
  ["2000-06-12", 68],
  ["2000-06-13", 92],
  ["2000-06-14", 130],
  ["2000-06-15", 245],
  ["2000-06-16", 139],
  ["2000-06-17", 115],
  ["2000-06-18", 111],
  ["2000-06-19", 309],
  ["2000-06-20", 206],
  ["2000-06-21", 137],
  ["2000-06-22", 128],
  ["2000-06-23", 85],
  ["2000-06-24", 94],
  ["2000-06-25", 71],
  ["2000-06-26", 106],
  ["2000-06-27", 84],
  ["2000-06-28", 93],
  ["2000-06-29", 85],
  ["2000-06-30", 73],
  ["2000-07-01", 83],
  ["2000-07-02", 125],
  ["2000-07-03", 107],
  ["2000-07-04", 82],
  ["2000-07-05", 44],
  ["2000-07-06", 72],
  ["2000-07-07", 106],
  ["2000-07-08", 107],
  ["2000-07-09", 66],
  ["2000-07-10", 91],
  ["2000-07-11", 92],
  ["2000-07-12", 113],
  ["2000-07-13", 107],
  ["2000-07-14", 131],
  ["2000-07-15", 111],
  ["2000-07-16", 64],
  ["2000-07-17", 69],
  ["2000-07-18", 88],
  ["2000-07-19", 77],
  ["2000-07-20", 83],
  ["2000-07-21", 111],
  ["2000-07-22", 57],
  ["2000-07-23", 55],
  ["2000-07-24", 60],
];
const dateList = data.map(function (item) {
  return item[0];
});
const valueList = data.map(function (item) {
  return item[1];
});

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: false, // 真实数据 true |  mock数据  false
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: "近期用户访问数据",
          left: "center",
        },
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 100,
          },
          {
            show: false,
            type: "continuous",
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            max: dateList.length - 1,
          },
        ],
        xAxis: {
          data: dateList,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          data: ["expected", "actual"],
        },
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList,
            smooth: false,
            areaStyle: {},
          },
        ],
      });
    },
  },
};
</script>
