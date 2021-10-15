<template>
  <div class="outside-x-labels-container d-flex justify-center">
    <div class="x-labels-container d-flex pb-2">
      <div class="x-label-item d-flex justify-center" v-for="(day, index) in days" :key="index">
        <span v-text="day"></span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@mixin all-with($val){
  min-width: $val;
  width: $val;
  max-width: $val;
}
.outside-x-labels-container{
  background: #f6f6f6;
  z-index: 2;
}
.x-labels-container{
  z-index: 2;
  @include all-with(97%);
  background: white;
  border: 2px solid #d0d0d0;
  border-radius: 0 0 10px 10px;
  position: relative;
  top: -31px;
  left: -2px;
}
.x-label-item{
  width: 14.28571428571429%;
  height: auto;
  font-family: "Lato", "Roboto", "sans-serif" !important;
  font-size: .9rem;
}

@media(max-width: 600px){
  .x-labels-container{
    top: -31px;
    @include all-with(93%);
  }
}
@media(max-width: 633px){
  .x-labels-container{
    top: -36px;
  }
}
@media(max-width: 700px){
  .x-labels-container{
    @include all-with(95%);
  }
}

@media(min-width: 1800px){
  .x-labels-container{
    @include all-with(98%);
  }
}
</style>
<script>
export default {
  props : [],
  data(){
    return {
      days : ['Lun','Mar', 'Mié', 'Jue', 'Vie','Sáb','Dom']
    }
  }
}
</script>
