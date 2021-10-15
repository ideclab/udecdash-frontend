<template>
  <div>
    <template v-if="no_problem">  
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field class="filter" color="#575756" v-model="search" filled
          dense rounded prepend-inner-icon="mdi-magnify" label="Buscar" single-line hide-details
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-end ">
        <help :report="{name:'resource_type_usage', level:'first'}" />
        <download :report="{name:'resource_type_usage', level:'first'}" :data="resource_type_usage" />
      </v-col>
    </v-row>
    <v-data-table :search="search" :headers="headers" :items="resource_type_usage"
      :header-props="headerProps" hide-default-footer class="has_depth"
      no-results-text="Ningún elemento coincide con la búsqueda">
      <template v-slot:[`item.name`]="{ item }">
          <div v-text="transformSpanishName(item.name)"></div>
      </template>
      <template v-slot:[`item.resources_count`]="{ item }">
        <div v-text="item.resources_count"></div>
      </template>
      <template v-slot:[`item.resource_type_use_percentage`]="{ item }">
        <progress-linear
          :percentage="item.resource_type_use_percentage"
        ></progress-linear>
      </template>
      <template v-slot:[`item.view`]="{ item }" justify="end">
        <navigation-button 
      :NavigationRoute="{ name: 'resource_type_usage_second', params: {  type: item.name}}"/>
      </template>
    </v-data-table>
    <h5 class="py-5">
      Diversidad en el tipo de recurso
    </h5>
    <v-row>
      <v-col cols=6  sm=4 md=3  v-for="item in resource_type_usage" :key="item.name">
        <visualization-card :name="item.name" :percentage="item.resources_percentage" :NavigationRoute="{name: 'resource_type_usage_second', params: {type: item.name}}"></visualization-card>
      </v-col>
    </v-row>
    </template>
    <template v-else>
      <warning :information="warning"></warning>
    </template>
  </div>
</template>

<script>

import 'jspdf-autotable'
import Log from '@/models/log'
import VisualizationCard from '@/components/reports/VisualizationCard.vue'

export default {
  components: { VisualizationCard },
  props: ['information'],
  created() {
   this.startReport()
    this.createLog()
    this.$Session.updateActivity()
  },

  methods: {
    createLog() {
      let log = new Log(this.$route.params.course_id)
      log.setContext(log.REPORT_CONTEXT)
      log.setReport(log.RESOURCE_TYPE_USAGE)
      log.setDeep(log.FIRST_LEVEL)
      log.add()
      log.enable()
    },

    startReport() {
      let type_resource = []
      for (let element in this.information) {
        type_resource.push({ name: element })
      }
      type_resource.map(item => {
        item.resources = this.information[item.name]['resources']
        item.resources_percentage = this.information[item.name][
          'resources_percentage'
        ]
        item.resources_count = this.information[item.name]['resources_count']
        item.resource_type_use_percentage = this.information[item.name][
          'resource_type_use_percentage'
        ]
      })
      if (Object.entries(type_resource).length != 0) {
        this.resource_type_usage = type_resource
      } else {
        this.resource_type_usage = []
        this.warning["message"] = 'No se han detectado recursos en el curso'
        this.no_problem = false
      }
    },
    transformSpanishName(name) {
      if (name == 'Assignment') return 'Tareas'
      else if (name == 'Attachment') return 'Documentos'
      else if (name == 'ContextExternalTool') return 'Herramientas externas'
      else if (name == 'DiscussionTopic') return 'Foros de discusión'
      else if (name == 'ExternalUrl') return 'Url externas'
      else if (name == 'Quiz') return 'Evaluaciones'
      else if (name == 'WikiPage') return 'Páginas'
      else return 'Otros'
    },

  },
  data: () => ({
    loader: true,
    search:'',
    no_problem: true,
    resource_type_usage: [],
    headers: [
      {
        text: 'Tipos de recursos',
        value: 'name',
        sortable: false,
        align: 'left',
      },
      {
        text: 'Recursos existentes',
        value: 'resources_count',
        align: 'center',
      },
      {
        text: 'Promedio de visualizacion',
        value: 'resource_type_use_percentage',
        align: 'center',
        width:350
      },
      { text: '', value: 'view', sortable: false,width:25 }
    ],
      headerProps: {
      sortByText: "Ordenar tabla",
    },
  })
}
</script>

