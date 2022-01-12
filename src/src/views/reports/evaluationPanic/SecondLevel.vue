<template>
  <div>
      <h4
        v-text="name_resource"
        class="text-left text-uppercase pl-3 pb-3 text-truncate"
      ></h4>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field class="filter" color="#575756" v-model="search"
            filled dense rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
          <help :report="{ name: 'evaluation_panic', level: 'first',log_level:'second_level' }" />
          <download :report="{name:'evaluation_panic', level:'second',log_level:'second_level'}" :data="resources" 
          :title="name_resource" />
        </v-col>
      </v-row>
        <v-data-table :headers="headers" :items="resources"
          :search="search" item-key="resource_canvas_id" hide-default-footer no-data-text="No hay datos disponibles"
          :items-per-page="-1" class="workflow_state_on has_depth" :sort-by.sync="sort_by" :sort-desc.sync="sort_desc"
        >
          <template v-slot:[`item.workflow_state`]="{ item }">
            <div
              v-text="stateInSpanish(item.workflow_state)"
            ></div>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <div class="d-flex  align-center ">
             <item-state :state="item.workflow_state" type="Recurso" />
            <div class=" text-center type_text--name" v-text="item.name"></div>
          </div>
          </template>
          <template v-slot:[`item.members_visualization_percentage`]="{ item }">
            <progress-linear
              :percentage="item.members_visualization_percentage"
            ></progress-linear>
          </template>
          <template v-slot:[`item.view`]="{ item }">
             <navigation-button 
          :NavigationRoute="{ 
            name: 'evaluation_analysis_third', 
            params: {
                  resource: resource_id,
                  type: type,
                  date: date,
                  resource_detail: item.resource_canvas_id,
                  title: item.name,
                  details: item.members_interactions
                }}"/>      

          </template>
        </v-data-table>

  </div>
</template>
<script>
import Log from '@/models/log'

export default {
  props: ['information'],
  created() {
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
      log.setDeep(log.SECOND_LEVEL)
      log.add()
      log.enable()
    },
    currentVariables() {
      this.resource_id = this.$route.params.resource_id
      this.type = this.$route.params.type
      this.date = this.$route.params.date
    },
    startReport() {
      if (this.$route.params.details) {
        this.filterReportInformation(this.$route.params.details)
      } else {
        this.consultReportData()
      }
    },
    consultReportData() {
      let data = this.filterData()
      this.filterReportInformation(data)
    },
    filterData() {
      let current = this.information.find(
        e => e.quiz.canvas_id == this.resource_id
      )
      
      this.name_resource = current.quiz.resource_name
      return current[this.type][this.date]
    },
    filterReportInformation(resources) {
      resources.map(resource => {
        this.$COURSE.structure.map(element => {
          let aux_element = element.resources.find(
            h => h.canvas_id == resource.resource_canvas_id
          )
          if (aux_element != undefined) {
            resource['name'] = aux_element.resource_name
            resource['workflow_state'] = this.workflowState({
              module: aux_element.module_item_workflow_state,
              item: aux_element.workflow_state
            })
          }
        })
      })
      if (Object.entries(resources).length != 0) {
        this.resources = resources
      } else {
         this.warning['message'] = "No existen Recursos vistos";
        this.warning['color'] = "#f49e16";
      }
    },

    colorStatus(state) {
      if (state == 'active') {
        return 'resource_status_color green-border '
      } else {
        return 'resource_status_color gray-border'
      }
    },
    stateInSpanish(state) {
      if (state == 'active') {
        return 'Activo'
      } else {
        return 'Desactivado'
      }
    },

  },
  data: () => ({
    name_resource: null,
    resource_id: null,
    sort_by: 'all_visualizations_count',
    sort_desc: true,
    type: null,
    warning:[],
    search: '',
    resources: [],
    headers: [
      {
        text: 'Estado',
        value: 'workflow_state',
        sortable: false,
        class:
          'd-flex d-sm-none'
      },
      {
        text: 'Recurso',
        value: 'name',
      },
      {
        text: 'Visualizaciones',
        value: 'all_visualizations_count',
        align: 'center',
      },
      {
        text: 'Estudiantes',
        value: 'distinct_members_count',
        align: 'center',
      },
      {
        text: 'porcentaje del curso',
        value: 'members_visualization_percentage',
        align: 'center',
        width:350
      },

      {
        text: '',
        value: 'view',
        sortable: false,
        width:25
      }
    ]
  })
}
</script>
