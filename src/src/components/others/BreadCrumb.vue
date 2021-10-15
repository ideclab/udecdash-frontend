<template>
  <ul class="breadcrumb d-flex" >
    <li id="v-step-6" class="d-none d-sm-flex"><router-link :to="{name: 'CourseList'}" outlined small>Mis cursos</router-link></li>
    <li class="d-sm-none"><router-link :to="{name: 'CourseList'}" outlined small><v-icon dark class="position_icon">mdi-home-outline</v-icon></router-link></li>
    <li v-for="(breadcrumb, deep) in breadCrumbList" :key="deep" @click="routeTo(deep)"
      :class="{'active': isActive(deep)}"> <span class="d-none d-sm-flex"  v-text="breadcrumb.name"></span> <span class="d-sm-none" v-text="breadcrumb.abr"></span></li>
  </ul>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: ['breadCrumbList', 'title'],
  data: () => ({}),
  methods: {
    isActive(deep){
      return this.breadCrumbList.length == (deep + 1)
    },
    routeTo(deep) {
      if (this.breadCrumbList[deep].link)
        this.$router.push({ name: this.breadCrumbList[deep].link })
    },
    formatReportName(name) {
      if (name == 'module_visualization') return 'Visualización por modulo'
      else if (name == 'resource_type_usage') return 'Visualización por tipo de recurso'
      else if (name == 'file_type_usage') return 'Visualización por tipo de archivos'
      else if (name == 'interaction_by_resource') return 'Interacción por recurso'
      else if (name == 'resource_visualization') return 'Visualización de recursos'
      else if (name == 'course_communication') return 'Comunicación del curso'
      else if (name == 'evaluation_panic') return 'Pánico de evaluación'
      else if (name == 'course_interaction') return 'Interacciones del curso'
      else return 'Otros'
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  height: 30px;
  width: 100%;
  list-style: none !important;
  display: flex !important;
  align-items: center;
  background: #575756;
  border-radius: 15px 15px 0 0;
  color: white;
  li {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
     font-family: "Lato", "Roboto", "sans-serif";
    font-weight: 400;
    .position_icon{
      padding-bottom: 4px;
    }
    &:not(:last-child)::after {
      font-family: "Material Design Icons" !important;
      content: "\F0142";
      font-size: 1.3rem;
      color: white;
      cursor: default;
    }
    &.active{
      color: orange !important;
      font-weight: bold;
    }
    &:hover, &>a:hover{
      color: #C6C6C6;
    }
  }
  a{
    color: white;
    text-decoration: none !important;
  }
}
</style>
