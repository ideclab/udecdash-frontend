<template>
  <v-dialog persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <a class="d-flex mr-4" v-bind="attrs" v-on="on" id="v-step-3">
        <icon-base width="25" height="25" icon-color="#e2231a" >
          <icon-exit />
        </icon-base>
      </a>
    </template>
    <template v-slot:default="dialog">
      <v-card class="mx-auto">
        <v-sheet height="100%" tile rounded class="pt-10 pb-3 px-3">
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" justify="center" align="center">
              <span class="question">¿Realmente desea salir de la plataforma?</span>
            </v-col>
          </v-row>
        </v-sheet>
        <v-card-actions class="action_btn">
          <v-spacer />
          <v-btn outlined class="mt-2 cancel px-5" rounded @click="dialog.value = false">
            Cancelar
            <v-icon class="pl-1" > mdi-cancel </v-icon>
          </v-btn>
          <v-btn class="exit mt-2 px-8" outlined rounded @click="singOf()">
            salir
            <icon-base width="20" height="20"  class="pl-1">
              <icon-exit />
            </icon-base>
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import Authentication from "@/models/authentication";
export default {
  methods: {
    singOf() {
      let authentication = new Authentication();
      authentication.destroy(200);
      this.$router.push({name:'login'});
    },
  },
};
</script>
<style lang="scss" scoped>
.question {
  font-family: "Lato", "Roboto";
  font-weight: bold;
  color: #565655;
}
.action_btn {
  font-family: "Lato", "Roboto";
  .v-icon{
    font-size: 1.2rem;

  }
  &.theme--light.v-btn:hover {
    opacity: 1 !important;
  }
  .cancel {
    text-transform: capitalize !important;
    font-weight: bold;
    color: #6e6e6e;
    border: 2px #6e6e6e solid;
    &.theme--light.v-btn:hover {
      background: #6e6e6e !important;
      opacity: 1;
      color: white;
    }
  }
  .exit {
    text-transform: capitalize !important;
    font-weight: bold;
    color: #bc444a;
    border: 2px #bc444a solid;
    &.theme--light.v-btn:hover {
      background: #bc444a !important;
      opacity: 1;
      color: white;
    }
  }
}
</style>