<template>
  <div style="margin-left: 15px" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

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
      const data1 = [
        {
          name: '华东: 70',
          value: 70
        },
        {
          name: '华南: 68',
          value: 68
        },
        {
          name: '华西: 48',
          value: 48
        },
        {
          name: '华北: 40',
          value: 40
        },
        {
          name: '华中: 100',
          value: 100
        }
      ];
      const data2 = [
        {
          name: '华东: 700000',
          value: 700000
        },
        {
          name: '华南: 680000',
          value: 680000
        },
        {
          name: '华西: 480000',
          value: 480000
        },
        {
          name: '华北: 400000',
          value: 400000
        },
        {
          name: '华中: 10000000',
          value: 1000000
        }
      ];
      this.chart.setOption({
        title: [
          {
            text: '区域销售统计表',
            left: 'center'
          },
          {
            subtext: '销售数量',
            left: '23.67%',
            top: '75%',
            textAlign: 'center'
          },
          {
            subtext: '销售金额(万元)',
            left: '75%',
            top: '75%',
            textAlign: 'center'
          },
        ],
        series: [
          {
            type: 'pie',
            radius: '25%',
            center: ['50%', '50%'],
            data: data2,
            label: {
              position: 'outer',
              alignTo: 'none',
              bleedMargin: 5
            },
            left: 0,
            right: '50%',
            top: 0,
            bottom: 0
          },
          {
            type: 'pie',
            radius: '25%',
            center: ['50%', '50%'],
            data: data1,
            label: {
              position: 'outer',
              alignTo: 'labelLine',
              bleedMargin: 5
            },
            left: '50%',
            right: 0,
            top: 0,
            bottom: 0
          },
        ]
      })
    }
  }
}
</script>
