<template>
  <v-data-table class="workflow_state_on has_depth" :headers="headers"
    :items="Resources" item-key="resource_canvas_id" :items-per-page="-1" hide-default-footer>
    <template v-slot:[`item.workflow_state`]="{ item }">
      <div class="font-kanit-Medium text_color text_color-darkGray" v-text="stateName(item.workflow_state)"></div>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <div class="d-flex items-center">
        <item-state :state="item.workflow_state" type="Recurso"/>
        <div v-text="item.name"></div>
      </div>
    </template>
    <template v-slot:[`item.visualization_percentage`]="{ item }">
      <div class="d-flex justify-center align-center">
        <span class="icon-check pr-2">
          <v-icon> mdi-check </v-icon>
          {{ item.viewed_resources_count }}
        </span>
        <div class="focus-progress">
          <v-progress-linear class="progress-width"
            :value="item.visualization_percentage"  color="#2F9B40"  height="13">
          </v-progress-linear>
        </div>
        <span class="icon-close pl-2">
          {{MembersCount - item.viewed_resources_count}}
        <v-icon> mdi-close </v-icon>
        </span>
      </div>
    </template>
    <template v-slot:[`item.view`]="{ item }">
      <navigation-button
        :NavigationRoute="{
          name: 'interaction_by_resource_second',
          params: {module_id: ModuleId, resource_id: item.resource_canvas_id, details: Members, name: item.name,
          },
        }"
      />
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "InteractionTable",
  props: ["Resources", "Members", "MembersCount", "ModuleId"],
  data: () => ({
    headers: [
      {
        text: "Estado",
        value: "workflow_state",
        sortable: false,
        class: "d-flex d-sm-none",
      },
      {
        text: "Modulo",
        value: "name",
      },
      {
        text: "Vistos",
        value: "visualization_percentage",
        width: 350,
      },
      { text: "", value: "view", sortable: false, width: 25 },
    ],
    search: "",
  }),
  methods: {
    stateName(state) {
      if (state == "active") {
        return "Activo";
      } else {
        return "Desactivado";
      }
    },
  },
};
</script>
<style lang="scss">
#interaction_by_report {
  .v-data-table.workflow_state_on
    > .v-data-table__wrapper
    > table
    > tbody
    > tr {
    &:nth-child(odd) {
      background: white;
    }
    &:nth-child(even) {
      background: rgba(246, 246, 246, 0.9);
    }
    > td {
      @media only screen and (min-width: 600px) {
           &:nth-child(3) {
          width: 450px;
        }
        &:nth-child(4) {
          width: 25px;
        }
      }
    }
  }
  .icon-close {
    font-size: 0.8rem !important;
    border-radius: 100%;
    color: #d86883 !important;
    .v-icon {
      font-size: 20px !important;
      color: #d86883 !important;
    }
  }
  .icon-check {
    color: #2f9b40;
    font-size: 0.8rem !important;
    .v-icon {
      font-size: 20px !important;
      color: #2f9b40;
    }
  }
  .v-data-table-header {
    display: none;
  }
  .items-center {
    align-items: center;
  }
  .v-progress-linear {
    border-radius: 10px !important ;
    .v-progress-linear__buffer {
      background: #d86883 !important;
  
      border: 2px solid transparent;
    }
    .v-progress-linear__determinate {
      height: 100% !important;
      margin: 0 !important;
      max-width: 100% !important;
      border-radius: 0 !important ;
    
    }
        .progress-width {
      width: 200px;
      @media only screen and (max-width: 900px) {
        & {
          max-width: 180px;
        }
      }
      @media only screen and (max-width: 800px) {
        & {
          width: 140px;
        }
      }
      @media only screen and (max-width: 600px) {
        & {
          width: 120px;
        }
      }
    }
  }
}
</style>
