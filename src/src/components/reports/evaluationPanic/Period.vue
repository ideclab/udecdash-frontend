<template>
<v-layout>
  <div class="main-container">
    <div class="resources d-flex justify-space-around">
      <div class="tab py-2 px-6" v-for="(day, index) in days" :key="index"
      v-text="getLabel(day.content)" @click="goToSecondLevel(day)"></div>
    </div>
    <div :class="['bar', getBarStyleByMode()]"></div>
    <div :class="['date', {'font-weight-black' : isSameDay()}, 'd-flex justify-space-around']">
      <div class="py-2 px-7" v-for="(day, index) in days" :key="index"
      v-text="formatDate(day.date)"></div>
    </div>
  </div>
</v-layout>
</template>
<style lang="scss" scoped>
*{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.main-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  font-family: "Lato", "Roboto", "sans-serif";
  font-size: 0.8rem;
}

.resources{
  display: flex;
}

.bar{
  display: flex;
  flex-direction: column;
  background: blue;
  max-height: 4px;
}
.date{
  display: flex;
}

.tab{
  border: 2px solid #706f6f;
  border-radius: 8px 8px 0 0;
  border-bottom: none;
  transition: all .3s ease;
  &:hover{
    background: #706f6f;
    color:white;
    cursor: pointer;
  }
}

.before-bar{
  background: #7c7b7b;
  &::before {
    content: " ";
    position: relative;
    left: -10px;
    top: -7px;
    min-height: 16px;
    min-width: 16px;
    height: 16px;
    width: 16px;
    max-height: 16px;
    max-width: 16px;
    background: #7c7b7b;
    border-radius: 50%;
  }
}

.after-bar{
  background: #7c7b7b;
  &::after {
    content: "\f0142";
    font-family: "Material Design Icons" !important;
    position: relative;
    font-size: 3rem;
    align-self: end;
    color: #7c7b7b;
    top: -34px;
    right: -21px;
  }
}

@mixin vertical-separator ($top){
    content: " ";
    position: relative;
    top: $top;
    min-height: 16px;
    height: 16px;
    max-height: 16px;
    min-width: 4px;
    width: 4px;
    max-width: 4px;
    background: #f6a221;
}
.same_day-bar{
  background: #f6a221;
  &::before {
    @include vertical-separator(-6px);
  }
  &::after {
    @include vertical-separator(-22px);
    align-self: end;
  }
}
</style>
<script>
  import DateFormatter from '@/models/DateFormatter'
  export default {
     props: ['mode', 'days','quizId'],
     methods : {
       getLabel(content){
        return `${content.length} recursos`
       },
       getBarStyleByMode(){
         return `${this.mode}-bar`
       },
       formatDate(date){
         let date_formatter = new DateFormatter(date, 'America/Santiago', 'America/Santiago')
         return date_formatter.shortYear()
       },
       isSameDay(){
         return this.mode == 'same_day'
       },
       goToSecondLevel(day){
        this.$router.push({ name: 'evaluation_analysis_second',
        params:{resource_id:this.quizId,type:day.viewed,date:day.date,details:day.content} })
       }
     }
  }
</script>
