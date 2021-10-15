<template>
  <div class="report_container">
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <template v-if="no_problem">
        <router-view :information='course_communication'  class="py-5 px-1 px-sm-5"></router-view>
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
        .courseCommunication(current_course_id)
        .then(response => {
          if (!response.error) {
            this.course_communication = response.information
          } else {
            this.no_problem = false
             this.warning["message"] = response.message
            this.warning["status"]  = response.status
          }
        })
        .finally(() => {
          this.loader = false
        })
    },
  },

  data: () => ({
    loader: true,
    warning:[],
    no_problem: true,
    course_communication:[]
  })
}
</script>
