<template>
  <div>
      <h4
        v-text="title"
        class="text-left text-uppercase pl-3 pb-3 text-truncate"
      ></h4>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field class="filter" color="#575756" v-model="search"
            filled dense rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
          <help :report="{ name: 'evaluation_panic', level: 'first',log_level:'third_level' }" />
          <download :report="{name:'evaluation_panic', level:'third',log_level:'third_level'}" :data="viewed" 
          :title="title" />
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="viewed"
        item-key="member_canvas_id"
        hide-default-footer
        :items-per-page="-1"
        :sort-by.sync="sort_by"
        :sort-desc.sync="sort_desc"
        :search="search"
      >
        <template v-slot:[`item.name`]="{ item }" justify="end">
          <div class="d-flex first_item">
            <div
              class="font-kanit-Medium font_size-text-1 text_color text_color-darkGray"
              v-text="item.name"
            ></div>
          </div>
        </template>
        <template v-slot:[`item.count_views`]="{ item }" justify="end">
          <div
            class="font-kanit-Medium font_size-text-1 text_color text_color-darkGray"
            v-text="item.count_views"
          ></div>
        </template>
      </v-data-table>
  </div>
</template>

<script>
import Log from '@/models/log'

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
      log.setReport(log.EVALUATION_PANIC)
      log.setDeep(log.THIRD_LEVEL)
      log.add()
      log.enable()
    },

    currentVariables() {
      this.resource_id = this.$route.params.resource_id
      this.type = this.$route.params.type
      this.date = this.$route.params.date
      this.resource_detail_id = this.$route.params.resource_detail
    },
    startReport() {
      if (this.$route.params.details) {
        this.title = this.$route.params.title
        this.filterReportInformation(this.$route.params.details)
      } else {
        this.consultReportData()
      }
      this.loader = false
    },
    consultReportData() {
      let student = this.filterData()
      this.filterReportInformation(student)
    },
    filterData() {
      let structure = this.$COURSE['structure']
       structure.find(element => {
       let dd =  element.resources.find(
          h => h.canvas_id == this.resource_detail_id
        )
        if (dd != undefined) {
          this.title = dd.resource_name
          return 'si'
        }
      })
      let current = this.information.find(
        e => e.quiz.canvas_id == this.resource_id
      )

      return current[this.type][this.date].find(
        e => e.resource_canvas_id == this.resource_detail_id
      ).members_interactions
    },
    filterReportInformation(student) {
      let viewed = student.filter(member => member.count_views > 0)
      viewed.map(inf => {
        inf['name'] = this.$SECTION['members'].filter(
          member => member.canvas_id == inf.member_canvas_id
        )[0]['name']
      })
      this.viewed = viewed
    },       
  },
  data: () => ({
    button_color: '#a1a1a1',
    title: '',
    viewed: [],
    search: '',

    sort_by: 'count_views',
    sort_desc: false,
    headers: [
      {
        text: 'Estudiante',
        value: 'name'
      },
      {
        text: 'Visualizaciones',
        value: 'count_views',
        align: 'center'
      }
    ],
    tab: null
  })
}
</script>
