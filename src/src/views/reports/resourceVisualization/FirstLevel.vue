<template>
  <div>
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <v-row justify="center" no-gutters>
        <v-col cols="12"  sm="7" md="6" order=1 class="pr-3 pr-sm-0 pr-md-3 py-2 py-sm-3">
          <v-text-field class="lato--regular filter" color="#575756" v-model="search"
            filled  dense  rounded  prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5" md="4" order="3" order-sm="3" order-md="2" class="py-2 py-sm-3 d-flex justify-center" >
          <v-chip  color="#3bbad2" dark>
            Media total de vistas 
            <v-divider vertical inset></v-divider>
             {{media_result}}
          </v-chip>
        </v-col>
        <v-col cols="12" sm="5" md="2"  order="2" class="d-flex justify-center justify-sm-end  py-2 py-sm-3">
          <help :report="{ name: 'resource_visualization', level: 'first',log_level:'first_level' }" />
          <download
            :report="{ name: 'resource_visualization', level: 'first',log_level:'first_level' }"
            :data="resources"
          />
        </v-col>
      </v-row>
      <template v-if="no_problem">
        <v-data-table
          class="workflow_state_on has_depth resource_Visualization"
          :headers="headers"
          :items="resources"
          :search="search"
          item-key="mix_id"
          :sort-by.sync="sort_by"
          :sort-desc.sync="sort_desc"
        >
          <template v-slot:[`item.workflow_state`]="{ item }">
            <div v-text="stateName(item.workflow_state)"></div>
          </template>
          <template v-slot:[`item.resource_name`]="{ item }">
            <div class="d-flex items-center align-center">
              <item-state :state="item.workflow_state" type="Recurso" />
              <div class="d-flex flex-column style_text">
                <span v-text="item.resource_name" />
                <span class="d-none d-sm-flex" v-text="item.name_module" />
              </div>
            </div>
          </template>
          <template v-slot:[`item.name_module`]="{ item }" class="d-none">
            <div v-text="item.name_module">></div>
          </template>
          <template v-slot:[`item.visualizations_count`]="{ item }">
            <div class="style_text d-flex flex-column">
              <span v-text="item.visualizations_count" />
              <span v-text="item.student_count + ' Estudiantes'" />
            </div>
          </template>
          <template v-slot:[`item.view`]="{ item }">
            <navigation-button
              :NavigationRoute="{
                name: 'resource_visualization_second',
                params: {
                  module_id: item.module_id,
                  resource_id: item.canvas_id,
                  name_resource: item.resource_name,
                  details: item.members_visualizations,
                },
              }"
            />
          </template>
        </v-data-table>
      </template>
      <template v-else>
        <warning :message="message"></warning>
      </template>
    </template>
  </div>
</template>

<script>
import "jspdf-autotable";
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
      log.setReport(log.RESOURCE_VISUALIZATION);
      log.setDeep(log.FIRST_LEVEL);
      log.add();
      log.enable();
    },

    async startReport() {
      let current_modules = this.$COURSE["structure"];
      let resources = [];
      current_modules.forEach((item) => {
        let current_resources_visualizations = this.information.find(
          (e) => e.canvas_id == item.canvas_id
        ).resources_visualizations;
        item.resources.map((resource) => {
          let current_visualizations = current_resources_visualizations.find(
            (rsc) => rsc.resource_canvas_id == resource.canvas_id
          );
          resource["module_id"] = item.canvas_id;
          this.media.push(
            parseInt(current_visualizations.visualizations_count)
          );
          resource["members_visualizations"] =
            current_visualizations["members_visualizations"];
          resource["visualizations_count"] =
            current_visualizations["visualizations_count"];
          resource["name_module"] = item["name"];
          resource["new_workflow_state"] = this.workflowState({
            module: resource["module_item_workflow_state"],
            item: resource["workflow_state"],
          });
          resource["student_count"] = current_visualizations[
            "members_visualizations"
          ].filter((member) => member.views_count > 0).length;
          resources.push(resource);
        });
      });
      if (resources.length > 0) {
        this.resources = resources;
        this.current_media();
      } else {
        this.message = "No se han detectado recursos";
        this.no_problem = false;
      }
      this.loader = false;
    },
    stateName(state) {
      if (state == "active") {
        return "Activo";
      } else {
        return "Desactivado";
      }
    },
    current_media() {
      let values = this.media;
      values.sort((a, b) => a - b);
      let lowMiddle = Math.floor((values.length - 1) / 2);
      let highMiddle = Math.ceil((values.length - 1) / 2);
      let median = (values[lowMiddle] + values[highMiddle]) / 2;
      this.media_result = median;
    },
  },
  data: () => ({
    loader: true,
    no_problem: true,
    query: [],
    search: "",
    resources: [],
    current_course: null,
    media: [],
    headers: [
      {
        text: "Estado",
        value: "workflow_state",
        sortable: false,
        class: "d-flex d-sm-none",
      },
      {
        text: "Recursos",
        value: "resource_name",
      },
      {
        text: "Modulo",
        value: "name_module",
        class: "d-flex d-sm-none",
      },
      {
        text: "Interacciones",
        value: "visualizations_count",
        align: "center",
      },
      {
        text: "",
        value: "view",
        sortable: false,
        width: 25,
      },
    ],
    sort_by: "visualizations_count",
    sort_desc: true,
  }),
};
</script>
<style lang="scss" scoped>
.v-chip{
  height: 25px;

  justify-content: center;
  hr{
  background: white;
  margin:0 10px;
  &.v-divider--vertical.v-divider--inset{
    margin-top: 5px;
       max-height: calc(100% - 10px); 
  }
}
}

.items-center {
  align-items: center;
}
.style_text {
  span {
    font-size: 0.8rem;
    font-family: "lato", "Roboto", sans-serif;
    &:nth-child(1) {
      font-weight: bold !important;
    }
    &:nth-child(2) {
      color:#706f6f;
      font-weight: 400;
    }
  }
}
</style>
<style lang="scss">
.v-data-table.workflow_state_on.resource_Visualization
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  @media only screen and (min-width: 600px) {
    &:nth-child(3) {
      display: none;
    }
  }
}
</style>
