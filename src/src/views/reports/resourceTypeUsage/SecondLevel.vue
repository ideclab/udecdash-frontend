<template>
  <div>
    <template v-if="loader">
      <loading></loading>
    </template>
    <template v-else>
      <h4 v-text="transformSpanishName(type)"
       class="text-left text-uppercase pl-3 pb-3 text-truncate"
      ></h4>
      <template v-if="resources.length>0">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field class=" filter" color="#575756" v-model="search"
            filled dense rounded prepend-inner-icon="mdi-magnify"
            label="Buscar" single-line hide-details></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
          <help :report="{ name: 'resource_type_usage', level: 'first' ,log_level:'second_level'}" />
          <download
            :report="{ name: 'resource_type_usage', level: 'second',log_level:'second_level' }"
            :data="resources"
            :title="transformSpanishName(type)"
          />
        </v-col>
      </v-row>
        <v-data-table :headers="headers" :items="resources" class="workflow_state_on has_depth"
          item-key="new_canvas_id" :search="search" :items-per-page="-1" hide-default-footer>
          <template v-slot:[`item.new_workflow_state`]="{ item }">
            <div
              v-text="stateName(item.new_workflow_state)"
            ></div>
          </template>
          <template v-slot:[`item.resource_name`]="{ item }">
            <div class="d-flex items-center ">
                <item-state :state="item.workflow_state" type="Recurso" />
              <div
                v-text="item.resource_name"
              ></div>
            </div>
          </template>
          <template v-slot:[`item.members_visualizations_percentage`]="{ item }">
            <progress-linear
              :percentage="item.members_visualizations_percentage"
            ></progress-linear>
          </template>
          <template v-slot:[`item.view`]="{ item }">
               <navigation-button
              :NavigationRoute="{
                name: 'resource_type_usage_third',
                params: {type: type,
                  name_resource: item.resource_name, resource: item.canvas_id, details: item.members_visualizations}}"
            />
          </template>
        </v-data-table>
        </template >
        <template v-else>
          <no-data :information="{message:`el curso no posee ${transformSpanishName(type)} `,btn:true}"></no-data>
        </template>
    </template>
  </div>
</template>

<script>
import Log from "@/models/log";
import NoData from "@/components/alerts/NoData.vue";

export default {
  components: { NoData },

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
      log.setReport(log.RESOURCE_TYPE_USAGE);
      log.setDeep(log.SECOND_LEVEL);
      log.add();
      log.enable();
    },
    startReport() {
      this.type = this.$route.params.type;
      let resources_item =
        this.information[this.type]["resources_interactions"];
      let resources = this.information[this.type]["resources"];

      resources.map((item) => {
        let resourse = resources_item.find(
          (resourse) => resourse.resource_canvas_id == item.canvas_id
        );
        item["new_canvas_id"] = `${item["canvas_id"]}${item["position"]}`;
        item["members_visualizations"] = resourse["members_visualizations"];
        item["members_visualizations_percentage"] =
          resourse["members_visualizations_percentage"];
        item["new_workflow_state"] = this.workflowState({
          module: item["module_item_workflow_state"],
          item: item["workflow_state"],
        });
      });
      this.resources = resources;
      this.loader = false;
    },
    transformSpanishName(name) {
      if (name == "Assignment") return "Tareas";
      else if (name == "Attachment") return "Documentos";
      else if (name == "ContextExternalTool")
        return "Herramientas externas (LTI)";
      else if (name == "DiscussionTopic") return "Foros de discusión";
      else if (name == "ExternalUrl") return "Url externas";
      else if (name == "Quiz") return "Evaluaciones";
      else if (name == "WikiPage") return "Paginas";
      else return "Otros";
    },
    stateName(state) {
      if (state == "active") {
        return "activo";
      } else {
        return "Desactivado";
      }
    },
  },
  data: () => ({
    loader: true,
    name_resource: null,
    search: "",
    no_data:[],
    headers: [
      {
        text: "Estado",
        value: "new_workflow_state",
        sortable: false,
          class:
          " text-uppercase d-flex d-sm-none",
      },
      {
        text: "Nombre",
        value: "resource_name",
      },
      {
        text: "Porcentaje de visualizacion",
        value: "members_visualizations_percentage",
        width: 350,
      },
      { text: "", value: "view", sortable: false,width: 15 },
    ],
  }),
};
</script>
<style lang="scss" scoped>
.items-center{
  align-items: center;
}
</style>