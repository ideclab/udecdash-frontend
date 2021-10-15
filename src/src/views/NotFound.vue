<template>
  <v-container fill-height align="center" justify="center">
    <v-row align="center" justify="center">
      <v-col align="center">
        <router-link
          :to="{
            name: 'Login'
          }"
          outlined
          small
        >
          <v-btn elevation="2">
            No encontrado
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'NotFound',
  methods: {
    initVerify() {
    }
  },
  created() {
    this.initVerify()
  }
}
</script>