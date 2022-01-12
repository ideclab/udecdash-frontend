<template>
  <div>
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <h4
        v-text="title"
        class="text-left text-uppercase pl-3 pb-3 text-truncate"
      ></h4>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field class="lato lato--regular filter" color="#575756" v-model="search" filled dense
            rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
          <help :report="{name:'file_type_usage', level:'first',log_level:'third_level'}" />
          <download :report="{name:'file_type_usage', level:'third',log_level:'third_level'}" :data="students" :title="title" />
        </v-col>
      </v-row>
      <template v-if="no_problem">
          <v-data-table :headers="headers"
            :items="students" item-key="member_canvas_id" hide-default-footer :items-per-page="-1"
            :sort-by.sync="sort_by" :sort-desc.sync="sort_desc" :search="search" justify="end"
          >
            <template v-slot:[`item.name`]="{ item }" justify="end">
                <div v-text="item.name" ></div>
            </template>
            <template v-slot:[`item.first_view`]="{ item }">
              <template v-if="item.first_view">
                <span v-html="getFormatedDate(item.first_view)"></span>
              </template>
              <template v-else>
                <p style="font-weight:900; font-size:20px">__</p>
              </template>
            </template>
            <template v-slot:[`item.viewed`]="{ item }">
         <display-state :state="item.viewed" class="d-none d-sm-flex" />
              <span
                class="d-flex d-sm-none text-center"
                v-text="item.viewed ? 'si' : 'no'"
              ></span>
            </template>
          </v-data-table>
      </template>
      <template v-else>
        <warning :information="warning"></warning>
      </template>
    </template>
  </div>
</template>
<script>

import Log from '@/models/log'
import DateFormatter from '@/models/DateFormatter'

export default {
  props: ['information'],
  mounted() {
    this.currentVariables()
    this.startReport()
    this.createLog()
    this.$Session.updateActivity()
  },
  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id)
      log.setContext(log.REPORT_CONTEXT)
      log.setReport(log.FILE_TYPE_USAGE)
      log.setDeep(log.THIRD_LEVEL)
      log.add()
      log.enable()
    },

    currentVariables() {
      this.current_resource_id = parseInt(this.$route.params.file)
    },
    startReport() {
      if (this.$route.params.details) {
        this.title = this.$route.params.name_resource
        this.filterReportInformation(this.$route.params.details)
      } else {
        this.consultReportData()
      }
    },
    consultReportData() {
      let students = this.filterResources()
      this.filterReportInformation(students)
    },
    filterResources() {
      this.name_file = this.$route.params.type
      let resources_item = this.information[this.name_file][
        'resources_interactions'
      ]
      let resources = this.information[this.name_file]['resources']
      resources = resources.find(
        item => item.canvas_id == this.current_resource_id
      )

      let resources_visualization = resources_item.find(
        resourse => resourse.resource_canvas_id == this.current_resource_id
      )
      this.title = resources.resource_name
      return resources_visualization.members_visualizations
    },
    filterReportInformation(students) {
      students.map(inf => {
        inf['name'] = this.$SECTION['members'].find(
          member => member.canvas_id == inf.member_canvas_id
        ).name
      })
      if (Object.entries(students).length != 0) {
        this.students = students
      } else {
       this.warning["message"] =  'No existen Recursos'
        this.no_problem = false
      }
      this.loader = false
    },
    getFormatedDate(date){
      let date_formatter = new DateFormatter(date)
      return date_formatter.friendly('<br />', '- -', 'light')
    }
  },
  data: () => ({
    loader: true,
    no_problem: true,
    student_name: '',
    search: '',
    title: '',
    sort_by: 'first_view',
    sort_desc: true,
    headers: [
      {
        text: 'Nombres',
        value: 'name',
        align: 'left',
      },
      {
        text: 'Primera interacción',
        value: 'first_view',
        align: 'center',
      },
      {
        text: 'visualizado',
        value: 'viewed',
        align: 'center',
      }
    ]
  })
}
</script>
