<template>
  <div class="container_box">
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null, //Echarts实例对象
      queryInfo: {
        username: this.$store.state.userData.username,
      },
      allData: null, //服务器返回的数据
      yAxisResult: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    
  },
  mounted() {
    this.initChart();
    this.getData();
  },

  components: {},

  computed: {},

  methods: {
    //初始化echartInstance对象
    initChart() {
      //
      this.chartInstance = this.$echarts.init(this.$refs.container);
    },
    rTime(date) {
      var json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    //获取服务器数据
    async getData() {
      let result;
      if (this.queryInfo.username == "系统管理员") {
        result = await this.$axios.get("/customer/customers");
      } else {
        result = await this.$axios.get("/customer/getMangerCustomer", {
          params: this.queryInfo,
        });
      }
      console.log(result)
      result.data.result.forEach((item, index) => {
        let date = this.rTime(result.data.result[index].createAT);
        let countIndex = new Date(date).getMonth();
        this.yAxisResult[countIndex]++;
      });
      this.allData = result.data.result;
      this.updateChart();
    },
    
    //更新图表
    updateChart() {
      //调用图表更新
      const option = {
        xAxis: {
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: {},
        series: [
          {
            name: "客户数量",
            type: "bar",
            data: this.yAxisResult,
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
  },
};
</script>
<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
}
.container_box {
  height: 100%;
  width: 100%;
}
</style>