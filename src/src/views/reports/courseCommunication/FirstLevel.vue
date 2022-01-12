<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
        <help :report="{name:'course_communication', level:'first',log_level:'first_level'}" />
        <download :report="{name:'course_communication', level:'first',log_level:'first_level'}" 
        :data="{'information':information,'member_count_discussion':member_count_discussion,'member_count_message':member_count_message}" />
      </v-col>
    </v-row>
    <div id="course_communication">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="5" lg="4">
          <v-card elevation="0" class="pt-10  px-3 px-md-10 mx-sm-5">
            <div class="d-flex flex-column align-center align-center justify-center">
              <v-progress-circular :rotate="-90" :size="70"
                :width="6" :value="information['discussion_entry_percentage']" color="#f69f19">
              <span class="black--text">{{ information["discussion_entry_percentage"] }} %</span>  
              </v-progress-circular>
              <span class="card_title pt-1 pb-3"> Foros no evaluados </span>
            </div>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col cols="2">
                <v-icon> mdi-calendar-edit </v-icon>
              </v-col>
              <v-col cols="7">
                <span> Entradas creadas </span>
              </v-col>
              <v-col cols="3">
                <span>
                  {{ information["discussion_entry_count"] }}
                </span>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col cols="2"><v-icon> mdi-calendar-edit </v-icon></v-col>
              <v-col cols="7"><span> Participantes </span></v-col>
              <v-col cols="3"><span>{{ member_count_discussion }}</span></v-col>
            </v-row>
              <div class="pt-15  d-flex justify-center">
                <router-link
                    :to="{
                      name: 'course_communication_second',
                      params: { type: 'discussion', details: information.discussion_entry_list, title:'Foros no evaluados'}}"
                    class="background d-flex justify-center py-2 " elevation="0">
                  <icon-base width="23" height="23" viewBox="0 0 8.31 14.28"
                    color="#3dbcd9"  icon-name="arrow"  class="browse_button navigation">
                    <icon-arrow />
                  </icon-base>
                </router-link>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="5" lg="4">
          <v-card elevation="0" class="pt-10   px-3 px-md-10 mx-sm-5">
            <div class="d-flex flex-column align-center align-center justify-center">
              <v-progress-circular :rotate="-90" :size="70"
                :width="6" :value="information['mail_messages_percentage']" color="#f69f19">
                 <span class="black--text">{{ information["mail_messages_percentage"] }} %</span>
              </v-progress-circular>
              <span class="card_title pt-1 pb-3"> Bandeja de entrada </span>
            </div>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col cols="2">
                <v-icon> mdi-calendar-edit </v-icon>
              </v-col>
              <v-col cols="7">
                <span> Entradas creadas </span>
              </v-col>
              <v-col cols="3">
                <span>
                  {{ information["mail_messages_count"] }}
                </span>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col cols="2">
                <v-icon> mdi-calendar-edit </v-icon>
              </v-col>
              <v-col cols="7">
                <span> Participantes </span>
              </v-col>
              <v-col cols="3">
                <span>
                  {{ member_count_message }}
                </span>
              </v-col>
            </v-row>
            <div class="pt-15  d-flex justify-center">
              <router-link
                  :to="{
                    name: 'course_communication_second',
                    params: {  type: 'mail',  details: information.mail_messages_list,   title:'Correos'}}"
                  class="background d-flex justify-center py-2 " elevation="0"
                >
                <icon-base width="23" height="23" viewBox="0 0 8.31 14.28"
                  color="#3dbcd9"  icon-name="arrow"  class="browse_button navigation">
                  <icon-arrow />
                </icon-base>
              </router-link>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Log from "@/models/log";

export default {
  props: ["information"],
  created() {
    this.startReport();
    this.createLog();
    this.$Session.updateActivity();
  },
  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id);
      log.setContext(log.REPORT_CONTEXT);
      log.setReport(log.COURSE_COMMUNICATION);
      log.setDeep(log.FIRST_LEVEL);
      log.add();
      log.enable();
    },
    async startReport() {
      let member_discussion_temp =
        this.information.discussion_entry_list.filter(
          (e) => e.creation_count > 0
        );
      let member_message_temp = this.information.mail_messages_list.filter(
        (e) => e.creation_count > 0
      );
      this.member_count_discussion = member_discussion_temp.length;
      this.member_count_message = member_message_temp.length;
    },
  },
  data: () => ({
    loader: true,
    current_course: null,
    communications: [],
    member_count_message: 0,
    member_count_discussion: 0,
  }),
};
</script>
<style lang="scss" scoped>
.v-card {
  border: 1px #c6c6c6 solid;
  background: linear-gradient(
    45deg,
    rgb(255, 255, 255) 0%,
    rgb(239, 239, 239) 90%
  );
  border-radius: 20px !important;
  hr {
    height: 1px;
    background: rgb(237, 237, 237);
    width: 100%;
  }
  span {
    font-family: "Lato", "Roboto", "sans-serif";
    font-weight: 400;
    font-size: 0.9rem;
    &.card_title {
      font-size: 1rem;
      font-weight: bold;
    }
  }
  .background {
    width: 70%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    cursor: pointer;
    background: rgba(59, 186, 210, 0.1);
    &:hover {
      .browse_button {
        color: white;
        background: #3dbcd9;
                border: 2px #3dbcd9 solid;

        border-radius: 100%;
      }
    }

    .browse_button {
      border: 2px solid;
      padding: 3px;
      border-radius: 100%;
      &:hover {
        color: white;
        background: #3dbcd9;
        border: 2px #3dbcd9 solid;
        border-radius: 100%;
      }
    }
  }
}
</style>
