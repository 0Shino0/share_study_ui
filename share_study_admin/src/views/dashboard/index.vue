<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">可视化管理</div> -->

    <!-- map展示 -->
    <el-row
      class="map-charts"
      style="margin-bottom: 32px; border-radius: 10px; overflow: hidden"
    >
      <map-chart></map-chart>
    </el-row>
    <!-- 上传文件 -->
    <!--     <el-upload
      class="upload-file"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload> -->

    <!-- bar pie 图 -->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart-left />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <!-- line图 -->
    <el-row
      class="line-charts"
      style="
        background: #fff;
        padding: 16px 16px 0;
        margin-top: 32px;
        border-radius: 10px;
        overflow: hidden;
      "
    >
      <line-chart></line-chart>
    </el-row>
  </div>
</template>

<script>
import MapChart from "./components/MapChart.vue";
import RaddarChart from "./components/RaddarChart.vue";
import PieChart from "./components/PieChart.vue";
import BarChart from "./components/BarChart.vue";
import BarChartLeft from "./components/BarChartLeft.vue";
import LineChart from "./components/LineChart.vue";

const lineChartData = {};
export default {
  components: {
    MapChart,
    RaddarChart,
    PieChart,
    BarChart,
    BarChartLeft,
    LineChart,
  },
  name: "Dashboard",
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    border-radius: 10px;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
