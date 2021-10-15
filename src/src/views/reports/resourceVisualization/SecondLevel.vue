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
          <help :report="{name:'resource_visualization', level:'first'}" />
          <download :report="{name:'resource_visualization', level:'second'}" :data="students" :title="title" />
        </v-col>
      </v-row>

      <template v-if="no_problem">
        <div class="report_table">
          <v-data-table
            :headers="headers"
            :items="students"
            :search="search"
            item-key="member_canvas_id"
            hide-default-footer
            :items-per-page="-1"
            :sort-by.sync="sort_by"
            :sort-desc.sync="sort_desc"
          >
            <template v-slot:[`item.name`]="{ item }" justify="end">
              <div class="d-flex first_item">
                <div
                  class="font-kanit-Medium font_size-text-1 text_color text_color-darkGray"
                  v-text="item.name"
                ></div>
              </div>
            </template>
            <template v-slot:[`item.views_count`]="{ item }">
              <div
                class="font-kanit-Medium font_size-text-1 text_color text_color-darkGray"
                v-text="item.views_count"
              ></div>
            </template>
          </v-data-table>
        </div>
      </template>
      <template v-else>
        <warning :message="'No posee estudiantes'"></warning>
      </template>
    </template>
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
      log.setReport(log.RESOURCE_VISUALIZATION)
      log.setDeep(log.SECOND_LEVEL)
      log.add()
      log.enable()
    },

    currentVariables() {
      this.current_module_id = parseInt(this.$route.params.module_id)
      this.current_resource_id = parseInt(this.$route.params.resource_id)
    },
    startReport() {
      if (this.$route.params.details) {
        this.title = this.$route.params.name_resource
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
      let modules = this.$COURSE['structure']
      let current_module = modules.find(
        item => item.canvas_id == this.current_module_id
      )
      let current_resource = current_module['resources'].find(
        module => module.canvas_id == this.current_resource_id
      )
      this.title = current_resource['resource_name']

      let current_module_student = this.information.find(
        module => module.canvas_id == this.current_module_id
      )
      return current_module_student['resources_visualizations'].find(
        resources => resources.resource_canvas_id == this.current_resource_id
      ).members_visualizations
    },

    filterReportInformation(student) {
      student.map(inf => {
        inf['name'] = this.$SECTION['members'].find(
          member => member.canvas_id == inf.member_canvas_id
        ).name
      })
      this.students = student
    },

  },
  data: () => ({
    button_color: '#a1a1a1',
    title: '',
    search: '',
    loader: true,
    no_problem: true,
    sort_by: 'views_count',
    sort_desc: true,
    headers: [
      {
        text: 'Estudiantes',
        value: 'name',
        class: 'text-font_header font-kanit-SemiBold text-uppercase '
      },
      {
        text: 'Interacciones',
        value: 'views_count',
        align: 'center',
        class: 'text-font_header font-kanit-SemiBold text-uppercase '
      }
    ]
  })
}
</script>
