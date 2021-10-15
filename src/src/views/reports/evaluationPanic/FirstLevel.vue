<template>
<div class="container_reports" align="center">
  <v-row class="mb-4">
    <v-col cols="12" sm="6">
      <v-text-field class="lato lato--regular filter" color="#575756" v-model="search" filled
        dense rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details
      ></v-text-field>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
      <help :report="{name:'evaluation_panic', level:'first'}" />
      <download :report="{name:'evaluation_panic', level:'first'}" :data="data" />
    </v-col>
  </v-row>
  <template v-for="item in data">
    <time-line :key="item.quiz.canvas_id" :quiz="item.quiz" :viewed_after="item.viewed_after"
    :viewed_before="item.viewed_before" class="mb-4"></time-line>
  </template>
</div>
</template>

<script>
import Log from '@/models/log'
import TimeLine from '@/components/reports/evaluationPanic/TimeLine'

export default {
  props: ['information'],
  components : {
    'time-line': TimeLine,
  },
  created() {
    this.startReport()
    this.createLog()
    this.$Session.updateActivity()
  },
  computed: {
    reverseItems() {
      return this.items.slice().reverse()
    }
  },

  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id)
      log.setContext(log.REPORT_CONTEXT)
      log.setReport(log.EVALUATION_PANIC)
      log.setDeep(log.FIRST_LEVEL)
      log.add()
      log.enable()
    },

    startReport() {
       this.information.map(quiz => {
          let new_date_before = []
          for (let index in quiz.viewed_before) {
            new_date_before.push(index)
          }
          quiz.date_viewed_before = new_date_before.reverse()
        })
        this.data = this.information
    },

    filterReportInformation() {
      if (Object.entries(this.query).length != 0) {
        this.query.map(quiz => {
          let new_date_before = []
          for (let index in quiz.viewed_before) {
            new_date_before.push(index)
          }
          quiz.date_viewed_before = new_date_before.reverse()
        })
        this.data = this.query
      } else {
        this.message = 'No se han detectado evaluaciones'
        this.no_problem = false
      }
    },
  },
  data: () => ({
    search: null,
    no_problem: true,
    current_course: null,
    loader: true,
    message: '',
    query: [],
    data: []
  })
}
</script>
<style lang="scss" scoped>
.quizzes {
  margin: 10px;
  margin-bottom: 100px;
  max-width: 700px;
  .panic_card {
    padding-bottom: 10px;
    .container_center {
      background: white;
      border: solid 2px #3dbcd9;
    }
    .container-divider {
      background: rgba(61, 188, 217, 0.33);
      margin-top: 10px;
      margin-bottom: 10px;
      max-width: 70%;
    }
    p {
      margin-bottom: 0px;
      &.text-fecha {
        font-size: 0.8rem;
        font-weight: bold;
        color: #3dbcd9;
      }
    }
    .date {
      &:nth-child(4n + 1) {
        padding-left: 0px;
        padding-right: 24px;
      }

      &:nth-child(4n + 3) {
        padding-right: 0px;
        padding-left: 24px;
      }
      @media only screen and (max-width: 600px) {
        &:nth-child(4n + 1) {
          padding-left: 0px;
          padding-right: 12px;
        }
        &:nth-child(2n-4) {
          padding-left: 0px;
          padding-right: 0px;
        }
        &:nth-child(4n + 3) {
          padding-right: 0px;
          padding-left: 12px;
        }
      }
      .container_date {
        background: #f1f1f1;
        height: 100%;
        p {
          margin-bottom: 1px;
        }
        &.not_resource {
          cursor: default;
        }
        &.not_resource.tab-top {
          border: 2px solid rgba(61, 188, 217, 0.33);
          border-bottom: 0;
          border-radius: 10px 10px 0 0;
          &:hover {
            background: #f1f1f1 !important;
            color: rgba(0, 0, 0, 0.87) !important;
          }
        }
        &.not_resource.tab-bottom {
          border: 2px solid rgba(61, 188, 217, 0.33);
          border-top: 0;
          border-radius: 0 0 10px 10px;
          &:hover {
            background: #f1f1f1 !important;
            color: rgba(0, 0, 0, 0.87) !important;
          }
        }
      }
    }
  }
  .tab-top {
    &:hover {
      background: #3dbcd9 !important;
      color: white;
    }
    background: #eeeeee;
    border: 2px solid #3dbcd9;
    border-radius: 10px 10px 0 0;
    border-bottom: 0;
    transition: all 0.3s ease;
  }
  .tab-bottom {
    &:hover {
      background: #3dbcd9 !important;
      color: white;
    }
    background: #eeeeee;
    border: 2px solid #3dbcd9;
    border-top: 0;
    border-radius: 0 0 10px 10px;
    transition: all 0.3s ease;
  }
}
</style>
