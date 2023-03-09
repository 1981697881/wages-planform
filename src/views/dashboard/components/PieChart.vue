<template>
  <div style="margin-left: 15px" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        title: {
          text: '前10产品销售统计表',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '2304-原味开心果480g' },
              { value: 735, name: '2361-碧根果220g' },
              { value: 580, name: '2308-紫皮腰果220g' },
              { value: 484, name: '2350-综合果仁380g' },
              { value: 300, name: '2325-盐焗巴旦木果仁500g' },
              { value: 200, name: '2326-甄选。坚果礼1850g' },
              { value: 1100, name: '2326-缤纷。坚果礼1410g' },
              { value: 100, name: '2339-黑加仑葡萄干750g' },
              { value: 280, name: '2303-原味开心果360g' },
              { value: 600, name: '2306-原味开心果400g' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
