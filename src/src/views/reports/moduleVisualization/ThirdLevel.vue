<template>
  <div>
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <h4
        v-text="student_name"
        class="text-left text-uppercase pl-3 pb-3 text-truncate"
      ></h4>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field class="lato lato--regular filter" color="#575756" v-model="search" filled dense
            rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
          <help :report="{name:'module_visualization', level:'first'}" />
          <download :report="{name:'module_visualization', level:'third'}" :data="resourses" :title="student_name" />
        </v-col>
      </v-row>
      <template v-if="no_problem">
          <v-data-table  class="workflow_state_on"  :headers="headers"  :items="resourses"  item-key="canvas_id"
            hide-default-footer :search="search" :items-per-page="-1">
            <template v-slot:[`item.workflow_state`]="{ item }">
              <div v-text="stateInSpanish(item.workflow_state)"></div>
            </template>

            <template v-slot:[`item.resource_name`]="{ item }" justify="end">
              <div class="d-flex items-center">
                <item-state :state="item.workflow_state" type="Recurso"/>
                <div class=" text-center" v-text="item.resource_name"></div>
              </div>
            </template>
            <template v-slot:[`item.first_view`]="{ item }">
              <template v-if="item.first_view">
                <span v-html="getFormatedDate(item.first_view)"></span>
              </template>
              <template v-else>
                <p style="font-weight: 900; font-size: 20px">__</p>
              </template>
            </template>
            <template v-slot:[`item.viewed`]="{ item }" justify="end">
              <display-state :state='item.viewed' class="d-none d-sm-flex" />
              <span
                class="d-flex d-sm-none text-center"
                v-text="item.viewed ? 'si' : 'no'"
              ></span>
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
import DateFormatter from '@/models/DateFormatter'

export default {
  props: ["information"],
  name: "ModuleVisualizationThird",
  mounted() {
    this.currentVariables();
    this.startReport();
    this.createLog();
    this.$Session.updateActivity();
  },
  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id);
      log.setContext(log.REPORT_CONTEXT);
      log.setReport(log.MODULE_VISUALIZATION);
      log.setDeep(log.THIRD_LEVEL);
      log.add();
      log.enable();
    },

    currentVariables() {
      this.current_module_id = parseInt(this.$route.params.module_id);
      this.current_student_id = parseInt(this.$route.params.user_id);
    },
    startReport() {
      if (this.$route.params.details) {
        this.filterReportInformation(this.$route.params.details);
      } else {
        this.consultReportData();
      }
      this.loader = false;
    },
    consultReportData() {
      let student = this.filterStudents();
      this.filterReportInformation(student);
    },
    filterStudents() {
      let current_module_student = this.information.find(
        (module) => module.canvas_id == this.current_module_id
      ).members;
      return current_module_student.find(
        (student) => student.canvas_id == this.current_student_id
      );
    },
    filterReportInformation(vieweds) {
      this.student_name = vieweds.name;
      let resources = this.information.find(
        (element) => element.canvas_id == this.current_module_id
      ).resources;

      vieweds["module_resources"].map((data) => {
        let current_resource = resources.find(
          (element) => element.canvas_id == data.resource_canvas_id
        );
        data["workflow_state"] = this.workflowState({
          module: current_resource["module_item_workflow_state"],
          item: current_resource["workflow_state"],
        });
        data["resource_name"] = current_resource["resource_name"];
      });
      if (Object.entries(vieweds["module_resources"]).length != 0) {
        this.resourses = vieweds["module_resources"];
      } else {
        this.warning['message'] = "No existen Recursos";
        this.no_problem = false;
      }
    },
    stateInSpanish(state) {
      if (state == "active") {
        return "Activo";
      } else {
        return "Desactivado";
      }
    },
    getFormatedDate(date){
      let date_formatter = new DateFormatter(date)
      return date_formatter.friendly('<br />', '- -', 'light')
    }
  },
  data: () => ({
    loader: true,
    resourses: "",
    no_problem: true,
    search: "",
    student_name: "",
    warning:[],
    headers: [
      {
        text: "Estado",
        value: "workflow_state",
        sortable: false,
        class:
          " text-uppercase d-flex d-sm-none",
      },
      {
        text: "Recurso",
        value: "resource_name",
        class: " text-uppercase items-center",
      },
      {
        text: "Primera visualizacion",
        value: "first_view",
        align: "center",
        class: " text-uppercase items-center",
      },
      {
        text: "visualizado",
        value: "viewed",
        align: "center",
        class: " text-uppercase",
      },
    ],
  }),
};
</script>
<style lang="scss" scoped>
.items-center{
  align-items: center;
}
</style>
