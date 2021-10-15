<template>
  <div >
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <template v-if="no_problem">
        <router-view :information="resource_type_usage"  class="py-5 px-1 px-sm-5"></router-view>
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
        .resourceTypeUsage(current_course_id)
        .then(response => {
          if (!response.error) {
           this.resource_type_usage = response.information
          } else {
            this.no_problem = false
            this.warning["message"] = response.message
            this.warning["status"] = response.status
          }
        })
        .finally(() => {
          this.loader = false
        })
    }
  },

  data: () => ({
    current_course: null,
    loader: true,
    warning:[],
    no_problem: true
  })
}
</script>
