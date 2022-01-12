<template>
  <div>
    <template v-if="(this.state == 'active') | (this.state == 'published')">
      <v-tooltip top color="#3C3C3B" >
        <template v-slot:activator="{ on, attrs }" >
          <div
            v-bind="attrs"
            v-on="on"
          >
          <div class="mr-3 d-none d-sm-flex resource_status_color green-border">
    
          </div>
          </div>
        </template>
        <span>{{type}}<br/> publicado</span>
      </v-tooltip>
    </template>
    <template v-else>
      <v-tooltip top color="#3C3C3B">
        <template v-slot:activator="{ on, attrs }">
          <div
            v-bind="attrs"
            v-on="on"
            
          >
          <div class="mr-3 d-none d-sm-flex resource_status_color gray-border"></div>
          </div>
        </template>
        <span>{{type}} <br/> no publicado</span>
      </v-tooltip>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      default: "Desactivado",
    },
    type:{
      default:'Módulo'
    }
  },
};
</script>
<style lang="scss" scoped>
.resource_status_color {
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

</style>
