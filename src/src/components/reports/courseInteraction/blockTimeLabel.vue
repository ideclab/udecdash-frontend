<template>
  <v-layout class="d-flex fill-height align-center justify-end label-container">
    <div class="block-label" v-text="label"></div>
    <div class="d-flex fill-height align-center">
      <v-flex :class="['icon-box d-flex justify-center align-center', getBackgroundColor()]">
       <img :src="require(`@/assets/img/${icon}.svg`)" width="20">
      </v-flex>
      <v-flex :class="['connector-bar', getBackgroundColor()]"></v-flex>
    </div>
  </v-layout>
</template>
<style lang="scss" scoped>
.label-container{
  position: relative;
  left: -20px;
}
.block-label {
    font-family: "Lato", "Roboto", "sans-serif" !important;
    font-size: .8rem;
}
.icon-box{
  z-index: 1;
  min-width: 40px;
  min-height: 40px;
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  background: gray;
  position: relative;
  right: -15px;
  & .v-icon{
    font-size: 1.6rem !important;
  }
}
.morning-background{
  background: #e0ce28 !important;
}
.afternoon-background{
  background: #f69f19 !important;
}
.evening-background{
  background: #257b84 !important;
}
.night-background{
  background: #f27781 !important;
}
.connector-bar{
  min-width: 100%;
  // width: 200px;
  // max-width: 200px;
  height: 2px;
  background: gray;
  z-index: 0;
}
</style>
<script>
export default {
  props : ['block_name','label', 'icon'],
  methods : {
    getBackgroundColor(){
      return `${this.block_name}-background`
    }
  }
}

</script>
