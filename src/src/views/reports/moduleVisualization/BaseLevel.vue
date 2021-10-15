<template>
  <div>
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <template v-if="no_problem">
        <router-view :information='module_visualization'  class="py-5 px-1 px-sm-5"></router-view>
      </template>
      <template v-else>
        <warning :information="warning"></warning>
      </template>
    </template>
  </div>
</template>

<script>
import Webservice from '@/models/webservice'
export default {
  name: 'baseLevel',
  created() {
    this.startReport()
  },
  methods: {
    startReport() {
      let current_course_id = parseInt(this.$route.params.course_id)
      let webservice = new Webservice()
      webservice.moduleVisualization(current_course_id).then(response => {
        if (!response.error) {
          this.filterReportInformation(response.information)
        } else {
          this.no_problem = false
          this.warning["message"] = response.message
          this.warning["status"] = response.status
        }
        }).finally(() => {
          this.loader = false
        })
    },
    filterReportInformation(information) {
      information.map(module => {
        module['resources'] = this.$COURSE['structure'].find(
          element => element.canvas_id == module.canvas_id
        ).resources
      })
      if (Object.entries(information).length != 0) {
        this.module_visualization = information
      } else {
        this.warning["message"] = 'No se han detectado Módulos en el curso'
        this.no_problem = false
        this.warning["status"] = -1
      }
    }
  },
  data: () => ({
    loader: true,
    no_problem: true,
    warning:[]
  })
}
</script>

