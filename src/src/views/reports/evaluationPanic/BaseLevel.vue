<template>
  <div>
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <template v-if="no_problem">
        <router-view :information="evaluation_panic"  class="py-5 px-1 px-sm-3"></router-view>
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
      webservice
        .evaluationPanic(current_course_id)
        .then(response => {
          if (!response.error) {
             this.filterReportInformation(response.information)
          } else {
            this.no_problem = false
            this.warning["message"] = response.message
            this.warning["status"] = response.status
          }
        })
        .finally(() => {
          this.loader = false
        })
        
    },
        filterReportInformation(information) {
       if (Object.entries(information).length != 0)  {
        this.evaluation_panic = information
      } else {
        this.warning["message"] = 'El curso actualmente no posee evaluaciones'
        this.no_problem = false
       this.warning["status"] = -1
      }
    }
  },

  data: () => ({
    current_course: null,
    loader: true,
    no_problem: true,
    warning:[]
  })
}
</script>
