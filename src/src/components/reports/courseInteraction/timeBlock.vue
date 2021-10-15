<template>
  <v-layout class="d-flex align-center">
    <v-flex :class="['icon-box d-flex justify-center align-center', getIconBackground()]">
       <img :src="require(`@/assets/img/${icon}.svg`)" width="20">
    </v-flex>
    <v-flex>
      <span class="block-label py-1 pl-1 pl-sm-6 pr-3" v-text="label"></span>
    </v-flex>
  </v-layout>
</template>
<style lang="scss" scoped>
.block-label{
    font-family: "Lato", "Roboto", "sans-serif" !important;
    font-size: .8rem;
    background: white;
    border-radius: 0 50px 50px 0;
}
.icon-box{
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
 @media (max-width: 400px) {
  right: 0;
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
</style>
<script>
export default {
  props : ['block_name','label', 'icon'],
  methods : {
    getIconBackground(){
      return `${this.block_name}-background`
    }
  }
}

</script>
