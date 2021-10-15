<template>
  <v-container fill-height align="center" justify="center">
    <v-row align="center" justify="center" no-gutters>
      <v-col align="center" cols="12">
        <v-progress-circular :size="59" :width="6" color="#f69f19" indeterminate>
        </v-progress-circular>
     
      </v-col>
      <v-col align="center" cols="12" >
             <span :class="color" class="loading_text">
               Cargando...
               </span> 
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Loading",
  props:{
    color:{
      default:'black'
    }
  }
};
</script>
<style lang="scss" scoped>

.loading_text{
    font-family: "Lato", "Roboto", "sans-serif" !important;
  font-weight: normal;
  font-size:1rem;
  color: black;
  &.black{
  background-color: transparent !important;
  color:black;
}
&.white{
  background-color: transparent !important;
  color:white;
}
}
</style>