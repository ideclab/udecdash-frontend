<template>
  <v-container fill-height align="center" justify="center">
    <v-row align="center" justify="center" no-gutters>
     
      <v-col align="center" cols="12">
        <span class=" message " v-html="information['message']">
        </span>
      </v-col>
      <v-col align="center" cols="12" class="mt-6">
        <v-btn v-if="information.btn" outlined class="mt-2 back"  rounded  @click="back()">
        Volver
          <v-icon class="pl-4">
            mdi-reload
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import {  mdiAlertOutline   } from '@mdi/js';

export default {
  name: "Warning",
  data:()=>({
 mdiAlertOutline : mdiAlertOutline ,

  }),
  props: {
    information: {
      default: {
        message: "",
        btn:false
      },
    },
  },
  methods:{
    back(){
        this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" scoped>
.lato {
 
}
.imf{
    color: red;
}
.back{
  font-size: 1rem;
    text-transform: capitalize;
    font-family: "OpenSans", "Lato", "Roboto";
    font-weight: bold;
      color: #38b9d1;
      border:2px #38b9d1 solid;
    
}
.message{
      text-transform: capitalize;
    font-family: Lato, "Roboto", "sans-serif" !important;
    font-weight: bold;
      color:#575655;
  font-size: 1.2rem;
}
.color_yellow{
  color:#f49e16;
}
</style>
