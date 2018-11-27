<template>
  <div id="myChart" ref="myChart" style="width:98%;height:350px;"></div>
</template>

<script>
    export default {
        name: "pie-chart",
        props:['chartData'],
        mounted(){

          this.drawPie();
        },
      methods:{
          drawPie:function () {
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            let option = {
              tooltip : {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',

                itemGap: 20,
                left: 'left',
                top:'70%',
                data: this.chartData.data
              },
              series : [
                {
                  name: '题目类型',
                  type: 'pie',
                  radius : '100%',
                  center: ['50%', '40%'],
                  data: this.chartData.showData,

                  label:{
                    position:'inside',
                    show:true
                  }
                }
              ]
            };
            window.onresize = function () {
              myChart.resize(); //使图表适应
            }
            myChart.setOption(option);
          }
      }
    }
</script>

<style scoped>

</style>
