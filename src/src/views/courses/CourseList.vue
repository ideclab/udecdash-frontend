<template>
  <div>
    <template v-if="loader">
      <div class="max-height">
      <loading color="white"></loading>
      </div>
    </template>
    <template v-else>
      <app-bar :semesters="semesters" @updatingSemesters="updatingSemesters" @resetWelcome="resetWelcome()"/>
        <v-card class="mx-2 mx-md-5">
            <template v-if="no_problem">
          <v-row justify="center" justify-md="start" class=" mx-md-8 mt-5">
              <v-col cols="11" sm="8" md="6">
                <v-text-field class="lato lato--regular filter" color="#706f6f" :key="key_filter" v-model="filter" filled dense rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="d-flex  justify-center justify-md-end help_notes_container ">
                <span class="  d-flex flex-column flex-sm-row">
                    <v-chip class="help_notes lato lato--regular mx-1 mb-2 mb-sm-0" > <span class="circle circle_gray "></span> Sin actualización </v-chip>
                    <v-chip class="help_notes lato lato--regular mx-1 " > <span class="circle circle_yellow "></span>  Actualizando </v-chip>
                </span>
                 <span class=" d-flex flex-column flex-sm-row">
                    <v-chip class="help_notes lato lato--regular mx-1  mb-2 mb-sm-0 "> <span class="circle circle_blue "></span> Disponible </v-chip>
                    <v-chip class="help_notes lato lato--regular mx-1 "> <span class="circle circle_red"></span> Error </v-chip>
                </span>
              </v-col>
            <template v-if="filtered_courses.length>0">
                  <v-col cols="11" sm="6" md="6" lg="4" xl="3" v-for="course in filtered_courses" :key="course.course_canvas_id" >
              <course-card :course="course" :key="key_courses" :updateNotice="update_notice['status']" @updateNotice="updateNotice($event)"></course-card>
            </v-col>
            </template>
            <template v-else>
              <v-col cols="12" justify="center" align="center">
              <no-data :information="no_data" :key="key_no_data"></no-data>
              </v-col>
            </template>
        
          </v-row>
            <welcome :key="key_welcome" :welcome_status="welcome_status" @welcome_status="welcome($event)" />  
            </template>
      <template v-else>
        <warning-course :information="warning"></warning-course>
      </template>
        </v-card>
    
    </template>
    <div class="message_container">
    <v-snackbar v-model="update_notice['status']" :timeout="4000"  absolute right top>
     <v-icon :class="update_notice['type']">
       {{this.update_notice['icon']}}
     </v-icon>
     <span class="update_notice">
       {{this.update_notice['message']}}
     </span>
     <template v-slot:action="{ attrs }">
      <v-icon color="#706e6e" class="close"
       v-bind="attrs"
          @click="update_notice['status'] = false">
        mdi-close-circle
      </v-icon>
     </template>
    </v-snackbar>
    </div>
    <div class="d-flex d-md-none" id="smallSuggestions">
        <small-suggestions></small-suggestions>
      </div>
      <div class="d-none d-md-flex" id="desktopSuggestions">
        <desktop-suggestions></desktop-suggestions>
      </div>
  </div>
</template>

<script>
import CourseCard from "@/components/courses/Card.vue";
import AppBar from "@/components/courses/Bar.vue";
import Webservice from "@/models/webservice";
import Welcome from "@/components/modals/Welcome.vue";
import WarningCourse from "@/components/courses/Warning.vue";
import NoData from "@/components/alerts/NoData.vue";
import SmallSuggestions from '@/components/others/SmallSuggestions.vue';
import DesktopSuggestions from '@/components/others/DesktopSuggestions.vue';
export default {
  components: { CourseCard, AppBar, Welcome,WarningCourse,NoData,SmallSuggestions,DesktopSuggestions},
  name: "CourseList",
  created() {
    this.webservice = new Webservice();
    this.initWelcome();
  },
  mounted() {
    this.semesterData();
    this.initTour();
    this.$Session.updateActivity();
  },
  methods: {
    initTour() {
      if (this.$tours["myTour"]) {
        this.$tours["myTour"].stop();
      }
    },
    updateNotice(data){
      if(!data.error){
        if(data.information.code ==null){
        this.update_notice['message'] = `Actualización en curso, tiempo aprox.: ${data.information.minutes_estimated}`
        this.update_notice['icon'] = 'fas fa-sync-alt'
        this.update_notice['type'] = '_success'
        }
        if(data.information.code =="WAS_PROCESSED_RECENTLY"){
            this.update_notice['message'] = `Solo puede actualizar el curso una vez cada 24 horas.`
            this.update_notice['icon'] = 'mdi-information-outline'
            this.update_notice['type'] = '_warning'
            
            }
        if(data.information.code =="COURSE_NOT_FOUND"){
          this.update_notice['message'] = `Su curso no se ha podido encontrar, comunicarse con soporte`
          this.update_notice['icon'] = 'mdi-alert-circle-outline'
            this.update_notice['type'] = '_error'
          }
        if(data.information.code =="COURSE_TOO_LONG"){
          this.update_notice['message'] = `Su curso es demaciado grande, comunicarse con soporte`
          this.update_notice['icon'] = 'mdi-alert-circle-outline'
        this.update_notice['type'] = '_error'
          }
      }else{
      this.update_notice['message'] = `Ha susedido un problema inesperado, comunicarse con soporte`
      this.update_notice['icon'] = 'mdi-alert-circle-outline'
        this.update_notice['type'] = '_error'
      }
      this.update_notice['status']=true
      if(!this.recursion_on){
          this.recursion_on =true
          this.semesterRecursive()
          }
    },
    initWelcome() {
     if (!localStorage.udecdash_welcome) {
      this.webservice.get_tutorial().then(response => {
        let welcome = response.information.find(e => e=='WELCOME_MESSAGE')
        welcome?this.welcome_status = false:this.welcome_status = true
      }
        )
        localStorage.setItem("udecdash_welcome",this.welcome_status);
        this.key_welcome += 1;
      } else if (localStorage.udecdash_welcome == true) {
        this.welcome_status = true;
        this.key_welcome += 1;
      }
    },
    semesterData() {
      this.webservice
        .courseList()
        .then(response => {
          if (!response.error) {
            this.semesters = response.information;
            this.filterSemester();
            this.updateInProgress();
          } else {
            this.no_problem = false;
            this.warning["message"] = response.message;
            this.warning["status"] = response.status;
            this.warning["type"] = 'courses';
          }
        })
        .finally(() => {
          this.loader = false;
            this.key_courses += 1;
        });
    },
    semesterRecursive(){
      setInterval(()=>{
        this.semesterData()
      }, 30000);
    },
    updateInProgress(){
    if(!this.recursion_on){
      let data = this.courses.find(status=>status.update.status =='PENDING')
      if(data){
        this.recursion_on =true
         this.semesterRecursive()
      }
    }
    },
    filterSemester() {
      if (!localStorage.udecdash_semester) {
        localStorage.setItem("udecdash_semester", this.semesters[this.semesters.length - 1].id);
      }
      this.current_select = this.semesters.find(
        semester => semester.id == localStorage.udecdash_semester
      );
      this.courses = this.current_select["courses"];
      this.filtered_courses = this.courses;
    },
    updatingSemesters(event) {
      this.key_filter += 1;
      localStorage.setItem("udecdash_semester", event);
      this.filterSemester();
      this.semesterData();
    },
    resetWelcome(){
       this.welcome_status = true;
       this.key_welcome += 1;
    },
    welcome(event){
    this.welcome_status = event
    this.webservice.set_tutorial({'identifier':'WELCOME_MESSAGE'})
    }
  },
  data: () => ({
    loader: true,
    webservice:null,
    no_problem: true,
    recursion_on:false,
    welcome_status: false,
    key_courses: 0,
    key_no_data: 0,
    search: "",
    update_notice:{
      status:false,
      icon:'',
      message:'',
      type:''
    },
    courses: [],
    filtered_courses: [],
    warning: [],
    semesters: [],
    no_data:[],
    key_welcome: 1,
    key_filter: 1
  }),
  computed: {
    filter: {
      get() {
        return this.search;
      },
      set(value) {
        value = value.toLowerCase();
        let datas = this.courses.filter(
          item => item.course_name.toLowerCase().indexOf(value) !== -1
        );
        if(datas.length ==0){
          this.no_data['message']=`Lo sentimos.<br /> No existen resultados para: <span class="color_yellow"> ${value} <span>`
          this.key_no_data +=1;
        }
        this.filtered_courses = datas;
        this.key_courses += 1;
      }
    }
  }
};
</script>
<style lang="scss">
.color_yellow{
  color:#f49e16;
}
.message_container{
  .v-snack{
    top:60px;
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

}
</style>
<style lang="scss" scoped>
.help_notes_container{
  width: 100%;
  .help_notes{
    background: #f5f5f5;
    height:25px !important;
      @media (max-width: 600px){
      &.line_gray{
          border-top:5px  #878787 solid;
        }
        &.line_red{
          border-top:5px  #db4056 solid;
        }
        &.line_yellow{
          border-top:5px  #d8ab3a solid;
        }
        &.line_blue{
          border-top:5px  #3bbad2 solid;
        }
  }
    .circle{
 position: relative;
       right: 12px;
      height:25px;
      width: 25px;
      border-radius: 50px;
      &_gray{
        background: #878787;
      }
       &_red{
      background: #db4056;
    }
         &_yellow{
      background: #d8ab3a;
    }
    &_blue{
      background: #3bbad2;
    }
    }
   
      
  }
}
.v-card {
  height: calc(100vh - 90px);
  overflow: auto;
  overflow-x:hidden ;
  border-radius: 20px;
}
.lato {
  font-family: Lato, "Roboto", "sans-serif" !important;
  &--regular {
    font-weight: 400;
  }
}
.max-height{
  height: 100vh;
  span{
    font-family: Lato, "Roboto", "sans-serif" !important;
    color:white;
     font-weight: bold;
  }
}
  .update_notice{
    font-family: 'OpenSans',"lato", "Roboto", "sans-serif" !important;
    color:#706f6f;
     font-weight: 400;
     font-style: italic;
  }
  ._error{
    color:#bc444a;
  }
  ._warning{
    color:#d6aa3a;
  }
  ._success{
    font-size: 15px !important;
    color:#d6aa3a;
  }
</style>
