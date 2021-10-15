<template>
  <v-dialog persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" class="mt-2 upgrade" outlined rounded block>
        Actualizar
        <icon-base width="25" height="25" icon-name="upgrade" class="d-none d-md-flex pl-1">
          <icon-upgrade />
        </icon-base>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card class="mx-auto">
        <v-sheet height="100%" tile rounded class="py-3 px-3">
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" justify="center" align="center">
              <icon-base width="50" height="50" icon-name="upgrade" color="#d8ab3a">
                <icon-upgrade />
              </icon-base>
            </v-col>
            <v-col cols="12" justify="center" align="center">
              <span class="question"
                >¿Realmente desea actualizar este curso?</span
              >
            </v-col>
            <v-col cols="12" justify="center" align="center">
              <span class="name">{{ name }}</span>
            </v-col>
          </v-row>
        </v-sheet>
        <v-card-actions class="action_btn">
          <v-spacer />
          <v-btn outlined class="mt-2 cancel px-5" rounded @click="dialog.value = false">
            Cancelar
            <v-icon class="icon-cancel"> mdi-cancel </v-icon>
          </v-btn>
          <v-btn class="accept mt-2 px-8" outlined
            rounded  @click="startUpdate();dialog.value = false;">
            Aceptar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    startUpdate() {
      if (status != "PENDING") {
        this.$emit("update", true);
      }
    },
  },
};
</script>
<style lang="scss" >
.upgrade {
  .theme--light.v-btn:focus::before {
    opacity: 0;
  }
}
</style>
<style lang="scss" scoped>
.upgrade {
  &.v-btn {
    text-transform: capitalize;
    font-family: "OpenSans", "Lato", "Roboto";
    font-weight: bold;
    border: 2px solid #878787 !important;
    color: #878787;
    &.theme--light.v-btn:hover {
      background: #878787 !important;
      opacity: 1;
      color: white;
    }
  }
}
.action_btn {
  .v-btn {
    text-transform: capitalize;
    font-family: "OpenSans", "Lato", "Roboto";
    font-weight: bold;
    &.cancel {
      color: #6e6e6e;
      border: 2px #6e6e6e solid;
      &.theme--light.v-btn:hover {
        background: #6e6e6e !important;
        opacity: 1;
        color: white;
      }
      .icon-cancel{
        font-size: 1.2rem !important;
      }
    }
    &.accept {
      color: #38b9d1;
      border: 2px #38b9d1 solid;
      &.theme--light.v-btn:hover {
        background: #38b9d1 !important;
        opacity: 1;
        color: white;
      }
    }
  }
}

.question {
  font-family: "Lato", "Roboto";
  font-weight: bold;
  font-size: 1rem;
  color: #565655;
}
.name {
  font-family: "OpenSans", "Lato", "Roboto";
  font-weight: 400;
  font-size: 0.8rem;
  color: #6e6e6e;
  font-style: italic;
}
</style>