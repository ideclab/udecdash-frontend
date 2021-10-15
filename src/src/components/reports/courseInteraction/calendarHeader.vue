<template>
  <div class="calendar-header-container d-flex justify-space-around py-1">
    <div v-for="(day,index) in days" :key="index" v-text="day" class="day-name"></div>
  </div>
</template>
<style lang="scss">
.calendar-header-container{
  width: 100%;
  background: white;
  border: 1px solid #e4e4e4;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
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
