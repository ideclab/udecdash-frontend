<template>
  <v-card elevation="0">
     <router-link :to="NavigationRoute" >
    <div class="d-flex  flex-column flex-sm-row ">
      <div class=" d-flex align-center justify-center py-3 px-2 px-sm-2 px-lg-5">
         <v-progress-circular :rotate="-90" :size="70" :width="6" 
         :value='percentage' color="#f69f19">
      <img :src="require(`@/assets/img/${name}.svg`)" :width="img_width(name)"/>
    </v-progress-circular>
      </div>
      <div
        class=" d-flex flex-column align-center align-sm-start justify-center ">
        <p v-text="formatName(name)"></p>
        <p v-text="percentage + '%'"></p>
      </div>
    </div>
     </router-link>
  </v-card>
</template>

<script>
export default {
  props: {
    NavigationRoute:{
      default: {},
    },
    name: {
      type: String,
      default: "",
    },
    percentage: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    formatName(name) {
      if (name == "Assignment") return "Tareas";
      else if (name == "Attachment") return "Documentos";
      else if (name == "ContextExternalTool") return "Herramientas externas";
      else if (name == "DiscussionTopic") return "Foros de discusión";
      else if (name == "ExternalUrl") return "Url externas";
      else if (name == "Quiz") return "Evaluaciones";
      else if (name == "WikiPage") return "Páginas";
      else return name;
    },
        img_width(name) {
      if (name == "Assignment") return 30;
      else if (name == "Attachment")  return 20;
      else if (name == "Documento")  return 20;
      else if (name == "ContextExternalTool")  return 25;
      else if (name == "DiscussionTopic")  return 35;
      else if (name == "ExternalUrl") return 25;
      else if (name == "Quiz")  return 25;
      else if (name == "WikiPage")  return 25;
      else return   20;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card{
  a{
    text-decoration: none;
    color: black;
  }
 border: 2px #c6c6c6 solid;
  background: linear-gradient(
    45deg,
    rgb(255, 255, 255) 0%,
    rgb(240, 240, 240) 70%
  );
  border-radius: 15px !important;
  &:hover{
 border: 2px #f69f19 solid;

  }
}
p{
  margin-bottom: 0;
   font-family: "Lato", "Roboto", "sans-serif";
      font-weight: 400;
      line-height : 13px;
      font-size: 0.8rem;
}

</style>