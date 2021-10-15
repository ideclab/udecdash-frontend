<template>
  <v-card height="190" elevation="0">
    <div class="d-flex flex-column">
      <div class="d-flex justify-space-around px-16 details">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="icon_details" size="25">
              mdi-code-tags
            </v-icon>
          </template>
          <span>Codigo del curso</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <icon-base class="icon_details" width="50" height="26" viewBox="0 0 24 17.82" >
                <icon-section />
              </icon-base>
            </div>
          </template>
          <span>Secciones</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <icon-base class="icon_details" width="50" height="26" viewBox="0 0 24 21.82" >
                <icon-calendar />
              </icon-base>
            </div>
          </template>
          <span>Periodo</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <icon-base class="icon_details" width="50" height="26" viewBox="0 0 24 21.82" >
                <icon-calendar-year />
              </icon-base>
            </div>
          </template>
          <span>Año</span>
        </v-tooltip>
      </div>
      <div class="d-flex justify-center align-center name_container">
        <h4 class="title_course">1234-2 Curso de demostración</h4>
      </div>
      <v-divider color="#878787"></v-divider>
      <div class="d-flex flex-row justify-center pt-2 actualization">
        <v-icon class="NEVER_UPDATED" color="#878787">mdi-update</v-icon>
        <i><p class="mb-0">Actualización pendiente</p></i>
      </div>
      <v-row no-gutters justify="center" class="interaction">
        <v-spacer></v-spacer>
        <v-col cols="6" sm="6" md="5" lg="4" class="upgrade">
          <v-btn class="mt-2 upgrade" outlined rounded block>
            Actualizar
            <icon-base width="25" height="25" icon-name="upgrade" class="d-none d-md-flex">
              <icon-upgrade />
            </icon-base>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" sm="4" md="5" lg="4" class="go">
          <v-btn outlined block class="mt-2" rounded>
            Entrar
            <icon-base width="20" height="25" icon-name="access" class="d-none d-md-flex">
              <icon-access />
            </icon-base>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import IconCalendarYear from "@/components/icons/IconCalendarYear.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconSection from "@/components/icons/IconSection.vue";
export default {
  components: { IconCalendarYear, IconCalendar, IconSection },

  data: () => ({
    udec_format: {
      course_code: "1234-2",
      name: "nombre corto",
      period: "1",
      sections: [1, 2],
      year: "2021",
    },
  }),
};
</script>
<style lang="scss">
.go {
  .v-btn {
    &.theme--light.v-btn:focus::before {
      opacity: 0;
    }
  }
}
.v-ripple__container {
  display: none !important;
}
</style>
<style lang="scss" scoped>
.details {
  background: #f5f5f5;
    border-top-left-radius: 30px !important;
  border-top-right-radius: 30px !important;
  .icon_details {
    border-radius: 20px;
    color: #6e6e6e;

    padding: 1px 14px;
    &:hover {
      padding: 3px 14px;
      background: #6e6e6e;
      color: white;
    }
  }
}
.theme--light.v-divider {
  border-color: transparent !important;
}
.PENDING {
  font-size: 15px;
}
.v-card {
  border-radius: 20px;
  border: 2px #c6c6c6 solid;
  background: linear-gradient(
    80deg,
    rgb(253, 253, 253) 0%,
    rgb(240, 240, 240) 50%
  );
  hr {
    width: 100%;
    border-width: 2px;
  }
  .name_container {
    padding: 5px;
    width: 100%;
    height: 58px;
    background: #ffffff;
    .title_course {
      font-family: "Lato", "Roboto";
      font-weight: bold;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .actualization {
    color: #575756;
    font-size: 12px;
    font-family: "OpenSans", "Lato", "Roboto";
    font-weight: 400;
    .date {
      font-weight: 600;
    }
  }
  .interaction {
    .v-btn {
      text-transform: capitalize;
      font-family: "OpenSans", "Lato", "Roboto";
      font-weight: bold;
    }
    .upgrade {
      .v-btn {
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
    .go {
      .v-btn {
        border: 2px solid rgba(59, 186, 210, 0.3);
        color: rgba(59, 186, 210, 0.3);
        &.active {
          border: 2px solid rgba(59, 186, 210, 1);
          color: rgba(59, 186, 210, 1);
          &.theme--light.v-btn:hover {
            background: #3bbad2 !important;
            opacity: 1;
            color: white !important;
          }
        }
      }
    }
  }
}
</style>
