<template>
  <div class="focus-progress d-flex align-center justify-start">
    <v-progress-linear
      class=" progress-width"
      :value="percentage"
      color="#f69f19"
      rounded
      height="10"
    >
    </v-progress-linear>
    <div class="pl-2">
    {{percentage}} %
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressLinear',
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" >

 .focus-progress {
    text-align: -moz-center;
    text-align: -webkit-center;
    .v-progress-linear__buffer {
        background: rgba(242, 175, 95, .1);
  border:2px #F2AF5F solid;
    }
    .progress-width {
      width: 200px;
      @media only screen and (max-width: 900px) {
        & {
          max-width: 180px;
        }
      }
      @media only screen and (max-width: 800px) {
        & {
          width: 180px;
        }
      }
      @media only screen and (max-width: 600px) {
        & {
          width: 120px;
        }
      }
    }
  }
</style>
