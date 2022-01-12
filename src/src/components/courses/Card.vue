<template>
  <v-card height="190" elevation="0">
    <div class="d-flex flex-column">
      <card-details :details="course.udec_format"></card-details>
      <div class="d-flex justify-center align-center name_container">
        <h4 class="title_course mx-2" v-text="current_name"></h4>
      </div>
      <v-divider :color="current_color" :class="status"></v-divider>
      <div class="d-flex flex-row justify-center pt-3 pb-1 actualization">
        <v-icon class="mr-1" :class="status" :color="current_color">{{current_icon}}</v-icon>
        <i><p class="mb-0">{{ current_text }}</p></i>
        <template v-if="status=='FINISHED'">
        <i><p class=" pl-1 mb-0" v-html="getFormatedDate(course.update.finished_at)"></p></i>            
        </template>
      </div>
      <v-row no-gutters justify="center" class="interaction">
        <v-spacer></v-spacer>
        <v-col cols="5" sm="5" md="5" lg="4" class="upgrade">
         <upgrade :name="current_name" :status="status" @update="updateCourse($event)" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="5" sm="5" md="5" lg="4" class="go">
          <v-btn :class="class_button_activo" outlined block class="mt-2" 
          rounded @click="goToReports(course.course_canvas_id)">
            Entrar
            <icon-base width="20" height="25" icon-name="access" class="d-none d-md-flex pl-1">
              <icon-access />
            </icon-base>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import Log from "@/models/log";
import Webservice from "@/models/webservice";
import CardDetails from "@/components/courses/CardDetails.vue";
import Upgrade from "@/components/modals/Upgrade.vue";
import DateFormatter from '@/models/DateFormatter'
export default {
  components: { CardDetails,Upgrade },
  name: "CourseCard",
  created() {
    this.initData();
  },
  props: {
    updateNotice: {
      type: Boolean,
      default: false,
    },
    course: {
      type: Object,
      default: () => ({
        code: "000",
        course_canvas_id: "000",
        course_name: "Curso",
        udec_format: {
          course_code: "No posee",
          name: "nombre corto",
          period: "no pose",
          sections: [],
          year: "no pose",
        },
        update: {
          created_at: null,
          finished_at: null,
          status: "",
        },
      }),
    },
  },
  methods: {
    updateCourse() {
      let course_id = this.course.course_canvas_id;
      let webservice = new Webservice();
      webservice.processCourseData(course_id).then((response) => {
        this.$emit("updateNotice", response);
        if (!response.error) {
          if (response.information.code == null) {
            this.current_color = "#d8ab3a";
            this.current_button = "rgba(59, 186, 210, .5)";
            this.current_icon = "fas fa-sync-alt";
            this.current_text = "Actualización en curso ...";
        this.class_button_activo = "disable";
            this.status = "PENDING";          }
        } else {
          this.current_color = "#db4056";
          this.class_button_activo = "";
          this.current_icon = "mdi-alert-circle-outline";
          this.current_text = "La actualización ha fallado";
        this.class_button_activo = "disable";
          this.status = "FAILED";
        }
      });
      this.update=false
    },
    initData() {
      this.status = this.course.update.status;
      if (this.status == "NEVER_UPDATED") {
        this.current_color = "#878787";
        this.class_button_activo = "disable";
        this.current_icon = "mdi-update";
        this.current_text = "Requiere actualizar la información";
      }
      if (this.status == "PENDING" ) {
        this.current_color = "#d8ab3a";
        this.class_button_activo = "disable";
        this.current_icon = "fas fa-sync-alt";
        this.current_text = "Actualización en curso ...";
      }
      if (this.status == "FAILED") {
        this.current_color = "#db4056";
        this.class_button_activo = "disable";
        this.current_icon = "mdi-alert-circle-outline";
        this.current_text = "La actualización ha fallado";
      }
      if (this.status == "FINISHED") {
        this.current_color = "#3bbad2";
        this.class_button_activo = "active";
        this.current_icon = "mdi-update";
        this.current_text = "Actualizado: ";
      }
      this.currentName()
    },
    currentName(){
      let name = 'Nombre no encontrado'
      if(this.course.udec_format.name !=''){
        name =this.course.udec_format.name
      }else if(this.course.course_name !=''){
        name =this.course.course_name
      }
      this.current_name = name
    },
    goToReports(course_id) {
    if(this.status == 'FINISHED' ){
       this.$Session.updateActivity();
      let log = new Log(course_id);
      log.disable();
      let url = {
        name: "module_visualization_first",
        params: { course_id: course_id },
      };
      this.$router.push(url);
      }
     
    },
    getFormatedDate(date){
      let date_formatter = new DateFormatter(date)
      return date_formatter.friendly_no_time('- -', 'bold')
    },
  },
  data: () => ({
    value: 1,
    update:false,
    current_name:'',
    create_at:'',
    status: "not_updated",
    current_color: "#878787",
    current_icon: "mdi-update",
    current_text: "Actualización pendiente ",
    current_button: "878787",
    class_button_activo: "",
    moths: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  }),
};
</script>

<style lang="scss" scoped>
.theme--light.v-divider {
  border-color: transparent !important;
}
.PENDING{
  font-size: 15px;
}
.NEVER_UPDATED,.FAILED,.FINISHED{
  font-size: 20px !important;
}
.v-card {
  border: 2px #c6c6c6 solid;
  background: linear-gradient(
    80deg,
    rgb(253, 253, 253) 0%,
    rgb(240, 240, 240) 50%
  );
  hr {
    width: 100%;
    border-width: 2px;
   &.PENDING{
  background: #d8ab3a;
    }
  &.NEVER_UPDATED{
  background:#878787 ;
  }
    &.FAILED{
  background: #db4056;
  }
  &.FINISHED{
    background:#3bbad2;
    }
  }
  .name_container {
    padding: 5px;
    width: 100%;
    height: 58px;
    background: #ffffff;
    .title_course {
      font-family: "Lato", "Roboto";
      font-weight: bold;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .actualization {
    color: #575756;
    font-size: 12px;
    font-family: "OpenSans", "Lato", "Roboto";
    font-weight: 400;
    .date {
      font-weight: 600;
    }
  }
  .interaction {
    .v-btn {
      text-transform: capitalize;
      font-family: "OpenSans", "Lato", "Roboto";
      font-weight: bold;
    }
    .upgrade {
      .v-btn {
        text-transform: capitalize;
        font-family: "OpenSans", "Lato", "Roboto";
        font-weight: bold;
        border: 2px solid #878787 !important;
        color: #878787;
        &.theme--light.v-btn:hover {
          background: #878787 !important;
          opacity: 1;
          color: white;
        }
      }
    }
    .go {
      .v-btn {
        border: 2px solid rgba(59, 186, 210, 0.3);
        color: rgba(59, 186, 210, 0.3);
        &.disable {
          cursor: default;
        }
        &.active {
          border: 2px solid rgba(59, 186, 210, 1);
          color: rgba(59, 186, 210, 1);
          &.theme--light.v-btn:hover {
            background: #3bbad2 !important;
            opacity: 1;
            color: white !important;
          }
        }
      }
    }
  }
}
</style>