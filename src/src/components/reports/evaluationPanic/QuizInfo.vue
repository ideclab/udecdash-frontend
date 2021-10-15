<template>
<v-layout column class="icons">
  <v-icon v-text="icon"  class=" mb-2" size="40" :color="color"></v-icon>
  <span v-text="label" class="label"></span>
  <span v-html="getFormatedDate()"></span>
</v-layout>
</template>

<style lang="scss" scoped>
.icons{
  align-items: center;

    .v-icon__svg{
      height: 45px !important;
      width: 45px !important;
}

  }
  *:not(.v-icon) {
    font-family: "Lato", "Roboto", "sans-serif";
    font-size: .8rem;
  }
  .label{
    font-weight: bold;
  }
</style>

<script>
  import DateFormatter from '@/models/DateFormatter'
  export default {
     props: ['icon', 'label', 'date','color'],

     methods : {
       getFormatedDate(){
         console.log(this.label)

         console.log(this.date)
         let date_formatter = new DateFormatter(this.date)
         return date_formatter.friendly('<br />', '- -', 'black')
       }
     }
  }
</script>
