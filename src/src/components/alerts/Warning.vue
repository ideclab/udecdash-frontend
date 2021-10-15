<template>
  <v-container fill-height align="center" justify="center">
    <v-row align="center" justify="center" no-gutters>
      <v-col align="center" cols="12">
        <img :src="require(`@/assets/img/Error.svg`)" width="50" />
      </v-col>
      <v-col align="center" cols="12">
        <span class=" message" v-text="information['message']">
        </span>
      </v-col>
      <v-col align="center" cols="12" class="mt-6">
        <v-btn  outlined class="mt-2 back"  rounded  @click="back()">
        Volver a mis cursos
          <v-icon class="pl-4">
            mdi-reload
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Warning",
  props: {
    information: {
      default: {
        message: "",
        status: "",
        btn:"Volver"
      },
    },
  },
  methods:{
    back(){
        this.$router.push({ name: 'CourseList'})
    }
  }
};
</script>
<style lang="scss" scoped>

.back{
  font-size: 1rem;
    text-transform: capitalize;
    font-family: "OpenSans", "Lato", "Roboto";
    font-weight: bold;
      color: #38b9d1;
      border:2px #38b9d1 solid;
    
}
.message{
      text-transform: capitalize;
    font-family: "OpenSans", "Lato", "Roboto";
    font-weight: bold;
  font-size: 1rem;
}
</style>
