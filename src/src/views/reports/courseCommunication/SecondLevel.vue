<template>
  <div>
      <h4 v-text="title" class="text-left text-uppercase pl-3 pb-3 text-truncate"
      ></h4>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field class="lato lato--regular filter" color="#575756" v-model="search" filled dense
            rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
          <help :report="{name:'course_communication', level:'first'}" />
          <download :report="{name:'course_communication', level:'second'}" :data="students" :title="title" />
        </v-col>
      </v-row>
    <div class="report_table">
      <v-data-table :headers="headers" :items="students" :search="search"
        item-key="member_canvas_id"  :items-per-page="-1" hide-default-footer :sort-by.sync="sort_by" :sort-desc.sync="sort_desc">
        <template v-slot:[`item.name`]="{ item }" justify="end">
          <div class="d-flex first_item">
            <div class="font-kanit-Medium font_size-text-1 text_color text_color-darkGray" v-text="item.name"></div>
          </div>
        </template>
        <template v-slot:[`item.views_count`]="{ item }">
          <div class="font-kanit-Medium font_size-text-1 text_color text_color-darkGray" v-text="item.views_count"></div>
        </template>
      </v-data-table>
    </div>
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
      log.setReport(log.COURSE_COMMUNICATION)
      log.setDeep(log.SECOND_LEVEL)
      log.setReference(this.$route.params.type)
      log.add()
      log.enable()
    },

    currentVariables() {
      this.type_communication = this.$route.params.type
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
      let student = this.filterStudents()
      this.filterReportInformation(student)
    },
    filterStudents() {
      if (this.type_communication == 'discussion') {
        this.title = 'Foros no evaluados'
        return this.information['discussion_entry_list']
      } else {
        this.title = 'Correos'
        return this.information['mail_messages_list']
      }
    },
    filterReportInformation(student) {
      student.map(inf => {
        inf['name'] = this.$SECTION['members'].filter(
          member => member.canvas_id == inf.member_canvas_id
        )[0]['name']
      })
      this.students = student
    },
  },
  data: () => ({
    students: [],
    title: '',
    search: '',
    sort_by: 'creation_count',
    sort_desc: true,
    headers: [
      {
        text: 'Nombres',
        value: 'name',
        sortable: true,
        class: 'text-font_header font-kanit-SemiBold text-uppercase '
      },
      {
        text: 'Entradas creadas',
        value: 'creation_count',
        align: 'center',
        class: 'text-font_header font-kanit-SemiBold text-uppercase '
      }
    ]
  })
}
</script>
