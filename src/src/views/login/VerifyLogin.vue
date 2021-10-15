<template>
  <v-container full-height >
    <template v-if="status">
      <loading color="white"></loading>
    </template>
    <template v-else>
      <error :message="message"></error>
    </template>
  </v-container>
</template>
<script>
import Authentication from '@/models/authentication'
export default {
  name: 'verifyLogin',
  mounted() {
    this.initVerify()
  },
  methods: {
    initVerify() {
      let authentication = new Authentication()
      let code = this.$route.params.code
      authentication
        .Create(code)
        .then(response => {
          if (response.status == 200) {
            authentication.registerToken({
              user: response.data.user,
              token: response.data.token
            })
            this.$router.push('/courses')
          }
        })
        .catch(function(err) {
          console.log(err)
        })
        .finally(() => {
          this.status = false
          this.message = 'error'
        })
    }
  },
  data: () => ({
    status: true,
    message: ''
  }),

}
</script>
