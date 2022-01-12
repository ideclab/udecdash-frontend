<template>
  <div>
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <h4
        v-text="name_resource"
        class="text-left text-uppercase pl-3 pb-3 text-truncate"
      ></h4>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field class="lato lato--regular filter" color="#575756" v-model="search" filled dense
            rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
          <help :report="{name:'interaction_by_resource', level:'first',log_level:'second_level'}" />
         <download :report="{name:'interaction_by_resource', level:'second',log_level:'second_level'}" :data="members" :title="name_resource" />
        </v-col>
      </v-row>
      <template v-if="no_problem">
        <div class="report_table">
          <v-data-table
            :headers="headers"
            :items="members"
            item-key="canvas_id"
            hide-default-footer
            :items-per-page="-1"
            :sort-by.sync="sort_by"
            :sort-desc.sync="sort_desc"
            :search="search"
          >
            <template v-slot:[`item.name`]="{ item }" justify="end">
                <div v-text="item.name"></div>
            </template>
            <template v-slot:[`item.current_resource.first_view`]="{ item }">
              <template v-if="item.current_resource.first_view">
                  <span v-html="getFormatedDate(item.current_resource.first_view)"></span>
              </template>
              <template v-else>
                <p style="font-weight:900; font-size:20px">__</p>
              </template>
            </template>
            <template v-slot:[`item.current_resource.viewed`]="{ item }">
                <display-state :state="item.current_resource.viewed" class="d-none d-sm-flex" />
              <span
                class="d-flex d-sm-none text-center"
                v-text="item.current_resource.viewed ? 'si' : 'no'"
              ></span>
            </template>
          </v-data-table>
        </div>
      </template>
      <template v-else>
        <warning :message="message"></warning>
      </template>
    </template>
  </div>
</template>
<script>
import Log from '@/models/log'
import DateFormatter from '@/models/DateFormatter'

export default {
  props: ['information', 'name'],
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
      log.setReport(log.INTERACTION_BY_RESOURCE)
      log.setDeep(log.SECOND_LEVEL)
      log.add()
      log.enable()
    },

    currentVariables() {
      this.resource_id = parseInt(this.$route.params.resource_id)
      this.module_id = parseInt(this.$route.params.module_id)
    },
    startReport() {
      if (this.$route.params.details) {
        this.name_resource = this.$route.params.name
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
      let structure = this.$COURSE['structure']
      let current_loca_module_resources = structure.find(
        element => element.canvas_id == this.module_id
      )
      let current_module = this.information.find(
        element => element.canvas_id == this.module_id
      )

      this.name_resource = current_loca_module_resources['resources'].find(
        resource => resource.canvas_id == this.resource_id
      ).resource_name
      return current_module['members']
    },
    filterReportInformation(members) {
      members.map(member => {
        member['current_resource'] = member.module_resources.find(
          e => e.resource_canvas_id == this.resource_id
        )
      })
      this.members = members
    },
    seenIcon(state) {
      if (state) {
        return 'mdi-check'
      } else {
        return 'mdi-close'
      }
    },
    colorIcon(state) {
      if (!state) {
        return 'icon-check'
      } else {
        return 'icon-close'
      }
    },

    getFormatedDate(date){
      let date_formatter = new DateFormatter(date)
      return date_formatter.friendly('<br />', '- -', 'light')
    }
    

  },
  data: () => ({
    loader: true,
    no_problem: true,
    search: '',
    sort_by: 'current_resource.first_view',
    sort_desc: true,
    headers: [
      {
        text: 'Nombres',
        value: 'name',
        class: 'text-font_header font-kanit-SemiBold text-uppercase '
      },
      {
        text: 'Primera interacción',
        value: 'current_resource.first_view',
        align: 'center',
        class: 'text-font_header font-kanit-SemiBold text-uppercase '
      },
      {
        text: 'visualizado',
        value: 'current_resource.viewed',
        align: 'center',
        class: 'text-font_header font-kanit-SemiBold text-uppercase '
      }
    ]
  })
}
</script>
