<template>
  <v-container class="page-container">
    <navigation-drawer :selectorItems="sections" @updatingSelector="updatingSelector"
      :key="key_navigation" />
    <v-container fill-height>
      <bread-crumb :bread-crumb-list="breadcrumbList" :title="title" :key="title"></bread-crumb>
      <v-layout :class="['content-container', getCustomBackgroundColor()]">
        <template v-if="loader">
          <loading></loading>
        </template>
        <template v-else>
          <template v-if="no_problem">
            <router-view  class="full-width"></router-view>
          </template>
          <template v-else>
            <warning :information="warning"></warning>
          </template>
        </template>
      </v-layout>
            <div class="d-flex d-md-none" id="smallSuggestions">
        <small-suggestions></small-suggestions>
      </div>
      <div class="d-none d-md-flex" id="desktopSuggestions">
        <desktop-suggestions></desktop-suggestions>
      </div>
    </v-container>

  </v-container>
</template>

<script>
import Vue from "vue";
import Webservice from "@/models/webservice";
import InteractiveMenu from "@/assets/js/InteractiveMenu.json";
import SmallSuggestions from '@/components/others/SmallSuggestions.vue';
import DesktopSuggestions from '@/components/others/DesktopSuggestions.vue';
export default {
  components: { SmallSuggestions,DesktopSuggestions},
  name: "Report",
  created() {
    this.initBreadcrumbList();
    this.initReports();
  },
  methods: {
    getCustomBackgroundColor(){
      let class_name = ''
      let override = {
        'course_interaction_second' : 'course_interaction_background',
        'course_interaction_first' : 'course_interaction_background'
      }
      if (override.hasOwnProperty.call(override, this.$route.name)){
        class_name = override[this.$route.name]
      }
      return class_name
    },
    async initReports() {
      let current_course = this.$route.params.course_id;
      let webservice = new Webservice();
      webservice
        .courseInformation(current_course)
        .then((response) => {
          console.log(response)
          if (!response.error) {
            this.filterInformation(response.information);
          } else {
            this.no_problem = false;
            this.warning["message"] = response.message;
            this.warning["status"] = response.status;
            this.warning["btn"] = "Ir a mis cursos"
          }
        })
        .finally(() => {
          this.loader = false;
          this.key_navigation += 1;
          if (this.no_problem) {
            this.tutorial()
          }
        });
    },
    tutorial(){
      let webservice = new Webservice();
      if (!localStorage.udecdash_tutorial) {
      webservice.get_tutorial().then(response => {
        let tutorial = response.information.find(e => e=='REPORTS_LAYOUT')
        tutorial? localStorage.setItem("udecdash_tutorial", false):this.$tours["myTour"].start()
      }
        )
        } else if (localStorage.udecdash_welcome == true) {
        this.$tours["myTour"].start()
      }
    },
    filterInformation(course) {
      Vue.prototype.$COURSE = course;
      this.sections = course["sections"];
      if (Object.entries(this.sections).length != 0) {
        let course_id = course.canvas_id;
        if (!localStorage.getItem(course_id)) {
          localStorage.setItem(course_id, course["sections"][0]["canvas_id"]);
        }
        let sections_id = localStorage.getItem(course_id);
        Vue.prototype.$SECTION = course["sections"].find(
          (e) => e.canvas_id == sections_id
        );
      } else {
        this.warning["message"] = "No existen secciones que posean estudiantes";
        this.warning["status"] = -1;
        this.warning["btn"] = "Ir a mis cursos"
        this.no_problem = false;
      }
    },
    initBreadcrumbList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
      this.title = this.$route.meta.breadcrumb[0].value;
    },
    updatingSelector(event) {
      localStorage.setItem(this.$COURSE.canvas_id, event);
      this.$router.go(this.$router.history.current.matched[0].path);
    },
  },
  data: () => ({
    loader: true,
    no_problem: true,
    warning: [],
    current_section: null,
    sections: [],
    key_navigation: 0,
    breadcrumbList: [],
    course_information: [],
  }),
  computed: {
    interactiveMenu() {
      let name_report = this.$route.meta.breadcrumb[0].value;
      return InteractiveMenu[name_report];
    },
  },
  watch: {
    $route() {
      this.initBreadcrumbList();
    },
  },
};
</script>

<style lang="scss" scoped>
*:not(.v-icon) {
  font-family: "Lato", "Roboto", "sans-serif";
  font-size: 1rem;
}

.page-container {
  height: 100%;
  padding-top:0px !important;
  width: 100%;
  max-width: 100%;
  max-height: calc(100vh - 64px - 30px);
  background: transparent;
}

.content-container {
  background: white;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 0 0 15px 15px;
  height: 100%;
  width: 100%;
  .full-width {
    width: 100%;
  }
}
</style>
<style lang="scss">

.v-data-table.workflow_state_on
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  @media only screen and (min-width: 600px) {
    &:nth-child(1) {
      display: none;
    }
    &:nth-child(2) {
      padding: 0;
    }
  }
}
.v-data-table.has_depth > .v-data-table__wrapper > table > tbody > tr > td {
  @media only screen and (min-width: 600px) {
    &:last-child {
      background: rgba(59, 186, 210, 0.1);
      padding: 0;
    }
  }
}
.v-data-table > .v-data-table__wrapper {
  overflow-x: hidden;
  > table {
    cursor: default;
    > thead > tr > th {
      color: #3c3c3b !important;
      font-family: "Lato", "Roboto", "sans-serif";
      font-weight: bold;
      font-size: 0.8rem !important;
      .v-icon {
        color: rgba(186, 186, 186, 1) !important;
      }
    }
    > tbody > tr {
      &:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background: rgba(242, 175, 95, 0.15) !important;
      }
      &:nth-child(odd) {
        background: rgba(246, 246, 246, 0.9);
      }
      > td {
        font-family: "Lato", "Roboto", "sans-serif";
      font-weight: 400;
      font-size: 0.8rem !important;
        height: 38px !important;
      }
    }
  }
}
.type_text {
  &--title {
    font-family: "Lato", "Roboto", "sans-serif";
    font-weight: bold;
  }
  &--name {
    font-family: "Lato", "Roboto", "sans-serif";
    font-weight: 400;
  }
}
.course_interaction_background {
  background: #f6f6f6 !important;
  background-color: #f6f6f6 !important;
}
</style>
