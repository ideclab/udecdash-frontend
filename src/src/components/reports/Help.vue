<template>
  <v-dialog class="student_resource" max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn   v-bind="attrs"   id="v-step-4"  @click="init()"
        v-on="on" small rounded outlined class="px-10 px-sm-5">
     <v-icon small> far fa-chart-bar</v-icon>
    </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <div class="student_toolbar">
          <v-toolbar color="white" elevation="0">
            <v-spacer></v-spacer>
            <v-toolbar-title class=" text-center text-uppercase" v-text="interactiveMenu[report['name']]['title']" >
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div ckass="pl-20">
              <v-icon class="icon_close dark" @click="dialog.value = false"  >mdi-close</v-icon>
            </div>
          </v-toolbar>
        </div>
     <v-card-text>
          <v-card elevation="0" v-for="(data, i) in interactiveMenu[report['name']][report['level']]" :key="i">
            <v-card-title
              align="left"
              class=" title-report-sm title-report-md title-report-lg title-report-xl text-truncate">{{ data.subtitle }}</v-card-title
            >
            <img :src="require('@/assets/img/icon_menu.png')" height="15" class="spacer-center icon-subtitle"
            />
            <v-card-text v-for="(c, i) in data.content" :key="i" class="py-1  text-body1-sm text-body1-md text-body1-lg text-body1-xl ">
              <div>· {{ c }}</div>
            </v-card-text>
            <v-divider class="divider"></v-divider>
          </v-card>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import InteractiveMenu from '@/assets/js/InteractiveMenu.json'
import Log from "@/models/log";
export default {
    props: {
    report: {
      type: Object,
      default: () => ({
        name: 'module_visualization',
        level: 'first',
        log_level:'first_level'
      })
    }
  },
  methods:{
    init(){
      this.interactiveMenu = InteractiveMenu
      this.createLog()
      this.$Session.updateActivity();
    },
    createLog(){
     let log = new Log(this.$route.params.course_id);
      log.setReport(this.report['name']);
      log.setContext('report_information');
      log.setDeep(this.report['log_level']);
      log.add();
      log.enable();
    }
  }
};
</script>
<style lang="scss" scoped>
.v-btn {
  border: 2px solid #706f6f !important;
  color:#706f6f;
    @media only screen and (max-width: 600px) {
  height: 30px !important;
  }
  &:hover{
    color:white;
    background: #706f6f;
  }
}
</style>
