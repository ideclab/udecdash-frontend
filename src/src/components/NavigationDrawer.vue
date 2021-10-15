<template>
<v-layout>
  <v-flex>
    <v-app-bar color="transparent" flat app clipped-left>
        <v-icon color="#ef9c1a" @click="drawer = !drawer">fas fa-bars</v-icon>
        <v-img  :src="require('@/assets/img/logo.png')" max-width="150" max-height="50" class="d-none d-md-flex ml-3"/>
        <v-img  :src="require('@/assets/img/idecdash.png')" max-width="20" max-height="50" class="d-flex d-md-none d-ms-flex ml-3"/>
        <v-layout class="course_name_container px-12 hidden-sm-and-down">
          <span v-if="hasPeriod()" class="period" v-html="getPeriod()"></span>
          <span v-text="getCourseName()" class="name text-truncate"></span>
        </v-layout>
        <v-spacer></v-spacer>
        <v-select  class="mt-1 pt-3 pl-sm-5 pr-sm-4 sections-selector" id="v-step-1"
          :items="selectorItems" item-text="name" :item-value="id" v-model="current_select"
          @change="saveEvent($event)" append-icon="mdi-chevron-down" background-color="#f6f6f6"
          color="#575756" :rounded="true" :dense="true" item-color="#575756"
          prepend-inner-icon="mdi-calendar-account-outline" :flat="true"
          :menu-props="{ contentClass: 'section-selector-container' }">
            <template v-slot:item="{item}">
              <span v-text="item.name" class="section-selector-item"></span>
            </template>
          </v-select>
          <v-divider vertical inset class="mx-2"></v-divider>
          <v-icon color="#38b9d1" size="30" @click="back"  id="v-step-2">
            mdi-book-open-variant
          </v-icon>
          <v-divider vertical inset class="mx-2"></v-divider>
         <exit/>
    </v-app-bar>
  </v-flex>
    <v-navigation-drawer v-model="drawer" clipped app floating :width="220" class="pt-5">
        <v-img  :src="require('@/assets/img/Logo_azul.svg')" max-width="150" max-height="50" class="d-flex d-md-none ml-10"/>
      <v-list id="v-step-0">
          <router-link v-for="item in items_menu" :key="item.title" :to="{name:item.route}">
            <v-list-item class="px-2">
            <span :class="['menu-item px-4 mb-1', {'selected-menu-item' : isCurrentRoute(item.name)}]"
            v-text="item.title"></span>
            </v-list-item>
          </router-link>
      </v-list>
    </v-navigation-drawer>
</v-layout>
</template>

<script>
import Authentication from '@/models/authentication'
import Exit from "@/components/modals/Exit.vue";
export default {
  components: { Exit},

  name: 'NavigatorDrawer',
  props: ['selectorItems', 'selectorLabel'],
  created() {
    this.initData()
  },
  methods: {
    initData() {
      let current_course = this.$route.params.course_id
        this.id = 'canvas_id'
        this.current_select = this.selectorItems.find(
          section => section.canvas_id == localStorage.getItem(current_course)
        )
    },
    back(){
        this.$router.push({ name: 'CourseList'})
    },
    getUdecFormat(){
      let format = null
      if(typeof(this.$COURSE) != 'undefined' && typeof(this.$COURSE.udec_format) != 'undefined'){
        format = this.$COURSE.udec_format
      }
      return format
    },

    hasPeriod(){
      let udec_format = this.getUdecFormat()
      return udec_format != null && udec_format.period != null
    },

    getPeriod(){
      let period = null
      let udec_format = this.getUdecFormat()
      if(udec_format != null){
        period = udec_format.period + ' -&nbsp'
      }
      return period
    },

    getCourseName(){
      let course_name = null
      let udec_format = this.getUdecFormat()
      if(udec_format != null){
        course_name = udec_format.name
      }
      return course_name
    },

    isSemetestersContext() {
      return this.selectorLabel == 'Semestres'
    },

    isSectionsContext() {
      return this.selectorLabel == 'Secciones'
    },

    isCurrentRoute(name){
      return name == this.$route.meta.breadcrumb[0].value
    },

    saveEvent(event) {
      this.$emit('updatingSelector', event) // 1. Emitting
    },
    singOf() {
       let authentication = new Authentication()
      authentication.destroy(200)
      this.$router.push('/')
    }
  },
  data: () => ({
    drawer: null,
    background_img: 'background_bar.png',
    current_select: null,
    selected_item: 0,
    id: '',
    items_menu: [
      {
        route: 'module_visualization_first',
        name: 'module_visualization',
        title: 'Visualización por modulo'
      },
      {
        route: 'resource_type_usage_first',
        name: 'resource_type_usage',
        title: 'Visualización por tipo de recurso '
      },
      {
        route: 'file_type_usage_first',
        name: 'file_type_usage',
        title: 'Visualización por tipo de archivos '
      },
      {
        route: 'interaction_by_resource_first',
        name: 'interaction_by_resource',
        title: 'Interacción por recurso'
      },
      {
        route: 'resource_visualization_first',
        name: 'resource_visualization',
        title: 'Visualización de recursos '
      },
      {
        route: 'course_communication_first',
        name: 'course_communication',
        title: 'Comunicación del curso'
      },
      {
        route: 'evaluation_panic_first',
        name: 'evaluation_panic',
        title: 'Pánico de evaluación'
      },
      {
        route: 'course_interaction_first',
        name: 'course_interaction',
        title: 'Interacciones del curso'
      }
    ]
  })
}
</script>
<style lang="scss" scoped>
.v-divider{
  border:1px white solid; 
  background: white;
  max-height: calc(100% - 30px);
  margin-top:15px;
}
*:not(.v-icon) {
  font-family: "Lato", "Roboto", "sans-serif";
  font-weight: bold;
  font-size: .9rem;
}

a{
  text-decoration: none !important;
}

.v-icon.v-icon::after{
  opacity: 0 !important;
}

.sections-selector{
  max-width: 250px;
  font-family: "Lato", "Roboto", "sans-serif" !important;
  @media only screen and (max-width: 600px) {
      max-width: 180px
  }
}

.v-select-list{
  background: #EDEDED;
  padding: 0px;
}

.v-navigation-drawer {
  background: transparent !important;
    @media only screen and (max-width: 1263px) {
  background: white !important;
    }
}

.menu-item {
  min-height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  color: white !important;
  border: 2px solid transparent;
  border-radius: 50px;
  &:hover{
    border: 2px solid #736233;
  }
  @media only screen and (max-width: 1263px) {
  color: black !important;
    }
}

.selected-menu-item {
  color: #ef9c1a !important;
  border: 2px solid #ef9c1a !important;
}

.course_name_container{
  text-transform: uppercase;
  .period {
    color: #a0a4a6;
    font-size: 1rem;
    white-space: nowrap;
  }
  .name{
    color: white;
    font-size: 1rem;
  }
}
</style>

<style lang="scss">
.sections-selector.v-select{
  &.v-text-field--rounded > .v-input__control > .v-input__slot {
    font-family: "Lato", "Roboto", "sans-serif" !important;
    font-size: 1rem;
    padding: 0 10px !important;
  }
}

.section-selector-container{
  box-shadow: none !important;
  .v-select-list{
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
    background: #EDEDED;
    overflow: hidden;
    &:hover{
      background: #DADADA !important;
    }
  }
  .v-list-item--link:before{
    background-color: transparent !important;
  }
}
</style>


