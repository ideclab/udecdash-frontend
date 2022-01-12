<template>
  <div >
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <template v-if="no_problem">
        <div class="page-layout">
          <div class="general_section pt-5 pb-0 px-6">
            <h4 class="page-title pb-2">Interacciones por estudiante</h4>
            <h6 class="pb-2" v-html="printSelectedStudent()"></h6>
            <v-row no-gutters>
              <v-col cols="12" sm="8" order="last" order-sm="first">
                <v-layout d-flex>
                    <span class="label-selector pr-2 pt-2">Mes</span>
                    <v-select class="select" v-model="current_date['month']" :items="months"
                      @change="modifyDate('month', $event)" item-text="name" item-value="id"
                      append-icon="mdi-chevron-down" background-color="white"
                      rounded dense color="#575756" item-color="#575756"
                      :menu-props="{contentClass: 'select-container'}">
                    </v-select>
                    <span class="label-selector pr-2 pt-2 ml-4">Año</span>
                    <v-select class="select" v-model="current_date['year']" :items="years"
                      @change="modifyDate('year', $event)" item-text="name" item-value="id"
                      append-icon="mdi-chevron-down" background-color="white" color="#575756"
                      rounded dense item-color="#575756" :menu-props="{contentClass: 'select-container'}">
                    </v-select>
                </v-layout>
              </v-col>
              <v-col cols="12" sm="4" class="d-flex justify-center justify-md-end">
                <help :report="{name:'course_interaction', level:'first',log_level:'first_level'}" />
                <download class="ml-2" :report="{name:'course_interaction', level:'first',log_level:'first_level'}" :data="{'information':current_user_interactions,'month':current_date['month'],'year':current_date['year']}" />
              </v-col>
            </v-row>
          </div>
          <div class="global_report pt-0 pb-6 px-6 d-flex justify-end">
            <router-link :to="{name: 'course_interaction_second'}" outlined small>
              <v-btn elevation="0" outlined rounded small ripple class="py-4 go-to-second-level">
                Interacciones del grupo de curso
              </v-btn>
            </router-link>
          </div>
          <div class="students_column py-5 px-6 px-sm-4">
              <div class="d-flex justify-space-between">
                <span class="page-title pb-2">Estudiantes</span>
              <div>
                <span > <v-icon  class="user-status pa-1" color="#2f9b40"> mdi mdi-account-check-outline </v-icon>  <span>{{active_students}}</span>       </span>
                <span ><v-icon  class="user-status pa-1" color="#d96b85"> mdi-account-cancel-outline</v-icon><span>{{inactive_students}}</span></span>
              </div>
             </div>
            <v-row no-gutters>
              <v-col col="12" md="6" class="pr-2">
                <v-select class="select select-full-width" v-model="current_user_list" :items="filter_user"
                  @change="filterUserByStatus($event)" append-icon="mdi-chevron-down"
                  background-color="#f6f6f6" color="#575756" rounded dense
                  item-color="#575756" :menu-props="{contentClass: 'select-container'}">
                </v-select>
              </v-col>
              <v-col col="12" md="6" class="pl-md-2 pb-4 pb-md-1">
                <v-btn elevation="0" rounded outlined dense  class="notification-button" @click="notification(current_user_list)">
                  <v-icon class="mr-2">mdi-forum-outline</v-icon>Notificar
                </v-btn>
              </v-col>
            </v-row>
            <v-text-field class="filter mb-4" color="#575756" v-model="filter" filled dense
              rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line
              hide-details></v-text-field>

            <v-list class="students-container">
              <v-list-item-group mandatory class="students-list-container" value="name"
              v-model="current_student" :key="update_current_student">
                <v-list-item v-for="item in show_students" :key="item.canvas_id">
                  <v-list-item-content @click="currentUser(item)"
                  :class="['pa-0', {'user-active' : hasInteractions(item)}]">
                    <v-icon v-text="getStatusIcon(item)" class="user-status pa-1"/>
                    <span class="text-truncate px-1" v-text="item.name"></span>
                    <img :src="require('@/assets/img/mensaje.svg')" class="send-mail img-width pa-1" @click="personalNotification(item.canvas_id,hasInteractions(item))"/>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          <template v-if="loader_calendar">
            <div class="min-height">
                <loading></loading>
            </div>
          </template>
          <template v-else>
          <div class="calendar_column pb-5 px-6 px-sm-2 px-md-6 pt-0">
            <calendar-header></calendar-header>
            <v-sheet height="385">
              <v-calendar ref="calendar" now="0000-00-00" :value="selected_date" locale="es"
               hide-header :weekdays="[1, 2, 3, 4, 5, 6, 0]" :events="events" class="text-body3-xl"
               :event-color="'#2f9b40'" :event-ripple="false">
              </v-calendar>
            </v-sheet>
          </div>
          </template>
        </div>
      </template>
      <template v-else>
        <warning :information="warning"></warning>
      </template>
      <notification @snackbar="snackbar=$event" :notification_status="notification_status"
        @notification_status="notification_status = $event" :type_message="'students'" :notifications_id="predefined_notifications" :receptors="receptors"
      ></notification>
    </template>
    <div class="course_interaction_snackbar">
    <v-snackbar v-model="snackbar['status']"  absolute
      :timeout="5000"   right top>
      <v-icon :color="snackbar['color']" v-text="snackbar['icon']"></v-icon>
        <span v-text="snackbar['message']"></span>
          <template v-slot:action="{ attrs }">
            <v-icon color="#706e6e" class="close"
       v-bind="attrs"
          @click="snackbar['status'] = false">
        mdi-close-circle
      </v-icon>
          </template>
    </v-snackbar>
    </div>

  </div>
</template>
<style lang="scss" scoped>
*:not(.v-icon) {
  font-family: "Lato", "Roboto", "sans-serif" !important;
  font-weight: normal;
  font-size: .9rem;
  color: #575756;
}
a {
  text-decoration: none !important;
}
.img-width{
  width: 100% !important;
}
.min-height{
  min-height: 430px;
}
.select-full-width{
  width: 100% !important;
  max-width: 100% !important;
}
.select{
  max-width: 130px;
}
.page-title{
  font-weight: bold;
  font-size: 1rem;
  color: #3c3c3b;
}
.page-layout{
  display: grid;
  justify-content:space-around;
  justify-items: stretch;

  grid-template-rows: auto auto;
  grid-template-columns: minmax(400px,1fr) 400px;
  grid-template-areas: "general_section   students_column"
                       "calendar_column   students_column"
                       "global_report      students_column";
  @media (max-width: 900px) {
 grid-template-columns:auto;
  grid-template-areas: "students_column"
                        "general_section"
                       "calendar_column"
                       "global_report";
  }
}
.general_section{
  grid-area: general_section;
}
.students_column{
  grid-area: students_column;
}
.calendar_column{
  grid-area: calendar_column;
}
.global_report{
  grid-area: global_report;
}
.students_column{
  background: white !important;
}
.notification-button{
  height: 26px !important;
  border: 2px solid;
  border: 2px solid #706f6f;
  text-transform: initial;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px !important;
  .mdi-forum-outline::before {
    font-size: 1.2rem !important;
  }
  &:hover{
    color: white !important;
    background: #706f6f !important;
  }
}
.students-list-container{
  .v-list-item{
    min-height: 35px;
  }
  .user-status{
    color: #d96b85;
  }
  .user-active{
    & .user-status{
      color: #2f9b40;
    }
  }
  .v-list-item__content{
    display: grid;
    grid-template-columns: 25px 1fr 25px;
    grid-template-rows: auto;

    .student-name {
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .send-mail:hover{
      background: orange;
      border-radius: 20%;
    }
  }
  .v-list-item:nth-child(odd){
    background: #f6f6f6;
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
  }
  .v-item--active{
    background: #fdf0dc !important;
  }
  .v-list-item--link:before{
    background: transparent !important;
  }
}

.go-to-second-level{
  border: 2px solid #3bbad2;
  color: #3bbad2;
  font-weight: bold;
  font-size: .9rem;
  text-transform: initial;
  text-decoration: none;
}

.students-container{
  height: 400px;
  max-height: 400px;
  overflow-y: scroll;
   @media (max-width: 900px) {
  max-height: 100px;
  }
}
</style>

<style lang="scss">
.calendar_column {
  .v-calendar .v-event {
    border-radius: 0 !important;
    width: 100% !important;
    cursor: default !important;
  }
}
.course_interaction_snackbar{
.v-snack__wrapper{
  background: white ;
  border-radius: 15px;
  border:3px #c5c5c5 solid;
  color:#c5c5c5;
  .v-snack__content{
    padding: 0px 16px;
  }
  .close{
    position: fixed;
    top: 60px;
    right: 3px;
    border-radius: 100%;
    background: white;
  }
}
}
</style>
<script>
import Webservice from '@/models/webservice'
import Log from '@/models/log'
import calendarHeader from '@/components/reports/courseInteraction/calendarHeader'

export default {
  created() {
    this.startStudentReport()
    this.createLog()
    this.$Session.updateActivity()
  },
  components : {
    'calendar-header' : calendarHeader
  },
  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id)
      log.setContext(log.REPORT_CONTEXT)
      log.setReport(log.COURSE_INTERACTION)
      log.setDeep(log.FIRST_LEVEL)
      log.add()
      log.enable()
    },
    printSelectedStudent(){
      if(this.current_user_interactions == null){
        return 'Seleccione un estudiante para ver sus interacciones.'
      }else{
        let name = this.current_user_interactions.name
        return `<span>Estás viendo a: </span> <b class="text-truncate">${name}</b>`
      }
    },
    get_students() {
      return this.$SECTION.members.filter(
        e => e.role_type == 'StudentEnrollment'
      )
    },
    validate_students() {
      this.students = this.get_students()
      if (this.students.length < 1) {
        this.no_problem = false
        this.warning['message'] = 'Este curso actualmente no posee estudiantes registrados'
      }
    },
    async startStudentReport() {
      this.validate_students()
      this.initSelector()
      await this.setUserInteractions()
      this.updateRange()
    },
    async setUserInteractions() {
      let current_course = parseInt(this.$route.params.course_id)
      let date = this.getDate()
      let webservice = new Webservice()
      await webservice
        .courseInteractionSpecific({
          course_id: current_course,
          year: date['year'],
          month: date['month']
        })
        .then(response => {
          if (!response.error) {
            this.setUser(response.information)
          } else {
            this.no_problem = false
            this.warning["message"] = response.message
            this.warning["status"] = response.status
          }
        })
        .finally(() => {
          this.loader = false
          this.loader_calendar = false
        })
    },
    async studentReport() {
      await this.startStudentReport()
      this.createLog()
      this.$Session.updateActivity()
    },

    setUser(information) {
      let active_students =0
      let inactive_students = 0
      this.students.map(student => {
        student['interaction'] = information.find(
          student_interaction =>
            student_interaction.canvas_id == student.canvas_id
        )
        if( student['interaction']){
          student['interaction'] = student['interaction']['interactions']
          active_students++
        }else{
          student['interaction'] =[]
          inactive_students++
        }
      })
      this.current_user_interactions == null
        ? (this.current_user_interactions = this.students[0])
        : (this.current_user_interactions = this.students.find(
            student =>
              student.canvas_id == this.current_user_interactions.canvas_id
          ))
          this.active_students = active_students
          this.inactive_students = inactive_students
          this.originalUsers = this.students
          this.filterUsers()
    },
    getDate() {
      let current_date = JSON.parse(localStorage.getItem('date'))
      return { year: current_date['year'], month: current_date['month'] }
    },
    selectedDate() {
      this.selected_date = [
        this.current_date['year'],
        ('00' + this.current_date['month']).slice(-2),
        ('00' + 1).slice(-2)
      ].join('-')
    },
    async modifyDate(type, event) {
      this.students = this.get_students()
      let modify_Date = this.getDate()
      if (type == 'year') {
        modify_Date['year'] = event
        localStorage.setItem('date', JSON.stringify(modify_Date))
      } else {
        modify_Date['month'] = event
        localStorage.setItem('date', JSON.stringify(modify_Date))
      }
      this.loader_calendar=true
      await this.setUserInteractions()
      this.selectedDate()
      this.updateRange()
    },
    initSelector() {
      let previous_year = new Date('2018')
      let date = new Date()
      let current_year = date.getFullYear()
      do {
        this.years.push(current_year)
        current_year = current_year - 1
      } while (current_year > previous_year.getFullYear())
      if (!localStorage.getItem('date')) {
        localStorage.setItem(
          'date',
          JSON.stringify({ year: date.getFullYear(), month: (date.getMonth() + 1) })
        )
      }
      let current_date = JSON.parse(localStorage.getItem('date'))
      this.current_date['month'] = parseInt(current_date['month'])
      this.current_date['year'] = parseInt(current_date['year'])
      this.selectedDate()
    },
    currentUser(item) {
      this.current_user_interactions = item
      this.updateRange()
    },

    updateRange() {
      let events = []
      let date = this.current_user_interactions['interaction']
      for (const key in date) {
        let first = new Date(date[key])
        let second = new Date(date[key])
        events.push({
          name: '',
          start: first,
          end: second
        })
      }

      this.events = events
    },
    hasInteractions(item) {
      if (item['interaction']) {
        if (item['interaction'].length > 0) return true
      }
      return false
    },
    filterUsers() {
      if (this.current_user_list == 'Solo activos') {
        this.show_students = this.originalUsers.filter(
          item =>
            item.interaction.length > 0 &&
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        )
      }
      if (this.current_user_list == 'Solo inactivos') {
        this.show_students = this.originalUsers.filter(
          item =>
            item.interaction.length == 0 &&
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        )
      } else if (this.current_user_list == 'Todos') {
        this.show_students = this.originalUsers.filter(
          item =>
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        )
      }

      this.currentUser(this.show_students[0])
      this.current_student =0
      this.update_current_student++

    },
    filterUserByStatus(event) {
      this.current_user_list = event
      this.filterUsers()
    },
    notification(current_user_list) {
      this.receptors = []
      if (current_user_list == 'Todos') {
        this.originalUsers.map(item => {
          this.receptors.push(item.canvas_id)
        })
        this.predefined_notifications = [1]
      } else if (current_user_list == 'Solo activos') {
        this.originalUsers.map(item => {
          if (item.interaction.length > 0) {
            this.receptors.push(item.canvas_id)
          }
        })
        this.predefined_notifications = [2,3]
      } else if (current_user_list == 'Solo inactivos') {
        this.originalUsers.map(item => {
          if (item.interaction.length == 0) {
            this.receptors.push(item.canvas_id)
          }
        })
        this.predefined_notifications = [4,5]
      }
      this.notification_status = true
    },
    personalNotification(user,interactions){
    this.receptors = []
    this.receptors.push(user)
    if(interactions){
      this.predefined_notifications = [6, 7]
    }else{
      this.predefined_notifications = [8]
    }
      this.notification_status = true
    },
    getStatusIcon(item){
      return this.hasInteractions(item) ? 'mdi mdi-account-check-outline' : 'mdi-account-cancel-outline'
    }
  },

  computed: {
    filter: {
      get() {
        return this.search
      },
      set(value) {
        this.search = value
        this.filterUsers()
      }
    }
  },
  data: () => ({
    current_user_list: 'Todos',
    filter_user: ['Todos', 'Solo activos', 'Solo inactivos'],
    loader: true,
    loader_calendar:false,
    snackbar:{
      status:false,
      icon:'',
      color:'',
      message:''
    },
    predefined_notifications: [],
    receptors: [],
    active_students:null,
    inactive_students:null,
    search: '',
    update_current_student:0,
    warning:[],
    notification_status: false,
    no_problem: true,
    current_course: null,
    students: [],
    current_user_interactions: null,
    current_student: 0,
    current_date: { year: null, month: 1 },
    bol: true,
    years: [],
    selected_date: '',
    months: [
      { id: 1, name: 'Enero' },
      { id: 2, name: 'Febrero' },
      { id: 3, name: 'Marzo' },
      { id: 4, name: 'Abril' },
      { id: 5, name: 'Mayo' },
      { id: 6, name: 'Junio' },
      { id: 7, name: 'Julio' },
      { id: 8, name: 'Agosto' },
      { id: 9, name: 'Septiembre' },
      { id: 10, name: 'Octubre' },
      { id: 11, name: 'Noviembre' },
      { id: 12, name: 'Diciembre' }
    ],
    focus: '',
    events: []
  })
}
</script>
