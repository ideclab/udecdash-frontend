<template>
  <div>
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <h4
        v-text="title"
        class="text-left text-uppercase pl-3 pb-md-3 text-truncate"
      ></h4>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field class="filter" color="#575756" v-model="search"
            filled dense rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
          <help :report="{ name: 'module_visualization', level: 'first' }" />

          <download :report="{name:'module_visualization', level:'second'}" :data="module_visualization['members']" 
          :title="title" />
        </v-col>
      </v-row>
      <template v-if="no_problem">
        <v-data-table class="has_depth" :headers="headers" :items="module_visualization['members']"
          :items-per-page="-1" hide-default-footer :sort-by.sync="sort_by" :sort-desc.sync="sort_desc"
          :search="search" no-data-text="No hay datos disponibles">
          <template v-slot:[`item.name`]="{ item }">
            <div class="" v-text="item.name"></div>
          </template>
          <template v-slot:[`item.percentage_of_views`]="{ item }">
            <progress-linear
              :percentage="item.percentage_of_views"
            ></progress-linear>
          </template>
          <template v-slot:[`item.view`]="{ item }">
            <navigation-button
              :NavigationRoute="{
                name: 'module_visualization_third',
                params: { canvas_id: current_module_id, user_id: item.canvas_id, details: item, },
              }"
            />
          </template>
        </v-data-table>
      </template>
      <template v-else>
        <warning :information="warning"></warning>
      </template>
    </template>
  </div>
</template>

<script>
import Log from "@/models/log";

export default {
  name: "ModuleVisualizationSecond",
  props: ["information"],
  mounted() {
    this.currentCourseModule();
    this.startReport();
    this.createLog();
    this.$Session.updateActivity();
  },
  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id);
      log.setContext(log.REPORT_CONTEXT);
      log.setReport(log.MODULE_VISUALIZATION);
      log.setDeep(log.SECOND_LEVEL);
      log.add();
      log.enable();
    },
    currentCourseModule() {
      this.current_module_id = parseInt(this.$route.params.module_id);
    },
    startReport() {
      if (this.$route.params.details) {
        this.title = this.$route.params.details.name;
        this.filterReportInformation(this.$route.params.details);
      } else {
        this.consultReportData();
      }
      this.loader = false;
    },
    consultReportData() {
      let course = this.filterCourse();
      this.filterReportInformation(course);
    },
    filterCourse() {
      let current_module = this.information.find(
        (module) => module.canvas_id == this.current_module_id
      );
      this.title = current_module["name"];
      return current_module;
    },
    filterReportInformation(information) {
      information["resources"] = this.$COURSE["structure"].find(
        (element) => element.canvas_id == information.canvas_id
      ).resources;
      information["members"].map((item) => {
        if (item.all_resources_visualized) {
          item.percentage_of_views = parseFloat(100);
        } else {
          let views = 0;
          if (item.module_resources.length > 0) {
            item.module_resources.map((x) => {
              if (x.viewed) {
                views++;
              } else {
                views;
              }
            });
            item.percentage_of_views = (
              (views / item.module_resources.length) *
              100
            ).toFixed(1);
          } else {
            item.percentage_of_views = 0;
          }
          item.percentage_of_views = parseFloat(item.percentage_of_views);
        }
      });
      if (Object.entries(information["members"]).length != 0) {
        this.module_visualization = information;
      } else {
        this.warning["message"] = "No existen estudiantes";
        this.no_problem = false;
      }
    },
  },
  data: () => ({
    sort_by: "percentage_of_views",
    sort_desc: true,
    no_problem: true,
    module_visualization: [],
    current_module_id: null,
    loader: true,
    title: "",
    search: "",
    headers: [
      {
        text: "Estudiante",
        value: "name",
        class: "  text-uppercase items-center",
      },
      {
        text: "Progreso",
        value: "percentage_of_views",
        align: "center",
        class: " text-uppercase",
        width: 350,
      },
      { text: "", value: "view", sortable: false, width: 15 },
    ],
  }),
};
</script>
<style lang="scss" scoped>
.items-center {
  align-items: center;
}

</style>