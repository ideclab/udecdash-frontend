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
        <help :report="{name:'file_type_usage', level:'first'}" />
        <download :report="{name:'file_type_usage', level:'first'}" :data="file_type_usage" />
      </v-col>
    </v-row>
        <v-data-table
          :headers="headers"
           :search="search"
          :items="file_type_usage"
          :header-props="headerProps" hide-default-footer class="has_depth">
        >
          <template v-slot:[`item.name`]="{ item }">
              <div v-text="item.name" ></div>
          </template>
          <template v-slot:[`item.file_count`]="{ item }">
            <span v-text="item.file_count" ></span>
          </template>
          <template v-slot:[`item.downloads_count`]="{ item }">
            <span  v-text="item.downloads_count" ></span>
          </template>
          <template v-slot:[`item.file_type_usage_percentage`]="{ item }">
          <progress-linear
          :percentage="item.file_type_usage_percentage"></progress-linear>
          </template>
          <template v-slot:[`item.view`]="{ item }" justify="end">
           <navigation-button 
            :NavigationRoute="{ name: 'file_type_usage_second', params: {  type: item.name}}"/>
          </template>
        </v-data-table>
           <h5 class="py-5">
      Diversidad en el tipo de archivo
    </h5>
    <v-row>
      <v-col cols=6  sm=4 md=3  v-for="item in file_type_usage" :key="item.name">
        <visualization-card :name="item.name" :percentage="item.file_percentage" :NavigationRoute="{ name: 'file_type_usage_second', params: {  type: item.name}}"></visualization-card>
      </v-col>
    </v-row>
    </template>
    <template v-else>
      <warning :information="warning"></warning>
    </template>
  </div>
</template>
<script>
import "jspdf-autotable";
import Log from "@/models/log";
import VisualizationCard from '@/components/reports/VisualizationCard.vue';

export default {
  components: { VisualizationCard },
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
      log.setReport(log.FILE_TYPE_USAGE);
      log.setDeep(log.FIRST_LEVEL);
      log.add();
      log.enable();
    },

    startReport() {
      let type_files = [];
      for (let element in this.information) {
        type_files.push({ name: element });
      }
      type_files.map((item) => {
        item["resources"] = this.information[item.name]["resources"];
        item["file_percentage"] = this.information[item.name]["file_percentage"];
        item["file_count"] = this.information[item.name]["file_count"];
        item["downloads_count"] = this.information[item.name]["downloads_count"];
        item["file_type_usage_percentage"] =this.information[item.name]["resource_type_usage_percentage"];
      });
      if (Object.entries(type_files).length != 0) {
        this.file_type_usage = type_files;
      } else {
        this.warning["message"] = "No se han detectado recursos en el curso";
        this.no_problem = false;
      }
    },

    iconTypeFile(type) {
      if (type == "Documento") return " mdi-file-outline";
      else if (type == "Imagen") return " mdi-file-image-outline";
      else if (type == "Audio") return " mdi-file-music-outline";
      else if (type == "Video") return " mdi-file-video-outline";
      else if (type == "Texto") return " mdi-file-document-outline";
      else if (type == "Archivo comprimido") return " mdi-zip-box-outline";
      else return " mdi-file-question-outline";
    },
  },
  data: () => ({
    loader: true,
    no_problem: true,
    search:'',
    warning:{},
    current_course: null,
    message: null,
    file_type_usage: [],
    title_card: "Proporción de los tipos de archivo",
    title_table: "Visualización de los tipos de archivo",
    files: [],
    query: [],
    headers: [
      {
        text: "Tipos de archivos",
        value: "name",
        sortable: false,
      },
      {
        text: "Archivos existentes",
        value: "file_count",
        align: "center",
      },
      {
        text: "Descargas",
        value: "downloads_count",
        align: "center",
        
      },
      {
        text: "Promedio de visualizacion",
        value: "file_type_usage_percentage",
        align: "center",
        width:350
        
      },
      { text: "", value: "view", sortable: false,width:25},
    ],
        headerProps: {
      sortByText: "Ordenar tabla",
    },
  }),
};
</script>
