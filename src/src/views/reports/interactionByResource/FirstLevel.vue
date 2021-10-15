<template>
  <div>
    <v-row>
      <v-col cols="12" sm="5" md="6" order=1 class="pr-3 pr-sm-0 pr-md-3">
        <v-text-field class="lato--regular filter" color="#575756"
          v-model="filter" filled dense rounded
          prepend-inner-icon="mdi-magnify"  label="Buscar recurso"  single-line  hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4" order="3" order-sm="2"  class="d-flex justify-center ">
        <v-select class="mt-0 pl-5 pl-sm-0 pr-md-10 select-order" :items="order" item-text="name" label="Ordenar recursos de modulos"
          @change="sortResources($event)" append-icon="mdi-chevron-down" background-color="#f6f6f6" color="#575756" :rounded="true"
          :dense="true" item-color="#575756" prepend-inner-icon="mdi-arrow-up-down-bold" :flat="true" :menu-props="{ contentClass: 'select-order-container' }"
        />
      </v-col>
      <v-col cols="12" sm="3" md="2"  order="2" class="d-flex justify-center justify-sm-end">
        <help :report="{ name: 'interaction_by_resource', level: 'first' }" />
        <download
          :report="{ name: 'interaction_by_resource', level: 'first' }"
          :data="interaction_by_resource"
        />
      </v-col>
    </v-row>
    <template v-if="!data">
    <template v-if="no_problem">
      <div id="interaction_by_report">
        <v-expansion-panels
          v-model="panel"
          multiple
          class="pt-5"
          :key="key_modules"
        >
          <v-expansion-panel
            v-for="module in interaction_by_resource"
            :key="module.canvas_id"
          >
            <v-expansion-panel-header>
              <template v-slot:actions>
                <span clas="status">
                  <item-state :state="module.workflow_state" />
                </span>
                <v-icon class="icon mr-3">fas fa-chevron-down</v-icon>
              </template>
              <span class="module text-truncate">{{ module.name }} </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <interaction-table
                :key="key_resources"
                :Resources="module.search_resources"
                :ModuleId="module.canvas_id"
                :Members="module.members"
                :MembersCount="module.members_count"
              ></interaction-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </template>
    <template v-else>
      <warning :message="message"></warning>
    </template>
     </template>
    <template v-else>
      <no-data :information="no_data" :key="key_no_data"></no-data>
    </template>
  </div>
</template>
<script>
import InteractionTable from "./InteractionTable.vue";
import Log from "@/models/log";
import NoData from "@/components/alerts/NoData.vue";

export default {
  props: ["information"],
  components: { InteractionTable,NoData },

  created() {
    this.startReport();
    this.createLog();
    this.$Session.updateActivity();
  },
  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id);
      log.setContext(log.REPORT_CONTEXT);
      log.setReport(log.INTERACTION_BY_RESOURCE);
      log.setDeep(log.FIRST_LEVEL);
      log.add();
      log.enable();
    },

    async startReport() {
      let structure = this.$COURSE["structure"];
      this.information.map((item, index) => {
        let current_loca_module_resources = structure.find(
          (element) => element.canvas_id == item.canvas_id
        );
        item.resources_interaction.map((resource, order) => {
          let current_local_course_resource =
            current_loca_module_resources.resources.find(
              (element) => element.canvas_id == resource.resource_canvas_id
            );
          resource["order"] = order;
          resource["workflow_state"] = this.workflowState({
            module: current_local_course_resource["module_item_workflow_state"],
            item: current_local_course_resource["workflow_state"],
          });
          resource["name"] = current_local_course_resource["resource_name"];
        });
        item.search_resources = item.resources_interaction;
        this.panel.push(index);
      });
      if (Object.entries(this.information).length != 0) {
        this.interaction_by_resource = this.information;
      } else {
        this.message = "No se han detectado Modulos en el curso";
        this.no_problem = false;
      }
    },

    sortResources(status) {
      this.order_status = status;
      if (status == "ascendente") {
        this.interaction_by_resource.forEach((e) => {
          e["search_resources"].sort(
            (a, b) => a.viewed_resources_count - b.viewed_resources_count
          );
        });
        this.key_resources += 1;
        this.key_modules += 1;
      } else if (status == "Descendente") {
        this.interaction_by_resource.forEach((e) => {
          e["search_resources"].sort(
            (a, b) => b.viewed_resources_count - a.viewed_resources_count
          );
        });
        this.key_resources += 1;
        this.key_modules += 1;
      } else if (status == "Normal") {
        this.interaction_by_resource.forEach((e) => {
          e["search_resources"].sort((a, b) => a.order - b.order);
        });
        this.key_resources += 1;
        this.key_modules += 1;
      }
    },
    state(state) {
      if (state == "active") {
        return "green-border";
      } else {
        return "gray-border";
      }
    },

  },
  data: () => ({
    clear: [],
    loader: true,
    order_status: "Normal",
    key_resources: 0,
    no_problem: true,
    order: ["Normal", "Descendente", "ascendente"],
    status: "",
    message_no_date:"",
    current_section: null,
    modules: [],
    key_no_data:0,
    current_course: null,
    resources: [],
    key_modules: 0,
    no_data:[],
    data:false,
    panel: [],
    icon: null,
    earch: "",
  }),
  computed: {
    filter: {
      get() {
        return this.search;
      },
      set(value) {
        value = value.toLowerCase();
        let datas = this.information.filter((item) => {
          item.search_resources = item.resources_interaction.filter(
            (resourse) => resourse.name.toLowerCase().indexOf(value) !== -1
          );
          return item.search_resources.length !== 0;
        });
      
        if(datas.length ==0){
        this.no_data['message']=`Lo sentimos,<br /> No existen resultados para: <span class="color_yellow"> ${value} <span>`
          this.key_no_data +=1;
          this.data=true
        }else{
          this.data=false
        }
          this.interaction_by_resource = datas;
         this.sortResources(this.order_status);
        this.key_resources += 1;
        this.key_modules += 1;
        this.search = value;
      },
    },
  },
};
</script>
<style lang="scss">
.color_yellow{
  color:#f49e16;
}
.select-order-container {
  box-shadow: none !important;
  .v-select-list {
    border-radius: 10px !important;
    background: #ededed;
    padding: 0px;
  }
  .v-list--dense .v-list-item {
    color: #575756 !important;
    min-height: 40px !important;
    height: auto;
    font-weight: normal !important;
    border-radius: 30px;
    margin: 0;
    padding: 0 10px;
    background: #ededed;
    overflow: hidden;
    &:hover {
      background: #dadada !important;
    }
  }
  .v-list-item--link:before {
    background-color: transparent !important;
  }
}
.select-order.v-select {
  &.v-text-field--rounded > .v-input__control > .v-input__slot {
    font-family: "Lato", "Roboto", "sans-serif" !important;
    font-size: 1rem;
    padding: 0 10px !important;
  }
}
#interaction_by_report {
  .module_status_color {
    background: rgba(244, 244, 244, 1) !important;
    border-radius: 5px;
    height: 35px;
    width: 4px;
    &.green-border {
      background: #27d31e !important;
    }
    &.gray-border {
      background: #706f6f !important;
    }
  }
  .icon {
    order: 1;
    font-size: 1rem;
  }
  .module {
    order: 2;
  }
  .v-expansion-panel {
    border-radius: 0px;
    padding: 0;
    .v-expansion-panel-header {
      font-family: "Lato", "Roboto", "sans-serif" !important;
      font-weight: 400;
      padding: 0 0px 2px 4px;
      min-height: 40px !important;
      border-radius: 0px;
      border-bottom-left-radius: 0px !important;
      border-top: 1px solid #878787;
      border-bottom: 1px solid #878787;
      background: #f8f8f7;
    }
    .v-expansion-panel-content {
      border-radius: 0px;
      border-top-width: 0px;
      .v-expansion-panel-content__wrap {
        padding: 0 0px 0px 4px !important;
      }
    }
    &::before {
      box-shadow: none !important;
    }
  }
}
</style>
