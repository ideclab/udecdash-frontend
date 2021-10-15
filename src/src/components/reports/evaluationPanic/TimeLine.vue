<template>
<v-layout class="quiz-container pa-5 column">
  <h1 class=" text-center pb-5 quiz_title" v-text="quiz.resource_name"></h1>
  <v-flex class="mb-4">
    <v-layout class="quiz-dates">
      <quiz-info :icon="mdiClockOutline" color="#2f9b40" label="Desde" :date="quiz.unlock_at"></quiz-info>
      <quiz-info :icon="mdiBookClockOutline" color="#878787" label="Entrega estimada"
        :date="quiz.due_at"></quiz-info>
      <quiz-info :icon="mdiClockAlertOutline " color="#d86883" label="Hasta" :date="quiz.lock_at"></quiz-info>
    </v-layout>
  </v-flex>
  <v-row class="px-sm-0 px-lg-12 px-xl-16 mt-4">
    <v-col xs="12" lg="4" class="pa-0">
      <period mode="before"  :days="viewedBefore()" :quizId="quiz.canvas_id"></period>
    </v-col>
    <v-col xs="12" lg="4" class="pa-0">
      <period mode="same_day" :days="viewedSameDay()" :quizId="quiz.canvas_id"></period>
    </v-col>
    <v-col xs="12" lg="4" class="pa-0">
      <period mode="after" :days="viewedAfter()" :quizId="quiz.canvas_id"></period>
    </v-col>
  </v-row>
</v-layout>
</template>

<style lang="scss" scoped>
  .quiz-container{
    border: 2px solid #c9c9c9;
    border-radius: 15px;
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(238,238,238,1) 100%);

    & .quiz_title{
      font-family: "Lato" "Roboto", "sans-serif" !important;
      font-size: 1.1rem !important;
      font-weight: bold;
      color: #444443;
      width: 100%;
      text-transform: uppercase;
    }

    & .quiz-dates{
      max-width: 500px;
    }
  }
</style>

<script>
  import Period from '@/components/reports/evaluationPanic/Period'
  import QuizInfo from '@/components/reports/evaluationPanic/QuizInfo'
  import { mdiClockOutline,mdiBookClockOutline, mdiClockAlertOutline  } from '@mdi/js';
  export default {
     props: ['quiz','viewed_after', 'viewed_before'],
     components : {
       'period' : Period,
       'quiz-info' : QuizInfo
     },
     data:()=>({
 mdiClockOutline: mdiClockOutline,
 mdiBookClockOutline: mdiBookClockOutline,
 mdiClockAlertOutline :mdiClockAlertOutline 
     }),
     methods:{
       buildDay(data, position,viewed){
        let keys = Object.keys(data)
        let day = {}
        day.date = keys[position]
        day.content = data[keys[position]]
        day.viewed = viewed
        return day
       },
       viewedBefore(){
        let output = []
        output.push(this.buildDay(this.viewed_before, 2,'viewed_before'))
        output.push(this.buildDay(this.viewed_before, 1,'viewed_before'))
        return output
       },
       viewedSameDay(){
        let output = []
        output.push(this.buildDay(this.viewed_before, 0,'viewed_before'))
        output.push(this.buildDay(this.viewed_after, 0,'viewed_after'))
        return output
       },
       viewedAfter(){
        let output = []
        output.push(this.buildDay(this.viewed_after, 1,'viewed_after'))
        output.push(this.buildDay(this.viewed_after, 2,'viewed_after'))
        return output
       },
       uniqueKey(){
          return '_' + Math.random().toString(36).substr(2, 9)
       }
     }
  }
</script>
