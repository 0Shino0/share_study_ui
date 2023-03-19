<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
// import echarts from "echarts";
import resize from "./mixins/resize";

const animationDuration = 6000;

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
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
    };
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

      this.chart.setOption({
        title: {
          text: "教师贡献榜",
          right: "10",
          top: "-2",
        },
        dataset: [
          {
            dimensions: ["name", "score"],
            source: [
              ["super", 390],
              ["admin", 251],
              ["user1", 300],
              ["user2", 59],
              ["user3", 0],
              ["user4", 150],
            ],
          },
          {
            transform: {
              type: "sort",
              config: { dimension: "score", order: "desc" },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 25,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            // data: ["super", "admin", "user1", "user2", "user3", "user4"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            // type: "category",
            type: "value",
            data: ["super", "admin", "user1", "user2", "user3", "user4"],
            axisTick: {
              show: false,
            },
          },
        ],
        series: {
          type: "bar",
          encode: { x: "name", y: "score" },
          datasetIndex: 1,
        },
        /*           [
          {
            name: "pageA",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [79, 52, 200, 334, 390, 330, 220],
            animationDuration,
          },
          {
            name: "pageB",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [80, 52, 200, 334, 390, 330, 220],
            animationDuration,
          },
          {
            name: "pageC",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [30, 52, 200, 334, 390, 330, 220],
            animationDuration,
          },
        ], */
      });
    },
  },
};
</script>
