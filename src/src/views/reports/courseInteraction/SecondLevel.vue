<template>
<div class="py-5 px-4 pb-12" >
  <template v-if="loader">
    <loading></loading>
  </template>
  <template v-else>
    <template v-if="no_problem">
      <h4 class="page-title pb-2">Interacciones del grupo de curso</h4>
      <v-row no-gutters>
        <v-col cols="12" sm="6" order="last" order-sm="first">
          <v-layout d-flex>
              <span class="label-selector pr-2 pt-2">Mes</span>
              <v-select class="select" v-model="current_month" :items="months"
                @change="modifyDate('month', $event)" item-text="name" item-value="id"
                append-icon="mdi-chevron-down" background-color="white"
                color="#575756" rounded dense flat item-color="#575756"
                :menu-props="{contentClass: 'select-container'}">
              </v-select>
              <span class="label-selector pr-2 pt-2 ml-4">Año</span>
              <v-select class="select" v-model="current_year" :items="years"
                @change="modifyDate('year', $event)" item-text="name" item-value="id"
                append-icon="mdi-chevron-down" background-color="white"
                color="#575756" rounded dense item-color="#575756" flat
                :menu-props="{contentClass: 'select-container'}">
              </v-select>
          </v-layout>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" class="d-flex justify-center justify-md-end">
         <help :report="{name:'course_interaction', level:'first',log_level:'first_level'}" />
          <download class="ml-2" :report="{name:'course_interaction', level:'second',log_level:'second_level'}" :data="current_month" />
        </v-col>
      </v-row>
      <template v-if="loader_calendar">
    <loading></loading>
      </template>
      <template v-else>
    <div class="chart-container" id="grafico">
        <hour-blocks class="hour-blocks"></hour-blocks>
        <y-labels class="y-labels"></y-labels>
        <chart-border class="border-start"></chart-border>
        <apexchart class="chart" type="heatmap" height="300" :options="chartOptions"
        :series="series"></apexchart>
        <x-labels class="x-labels"></x-labels>
        <chart-border class="border-end"></chart-border>
      </div>
      </template>
      <v-layout class="pb-4" d-flex justify-end>
        <router-link :to="{ name: 'course_interaction_first' }" outlined small>
          <v-btn class="py-4 mr-4 back-button" outlined rounded small ripple>Interacciones por estudiante</v-btn>
        </router-link>
      </v-layout>
    </template>
  </template>
</div>
</template>
<style lang="scss" scoped>
*:not(.v-icon) {
  font-family: "Lato", "Roboto", "sans-serif" !important;
  font-weight: normal;
  font-size: .9rem;
  color: #575756;
}

a {
  text-decoration: none !important;
}

.select{
  max-width: 130px;
}

.page-title{
  font-weight: bold;
  font-size: 1rem;
  color: #3c3c3b;
}

.back-button{
  border: 2px solid #3bbad2;
  color: #3bbad2;
  font-weight: bold;
  font-size: .9rem;
  text-transform: initial;
  text-decoration: none;
}

.label-selector{
  color: #3c3c3b !important;
}

.chart-container{
  display: grid;
  grid-template-columns: 150px 2px 1fr 2px;
  grid-template-rows: auto auto auto;
}

.hour-blocks{
  grid-column: 2/5;
  grid-row: 1/2;
}

.y-labels{
  grid-column: 1/2;
  grid-row: 2/3;
  position: relative;
  top: 27px;
}

.chart{
  grid-column: 3/4;
  grid-row: 2/3;
}

.border-start{
  grid-column: 2/3;
  grid-row: 2/3;
}

.border-end{
  grid-column: 4/5;
  grid-row: 2/3;
}

.x-labels{
  grid-column: 3/4;
  grid-row: 3/4;
}

.border-start{
  position: relative;
  top: 28px;
  right: -11px;
}

.border-end{
  position: relative;
  top: 29px;
  left: -18px;
}

.border-start, .chart{
  z-index: 1;
}


@media(max-width: 600px){
  .chart-container{
    grid-template-columns: 0px 2px 1fr 2px;
  }
  .y-labels{
    display: none;
  }
}
</style>

<script>
import Webservice from '@/models/webservice'
import Log from '@/models/log'
import hourBlocks from '@/components/reports/courseInteraction/hourBlocks'
import chartBorder from '@/components/reports/courseInteraction/chartBorder'
import yChartLabels from '@/components/reports/courseInteraction/yChartLabels'
import xChartLabels from '@/components/reports/courseInteraction/xChartLabels'

export default {
  created() {
    this.initSelector()
    this.initReport()
    this.createLog()
    this.$Session.updateActivity()
  },
  components : {
    'hour-blocks' : hourBlocks,
    'chart-border' : chartBorder,
    'y-labels' : yChartLabels,
    'x-labels' : xChartLabels
  },
  methods: {
   createLog() {
      let log = new Log(this.$route.params.course_id)
      log.setContext(log.REPORT_CONTEXT)
      log.setReport(log.COURSE_INTERACTION)
      log.setDeep(log.SECOND_LEVEL)
      log.add()
      log.enable()
    },
    async initReport() {
      let current_course = parseInt(this.$route.params.course_id)
      let date = this.getDate()
      let webservice = new Webservice()
      await webservice
        .courseInteractionGlobal({
          course_id: current_course,
          year: date['year'],
          month: date['month']
        })
        .then(response => {
          if (!response.error) {
            this.interaction_summary = response.information
          } else {
            this.no_problem = false
            this.message = response.message
            this.status = response.status
          }
        })
        .finally(() => {
          this.loader_calendar = false
          this.loader = false
        })
      this.formatgraphic()
    },
    getDate() {
      let current_date = JSON.parse(localStorage.getItem('date'))
      return { year: current_date['year'], month: current_date['month'] }
    },
    formatgraphic() {
      let dataSerie = [
        {
          name: 'Madrugada',
          data: []
        },
        {
          name: 'Noche',
          data: []
        },
        {
          name: 'Tarde',
          data: []
        },
        {
          name: 'Mañana',
          data: []
        }
      ]
      let data = this.interaction_summary
      dataSerie.map(item => {
        item.data = []
        for (let index in data) {
          item.data.push({
            x: index,
            y: data[index][item.name]
          })
        }
      })
      this.series = dataSerie
    },
    initSelector() {
      let previous_year = new Date('2018')
      let date = new Date()
      let current_year = date.getFullYear()
      do {
        this.years.push(current_year)
        current_year = current_year - 1
      } while (current_year > previous_year.getFullYear())
      if (!localStorage.getItem('date')) {
        localStorage.setItem(
          'date',
          JSON.stringify({ year: date.getFullYear(), month: date.getMonth() })
        )
      }
      let current_date = JSON.parse(localStorage.getItem('date'))
      this.current_month = parseInt(current_date['month'])
      this.current_year = parseInt(current_date['year'])
    },
     modifyDate(type, event) {
       
      let modify_Date = this.getDate()
      if (type == 'year') {
        modify_Date['year'] = event
        localStorage.setItem('date', JSON.stringify(modify_Date))
      } else {
        modify_Date['month'] = event
        localStorage.setItem('date', JSON.stringify(modify_Date))
      }
      this.loader_calendar=true
     this.initReport()
    },
  },
  data: () => ({
    loader: true,
    no_problem: true,
    loader_calendar:false,
    years: [],
    months: [
      { id: 1, name: 'Enero' },
      { id: 2, name: 'Febrero' },
      { id: 3, name: 'Marzo' },
      { id: 4, name: 'Abril' },
      { id: 5, name: 'Mayo' },
      { id: 6, name: 'Junio' },
      { id: 7, name: 'Julio' },
      { id: 8, name: 'Agosto' },
      { id: 9, name: 'Septiembre' },
      { id: 10, name: 'Octubre' },
      { id: 11, name: 'Noviembre' },
      { id: 12, name: 'Diciembre' }
    ],

    chartOptions: {
      states: {
        normal: {},
        hover: {
          filter: {
            type: 'lighten',
            value: 0.1
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'lighten',
            value: 0
          }
        }
      },
      chart: {
        animations: {
          enabled: false,
          speed: 1000
        },
        type: 'heatmap',
        toolbar: {
          show: false
        },
      },
      tooltip:{
        enabled: true,
        z: {
          enabled: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#2f9b40'],
      yaxis : {
        show: false
      },
      xaxis : {
        labels: {
          show: false
        }
      }
    },

    days: [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo'
    ],
    series: [
      {
        name: 'Madrugada',
        data: [
          { x: 'Lunes', y: 0 },
          { x: 'Martes', y: 0 },
          { x: 'Miercoles', y: 0 },
          { x: 'Jueves', y: 0 },
          { x: 'Viernes', y: 0 },
          { x: 'Sabado', y: 0 },
          { x: 'Domingo', y: 0 }
        ]
      },
      {
        name: 'Noche',
        data: [
          { x: 'Lunes', y: 0 },
          { x: 'Martes', y: 0 },
          { x: 'Miercoles', y: 0 },
          { x: 'Jueves', y: 0 },
          { x: 'Viernes', y: 0 },
          { x: 'Sabado', y: 0 },
          { x: 'Domingo', y: 0 }
        ]
      },
      {
        name: 'Tarde',
        data: [
          { x: 'Lunes', y: 0 },
          { x: 'Martes', y: 0 },
          { x: 'Miercoles', y: 0 },
          { x: 'Jueves', y: 0 },
          { x: 'Viernes', y: 0 },
          { x: 'Sabado', y: 0 },
          { x: 'Domingo', y: 0 }
        ]
      },
      {
        name: 'Mañana',
        data: [
          { x: 'Lunes', y: 0 },
          { x: 'Martes', y: 0 },
          { x: 'Miercoles', y: 0 },
          { x: 'Jueves', y: 0 },
          { x: 'Viernes', y: 0 },
          { x: 'Sabado', y: 0 },
          { x: 'Domingo', y: 0 }
        ]
      }
    ],
    colors: ['#1867c0', '#fb8c00', '#000000']
  })
}
</script>
