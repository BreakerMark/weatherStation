<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="1">Temperature</el-menu-item>
    <el-menu-item index="2">Humidity</el-menu-item>
    <el-menu-item index="3">Pressure</el-menu-item>
    <el-menu-item index="4">Alutitude</el-menu-item>
  </el-menu>
  <div id="time">{{ time }}</div>
  <div class="title">{{ latest + " " + unit }}</div>
  <div id="chart-container"></div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { Chart } from '@antv/g2'

export default {
  setup () {
    const activeIndex = ref('1')
    return {
      activeIndex,
    }
  },
  data () {
    return {
      key: '1',
      data: [],
      latest: '',
      time: '',
      unit: '°C',
      chart: null
    }
  },
  mounted () {
    axios.get(`/temperature`).then(response => {
      this.data = response.data
      this.data.forEach(item => {
        item.data = Math.round(item.data * 10) / 10
      })
      this.latest = Math.round(this.data[this.data.length - 1].data * 10) / 10
      this.initChart()
      setInterval(() => {
        this.initChart()
      }, 10000)
    })
    setInterval(() => {
      let date = new Date()
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      this.time = hours + ':' + minutes + ':' + seconds
    }, 1000)
  },
  methods: {
    handleSelect (key, keyPath) {
      let url = 'temperature'
      let unit
      this.key = key
      switch (key) {
        case '1':
          unit = '°C'
          url = 'temperature'
          break;
        case '2':
          unit = '%'
          url = 'humidity'
          break;
        case '3':
          unit = 'kPa'
          url = 'pressure'
          break;
        case '4':
          unit = 'm'
          url = 'altitude'
          break;
        default:
          unit = '°C'
          url = 'temperature'
          break;
      }
      this.unit = unit
      axios.get(`/${url}`).then(response => {
        this.data = response.data
        this.data.forEach(item => {
          item.data = Math.round(item.data * 10) / 10
        })
        this.latest = Math.round(this.data[this.data.length - 1].data * 10) / 10
        this.initChart()
      })
    },
    initChart () {
      if (this.chart != null) {
        this.chart.destroy()
      }
      const chart = new Chart({
        container: 'chart-container',
        autoFit: true,
        height: 500
      })
      chart.data(this.data)
      chart.scale({
        Date: {
          tickCount: 10
        },
        Close: {
          nice: true,
        }
      });
      chart.line().position('createDate*data');
      chart.render();
      this.chart = chart
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 80px;
  margin-top: 50px;
  margin-bottom: 50px;
}
#chart-container {
  margin: 0 auto 0 auto;
  width: 80%;
}
#time {
  position: absolute;
  top: 150px;
  right: 50px;
  font-size: 30px;
}
</style>