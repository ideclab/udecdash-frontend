<template>
  <v-row justify="center">
    <v-dialog v-model="notification_status" max-width="900" persistent>
      <v-card>
        <v-card-title class="texts"> NOTIFICAR </v-card-title>
        <v-card-text>
          <v-form v-model="valid" lazy-validation ref="form">
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :style="{ width: 20 }"
                  v-model="form.recipients"
                  :items="users"
                  :rules="rules['recipients']"
                  class="student_container"
                  chips
                  item-color="#f49f13"
                  dense
                   :menu-props="{ contentClass: 'autocomplete_student' }"

                  color="#c5c5c5"
                  label="Estudiantes"
                  item-text="name"
                  item-value="canvas_id"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      class="student_chip"
                      v-bind="data.attrs"
                      close
                      :input-value="data.selected"
                      @click="data.select"
                      @click:close="remove(data.item.canvas_id)"
                    >
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>
              <template v-if="predifined_notification">
                <v-col cols="12" class="pt-0">
                  <div class="texts">Mensajes predefinidos</div>
                  <v-chip
                    class="mx-1 my-1 prefedined_chip"
                    v-for="(predefined, index) in predefineds"
                    :key="index"
                    @click="setNotification(predefined)"
                  >
                    {{ predefined.prefix }}
                  </v-chip>
                   <v-divider ></v-divider>
                </v-col>
              </template>
             
              <v-col cols="12" class="py-0">
                <v-text-field
                class="subject"
                  outlined
                  v-model="form.subject"
                  :rules="rules['subject']"
                  label="Asunto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-textarea
                  class="subject"
                  outlined
                  name="input-7-4"
                  label="Ingresar mensaje"
                  v-model="form.body"
                  :rules="rules['body']"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined class="mt-2 cancel px-5" rounded @click="close()">
            Cancelar
            <v-icon class="pl-1" > mdi-cancel </v-icon>
          </v-btn>
           <v-btn outlined class="mt-2 send px-5" rounded @click="send()">
            Enviar
            <v-icon class="pl-1" > mdi-send </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Webservice from "@/models/webservice";
import Notification from "@/models/notification";
export default {
  name: "Notifications",

  props: {
    snackbar: {
      type: Boolean,
      default: false,
    },
    notification_status: {
      type: Boolean,
      default: false,
    },
    type_message: {
      type: String,
    },
    receptors: {
      type: Array,
    },
    notifications_id: {
      type: Array,
    },
  },
  watch: {
    notification_status: function (value) {
      if (value) {
        if (this.type_message == "students") {
          this.initStudents();
        }
        if (this.notifications_id.length > 0) {
          this.initPredefinedNotifications();
        } else {
          this.predifined_notification = false;
        }
      }
    },
    receptors: function (value) {
      this.form.recipients = value;
    },
  },
  methods: {
    initPredefinedNotifications() {
      this.notification = new Notification();
      this.predefineds = this.notification.get(this.notifications_id);
    },
    initStudents() {
      this.users = [];
      this.getStudents().map((item) => {
        this.users.push({ canvas_id: item.canvas_id, name: item.name });
      });
    },
    getStudents() {
      return this.$SECTION.members.filter(
        (e) => e.role_type == "StudentEnrollment"
      );
    },
    setNotification(notification) {
      this.form.subject = notification.subject;
      this.form.body = this.notification.filterBody(
        notification.body,
        this.form.recipients
      );
    },
    remove(item) {
      const index = this.form.recipients.indexOf(item);
      if (index >= 0) this.form.recipients.splice(index, 1);
    },
    close() {
      this.format();
      this.$refs.form.reset();
      this.$emit("notification_status", false);
    },
    async send() {
      let snackbar=''
      if (this.$refs.form.validate()) {
        this.$emit("notification_status", false);
        let data = JSON.parse(JSON.stringify(this.form));
        let webservice = new Webservice();
        await webservice.notification(data).then((resp) => {
          if(resp.status ==200){
            snackbar = {status:true,message:' Su mensaje ha sido enviado exitosamente',color:'#2f9b40',icon:'mdi-check-circle-outline'}
            }else{
            snackbar = {status:true,message:'Su mensaje no ha podido ser enviado',color:'#db4056',icon:'mdi-close-circle-outline'}
              }
              this.$emit("snackbar", snackbar);
        });
        this.format();
        this.$refs.form.reset();
      }
    },
    format() {
      this.form.recipients = [];
      this.form.subject = null;
      this.form.body = null;
    },
  },

  data: () => ({
    users: [],
    valid: true,
    form: {
      recipients: [],
      subject: null,
      body: null,
      group_conversation: 1,
    },
    notification: null,
    predifined_notification: true,
    predefineds: [],
    rules: {
      recipients: [
        (v) => (v && v.length > 0) || "por favor seleccione a un estudiante",
      ],
      subject: [(v) => !!v || "El asunto debe ser obligatorio"],
      body: [(v) => !!v || "El mensaje debe ser obligatorio"],
    },
  }),
};
</script>

<style  lang="scss">
.autocomplete_student{
    border:2px solid #c5c5c5;

  box-shadow:0 10px 12px 0px #888888;
  .v-select-list{
    border-radius: 10px !important;
  }
  .v-list--dense .v-list-item {
    color: #575756 !important;
    height: 40px !important;
    height: auto;
    font-weight: normal !important;
    margin: 0;
    overflow: hidden;
    &:hover{
      background: #DADADA !important;
    }
  }
  .v-list-item--link:before{
    background-color: transparent !important;
  }
}
.student_container {
  max-height: 100px !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  .student_chip {
    background: #f5f5f5 !important;
    height: 25px;
    .v-chip__content {
      font-family: "Lato", "Roboto";
      font-weight: 400;
    }
  }

}
   .prefedined_chip {
      background: #6e6e6e !important;
       height: 25px !important;
      .v-chip__content {
        font-family: "Lato", "Roboto";
        font-weight: 400;
        color:white
      }
    }
.subject{
.v-input__slot{
  min-height: 40px !important;
  border-radius: 15px;
  .v-text-field__slot{
    .v-label{
      top:10px
    }
  }
}
}
</style>
<style lang="scss" scoped>
.texts {
  font-family: "Lato", "Roboto";
  font-weight: bold;
  color: #3b3b39;
  font-size: 1rem !important;
  &.sub {
    color: #706e6e;
  }
}
hr{
  margin:.5rem 0;
  background: #c5c5c5;
  border:1px solid #c5c5c5;
}
  .cancel {
    text-transform: capitalize !important;
    font-weight: bold;
    color: #6e6e6e;
    border: 2px #6e6e6e solid;
    &.theme--light.v-btn:hover {
      background: #6e6e6e !important;
      opacity: 1;
      color: white;
    }
      .v-icon{
    font-size: 1.2rem;

  }
  }
    .send {
    text-transform: capitalize !important;
    font-weight: bold;
    color: #38b9d1;
    border: 2px #38b9d1 solid;
    &.theme--light.v-btn:hover {
      background: #38b9d1 !important;
      opacity: 1;
      color: white;
    }
  }
</style>
