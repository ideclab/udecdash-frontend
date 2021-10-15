<template>
  <v-row no-gutters>
    <v-col class="mb-2 mb-md-0" cols="6" md="3">
      <time-block block_name="morning" icon ="Manana" label="06hrs A 12hrs"></time-block>
    </v-col>
    <v-col class="mb-2 mb-md-0" cols="6" md="3">
      <time-block block_name="afternoon" icon ="Tarde" label="12hrs A 18hrs"></time-block>
    </v-col>
    <v-col cols="6" md="3">
      <time-block block_name="evening" icon ="Noche" label="18hrs A 00hrs"></time-block>
    </v-col>
    <v-col cols="6" md="3">
      <time-block block_name="night" icon ="Madrugada" label="00hrs A 06hrs"></time-block>
    </v-col>
  </v-row>
</template>
<script>
import timeBlock from '@/components/reports/courseInteraction/timeBlock'
export default {
  props : [],
  components : {
    'time-block' : timeBlock
  },
}
</script>
