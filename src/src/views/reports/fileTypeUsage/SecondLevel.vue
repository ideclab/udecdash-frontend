<template>
  <div >
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
    <h4 v-text="type"
       class="text-left text-uppercase pl-3 pb-3 text-truncate"
      ></h4>
      <template v-if="files.length>0">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field class=" filter" color="#575756" v-model="search"
              filled dense rounded prepend-inner-icon="mdi-magnify"
              label="Buscar" single-line hide-details></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
            <help :report="{ name: 'file_type_usage', level: 'first' ,log_level:'second_level'}" />
            <download :report="{ name: 'file_type_usage', level: 'second',log_level:'second_level' }" :data="files" :title="type"/>
          </v-col>
        </v-row>
        <v-data-table class="workflow_state_on has_depth" :headers="headers" :items="files"
          :search="search" item-key="new_canvas_id" :items-per-page="-1" hide-default-footer
        >
          <template v-slot:[`item.new_workflow_state`]="{ item }">
            <div
              v-text="stateName(item.new_workflow_state)"
            ></div>
          </template>
          <template v-slot:[`item.resource_name`]="{ item }">
            <div class="d-flex items-center">
            <item-state :state="item.new_workflow_state" type="Recurso" />
              <div
                v-text="item.resource_name"
              ></div>
            </div>
          </template>
          <template v-slot:[`item.download`]="{ item }">
            <div
              class="text-center"
              v-text="item.download"
            ></div>
          </template>
          <template
            v-slot:[`item.members_visualizations_percentage`]="{item}">
            <progress-linear
              :percentage="item.members_visualizations_percentage"
            ></progress-linear>
          </template>
          <template v-slot:[`item.view`]="{ item }">
                  <navigation-button
              :NavigationRoute="{
                name: 'file_type_usage_third',
                 params: {
                  type: type,
                  file: item.canvas_id,
                   name_resource: item.resource_name,
                  details: item.members_visualizations
                }}"
            />
          </template>
        </v-data-table>
      </template >
        <template v-else>
          <no-data :information="{message:`El curso no posee ${type} `,btn:true}"></no-data>
        </template>
    </template>
  </div>
</template>

<script>
import Log from '@/models/log'
import NoData from "@/components/alerts/NoData.vue";

export default {
  components: { NoData},

  props: ['information'],
  created() {
    this.startReport()
    this.createLog()
    this.$Session.updateActivity()
  },
  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id)
      log.setContext(log.REPORT_CONTEXT)
      log.setReport(log.FILE_TYPE_USAGE)
      log.setDeep(log.SECOND_LEVEL)
      log.add()
      log.enable()
    },

    async startReport() {
      this.type = this.$route.params.type
      let files_item = this.information[this.type][
        'resources_interactions'
      ]
      let resources = this.information[this.type]['resources']
      resources.map((item, index) => {
        let download = 0
        let resourse = files_item.find(
          resourse => resourse.resource_canvas_id == item.canvas_id
        )
        item[
          'new_canvas_id'
        ] = `${item['canvas_id']}${item['position']}${index}`
        item['members_visualizations'] = resourse['members_visualizations']
        item['members_visualizations_percentage'] =
          resourse['members_visualizations_percentage']
        resourse['members_visualizations'].forEach(e => {
          download = download + e['downloads_count']
        })
        item['download'] = download
        item['new_workflow_state'] = this.workflowState({
          module: item['module_item_workflow_state'],
          item: item['workflow_state']
        })
      })
      this.files = resources
      this.loader = false
    },

    stateName(state) {
      if (state == 'active') {
        return 'activo'
      } else {
        return 'Desactivado'
      }
    },

  },
  data: () => ({
    loader: true,
    current_course: null,
    name_resource: null,
    no_problem: true,
    search: '',
    resources_item: [],
    resources: [],
    headers: [
      {
        text: 'Estado',
        value: 'new_workflow_state',
        sortable: false,
        class:
          'text-font_header font-kanit-SemiBold text-uppercase d-flex d-sm-none'
      },
      {
        text: 'Nombre',
        value: 'resource_name'
      },
      {
        text: 'Descarga',
        value: 'download',
        align: 'center'
      },
      {
        text: 'Porcentaje de visualización',
        value: 'members_visualizations_percentage',
        width: 350,
        
      },
      { text: '', value: 'view',width: 15 }
    ]
  })
}
</script>
<style lang="scss" scoped>
.items-center{
  align-items: center;
}
.dd{
  height: 100%;
}
</style>