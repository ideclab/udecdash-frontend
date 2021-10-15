<template>
  <div class="y-labels-container">
      <time-label class="item" block_name="morning" icon ="Manana" label="Mañana"></time-label>
      <time-label class="item" block_name="afternoon" icon ="Tarde" label="Tarde"></time-label>
      <time-label class="item" block_name="evening" icon ="Noche" label="Noche"></time-label>
      <time-label class="item" block_name="night" icon ="Madrugada" label="Madrugada"></time-label>
  </div>
</template>
<style lang="scss">
.y-labels-container{
  height: 258px;

  .item{
    height: 25%;
    width: 100%;
  }
}

@media(max-width: 633px){
  .vertical-border-end{
    height: 251px !important;
  }
}
</style>
<script>
import blockTimeLabel from '@/components/reports/courseInteraction/blockTimeLabel'
export default {
  props : [],
  components : {
    'time-label' : blockTimeLabel
  },
}
</script>
