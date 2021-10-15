<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field class="lato--regular filter" color="#575756"
          v-model="search" filled dense rounded
          prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
     <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
        <help :report="{ name: 'module_visualization', level: 'first' }"  />
        <download
          :report="{ name: 'module_visualization', level: 'first' }"
          :data="information"
        />
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="information" :search="search" item-key="canvas_id" hide-default-footer
      :items-per-page="-1" :sort-by.sync="sort_by" :sort-desc.sync="sort_desc" :header-props="headerProps" class="workflow_state_on has_depth"
       no-results-text="Ningún elemento coincide con la búsqueda">
      <template v-slot:[`item.name`]="{ item }">
        <div class="d-flex align-center">
          <item-state :state="item.workflow_state" />
          <div class="type_text--name shorten_text" v-text="item.name"></div>
        </div>
      </template>
      <template v-slot:[`item.workflow_state`]="{ item }">
        <div v-text="stateInSpanish(item.workflow_state)" ></div>
      </template>
      <template v-slot:[`item.visualizations_percentage`]="{ item }">
        <progress-linear
          :percentage="item.visualizations_percentage"
        ></progress-linear>
      </template>
      <template v-slot:[`item.view`]="{ item }">
        <navigation-button
          :NavigationRoute="{
            name: 'module_visualization_second',
            params: { module_id: item.canvas_id, details: item },
          }"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Log from "@/models/log";
export default {
  name: "ModuleVisualizationFirst",
  props: ["information"],
  mounted() {
    this.createLog();
    this.$Session.updateActivity();
  },
  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id);
      log.setContext(log.REPORT_CONTEXT);
      log.setReport(log.MODULE_VISUALIZATION);
      log.setDeep(log.FIRST_LEVEL);
      log.add();
      log.enable();
    },

    stateInSpanish(state) {
      if (state == "active") {
        return "Activo";
      } else {
        return "Desactivado";
      }
    },
  },
  data: () => ({
    current_course_id: null,
    search: "",
    module_visualization: [],
    sort_by: "position",
    sort_desc: false,
    filter: null,
    headerProps: {
      sortByText: "Ordenar tabla",
    },
    headers: [
      {
        text: "Estado",
        value: "workflow_state",
        sortable: false,
        class: "text-uppercase d-flex d-sm-none",
      },
      {
        text: "Módulos",
        value: "name",
      },

      {
        text: "Finalización",
        value: "visualizations_percentage",
        align: "center",
        width: 300,
      },

      { text: "", value: "view", sortable: false, width: 25 },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.shorten_text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  @media only screen and (max-width: 960px) {
    & {
      -webkit-line-clamp: 2;
    }
  }
}
.items-center {
  align-items: center;
}
</style>
