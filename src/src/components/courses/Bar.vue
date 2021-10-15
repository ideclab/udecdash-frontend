<template>
  <v-app-bar color="transparent" elevation="0">
    <v-img :src="require('@/assets/img/logo.png')" max-width="150" max-height="50" class="ml-6 mr-3 mr-sm-5 d-none d-md-flex" />
    <v-img  :src="require('@/assets/img/idecdash.png')" max-width="25" max-height="50" class="d-flex d-md-none d-ms-flex ml-2 mr-3 mr-sm-5"/>
    <v-divider color="#f69f19" vertical inset></v-divider>
    <div class="d-none d-sm-flex flex-column align-left no-line pl-3 pl-sm-5 ">
      <h4 class="new_text_color--orange lato lato--black">¡Hola!</h4>
      <div class="d-flex ">
        <h4 class="white--text pr-3 lato lato--black" v-text="name"></h4>
      </div>
    </div>
    <v-spacer></v-spacer>
    <h4 class="white--text lato lato--bold d-none d-md-flex">MIS CURSOS</h4>
    <v-select class="mt-1 pt-3 pl-sm-5 pr-sm-4 semester-selector" :items="semesters" item-text="name" :item-value="id" v-model="current_select"
     @change="saveEvent($event)" append-icon="mdi-chevron-down" background-color="#f6f6f6"
     color="#575756" :rounded="true" :dense="true" item-color="#575756"
      prepend-inner-icon="mdi-calendar-account-outline" :flat="true"
       :menu-props="{ contentClass: 'semester-selector-container' }"
    >
      <template v-slot:item="{ item }">
        <span v-text="item.name" class="semester-selector-item"></span>
      </template>
    </v-select>
      <v-divider vertical inset class="mx-2  hr-exit"></v-divider>
          <v-icon color="#c4c4c4" size="30" @click="help()"  class="help">
            mdi-help-circle-outline
          </v-icon>
     <v-divider vertical inset class="mx-2 hr-exit"></v-divider>

   <exit class="pl-4" />
  </v-app-bar>
</template>
<script>
import Authentication from "@/models/authentication";
import Webservice from "@/models/webservice";
import Exit from "@/components/modals/Exit.vue";

export default {
  components: { Exit},
  created() {
    this.initData();
  },
  props: {
    semesters: {
      type: Array
    }
  },
  methods: {
    initData() {
      let user = JSON.parse(localStorage.udecdash_user);
      this.name = user["name"];
      this.id = "id";
      this.current_select = this.semesters.find(
        semester => semester.id == localStorage.getItem("udecdash_semester")
      );
    },
    saveEvent(event) {
      this.$emit("updatingSemesters", event); // 1. Emitting
    },
    singOf() {
      let authentication = new Authentication();
      authentication.destroy(200);
      this.$router.push("/");
    },
    help(){
      let webservice = new Webservice();
      webservice.reset_tutorial().then(response=>{
        if(response.data.reseted){
          localStorage.removeItem('udecdash_welcome')
          localStorage.removeItem('udecdash_tutorial')
          this.$emit("resetWelcome");
        } 
      })
    }
  },
  data: () => ({
    name: "Profesor",
    id: ""
  })
};
</script>
<style scoped lang="scss">
.help{
  &.theme--light.v-icon:focus::after{
    opacity: 0;
  }
}
.hr-exit{
  border:1px white solid; 
  background: white;
  max-height: calc(100% - 30px);
  margin-top:15px;
}
.lato{
  font-family: Lato, "Roboto", "sans-serif" !important;
   &--bold{
     font-weight: bold;
   }
      &--black{
     font-weight: 900;
   }
}

.openSans{
   font-family: OpenSans, "Roboto", "sans-serif" !important;
   &--bold{
     font-weight: bold;
   }
}
.new_text_color {
  &--orange {
    color: #f69f19;
  }
  &--red {
    color: #e2231a;
  }
    &--gray {
    color: #706f6f;
  }
}
hr {
  border-width: 1px;
  &.theme--light.v-divider {
    border-color: transparent !important;
  }
}

.no-line {
  line-height: 1.2;
}
.semester-selector {
  max-width: 250px;
  font-family: Lato, "Roboto", "sans-serif" !important;
  font-weight: 400!important;
  @media only screen and (max-width: 600px) {
      max-width: 170px
  }
}
a {
  text-decoration: none;
}
.v-select-list{
  background: #EDEDED;
  padding: 0px;
}
</style>
<style lang="scss">
.semester-selector.v-select {
  &.v-text-field--rounded > .v-input__control > .v-input__slot {
  font-family: Lato, "Roboto", "sans-serif" !important;
  font-weight: 400 !important;
    font-size: 1rem;
    padding: 0 10px !important;
  }
}

.semester-selector-container {
  box-shadow: none !important;
  .v-select-list {
    border-radius: 10px !important;
  }
  .v-list--dense .v-list-item {
    color: #575756 !important;
    min-height: 26px !important;
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
</style>
