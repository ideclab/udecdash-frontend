<template>
  <v-parallax :src="getImgUrl(background)" height="100%">
    <v-container fill-height class="welcome background-cont">
      <v-row align="center" justify="center">
        <v-col cols="5" sm="5" md="3" style="text-align: -webkit-right">
          <v-img
            :src="getImgUrl('logo_udec.png')"
            class="img_welcome"
            width="90%"
          />
        </v-col>
        <v-col cols="6" sm="5" md="3">
          <v-img
            :src="getImgUrl('logo_ideclab.png')"
            class="img_welcome"
            width="100%"
          />
        </v-col>

        <v-col cols="12">
          <h1 v-text="title"></h1>
          <h3 style="font-weight: 400" v-text="description"></h3>
        </v-col>
        <v-col cols="12" class="v-stepper__on_screen_rendering">
          <router-link
            v-for="buttom in buttoms"
            :key="buttom.title"
            :to="{ name: buttom.route }"
          >
            <v-btn class="ma-2 btn-welcome" tile outlined v-text="buttom.title">
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  name: 'Welcome',
  data: () => ({
    title: 'DASHBOARD INTERACTIVO',
    description: `Dashboard interactivo es una plataforma para visualizar reportes relacionados con Canvas LMS.`,
    buttoms: [
      { title: 'Inicio', route: 'module_visualization_first' },
      { title: 'Tutorial', route: 'Tutorial' }
    ],
    imgs: ['logo_udec.png', 'logo_ideclab.png'],
    background: 'background_bar.png'
  }),
  methods: {
    getImgUrl(img) {
      var images = require.context('../assets/img/', false, /\.png$/)
      return images('./' + img)
    },
    currentSelectedGroup() {
      localStorage.removeItem('year')
      localStorage.removeItem('month')
    }
  },
  created: function() {
    this.currentSelectedGroup()
  }
}
</script>
<style lang="scss" scoped>
.background-cont {
  min-height: calc(100vh) !important;
}

.btn-welcome {
  color: azure !important;
}
@media only screen and (max-width: 700px) {
  #app .welcome .v-stepper__on_screen_rendering,
  #app .tutorial .v-stepper__on_screen_rendering {
    background: none;
  }
}
</style>
