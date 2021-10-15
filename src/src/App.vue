<template>
  <v-app>
    <v-tour
      name="myTour"
      id="report_tour"
      :steps="steps"
      :options="myOptions"
      :callbacks="myCallbacks"
    ></v-tour>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Webservice from "@/models/webservice";
export default {
  name: "App",
  data: () => ({
    myCallbacks: {
      onSkip: function () {
        let webservice = new Webservice();
        webservice.set_tutorial({ identifier: "REPORTS_LAYOUT" });
        localStorage.setItem("udecdash_tutorial", false);
      },
      onFinish: function () {
        let webservice = new Webservice();
        webservice.set_tutorial({ identifier: "REPORTS_LAYOUT" });
        localStorage.setItem("udecdash_tutorial", false);
      },
    },
    myOptions: {
      useKeyboardNavigation: true,
      labels: {
        buttonSkip: "Omitir recorrido",
        buttonPrevious: "Previo",
        buttonNext: "Siguiente",
        buttonStop: "Finalizar",
      },
    },
    steps: [
      {
        target: "#v-step-0",
        content:
          "<p class='mb-1'> Menú de navegación</p> <span>Proporciona un acceso rápido a los diferentes reportes disponibles.</span>",
        params: {
          placement: "right",
        },
      },
      {
        target: "#v-step-1",
        content:
          "<p class='mb-1'> Selector de secciones</p><span>Aquí podrás elegir la sección del curso de la cual quieres ver los reportes.</span>",
      },
      {
        target: "#v-step-2",
        content: "<p class='mb-1'>Volver a mis cursos</p> <span>Aquí se podra volver al listado de cursos.</span>",
      },
      {
        target: "#v-step-3",
        content: "<p class='mb-1'>Salir</p><span>Este boton sirve para cerrar sesión</span>",
        params: {
          placement: "bottom",
        },
      },
      {
        target: "#v-step-4",
        content:
          "<p class='mb-1'>Información del reporte</p><span>Relata de forma general la construcción y objetivos del reporte.</span>",
        params: {
          placement: "top",
        },
      },
      {
        target: "#v-step-5",
        content:
          "<p class='mb-1'>Exportación</p><span>Descarga un documento PDF con la información que se está visualizando.</span>",
        params: {
          placement: "top",
        },
      },
      {
        target: "#v-step-6",
        content:
          "<p class='mb-1'>Miga de pan</p><span>Indica la ubicación actual y permite navegar entre ubicaciones anteriores.</span>",
        params: {
          placement: "bottom",
        },
      },
    ],
  }),
};
</script>
<style lang="scss">
html{
    overflow-y: auto !important;
}
#app {
  background-image: url("./assets/img/fondo.png");
  background-color: #11364a;
  min-width: 100vw;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  .filter {
  .v-input__control {
    .v-input__slot {
      background: #f6f6f6 !important;
      min-height: 26px !important;
      padding: 0 5px 0 5px;
      .v-input__prepend-inner {
        margin-top: 4px !important;
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      }
      .v-label.theme--light {
        font-size: .9rem;
        font-family: "Lato", "Roboto", "sans-serif";
        font-weight: 400;
        top: 4px;
      }
    }
  }
}
#report_tour{
  .v-step{
    max-width:450px;
   background: linear-gradient(
    80deg,
    rgb(253, 253, 253) 0%,
    rgb(238, 238, 238) 80%
  ) !important;
    color:black;
    border:1px solid #c5c5c5;
    border-radius:20px;
    .v-step__content{
      font-family: "Lato", "Roboto", "sans-serif" !important;
      p{
        font-weight: bold;
      }
      span{
        font-style: italic;
        font-size: .8rem;
      }
    }
    .v-step__buttons{
      button{
      text-transform: capitalize;
      font-family: "OpenSans", "Lato", "Roboto";
      font-weight: bold;
    border-radius: 20px;
    color: #878787;
    &:nth-child(1){
      color: #878787;
      padding: 3px 6px;
      border: 1px solid #878787 !important;
    }     
    &:hover {
      background: #878787 !important;
      opacity: 1;
      color: white;
    }
   &:nth-child(2){
      color: #878787;
      padding: 3px 6px;
      border: 1px solid #878787 ;
    }     
    &:hover {
      background: #878787 ;
      opacity: 1;
      color: white;
    }
    &:last-child{
      padding: 3px 40px !important;
      color: rgba(59, 186, 210, 1)!important;
      border: 1px solid rgba(59, 186, 210, 1) !important;
        &:hover {
        background: #3bbad2 !important;
        opacity: 1;
        color: white !important;
      }
        }
         }
      }
      .v-step__arrow{
        background:rgb(65, 188, 211);
      }
    }
  }
}


html{
  overflow-y: hidden !important;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #878787;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #878787;
    cursor: pointer !important;
  }

}
.select{
  max-width: 130px;
  font-family: "Lato", "Roboto", "sans-serif" !important;
  &.v-text-field--rounded > .v-input__control > .v-input__slot{
    padding: 0 10px !important;
  }
}
.select-container {
  padding: 0;
  background: transparent;
  box-shadow: none !important;
  .v-select-list{
    border-radius: 10px !important;
  }
  .v-list{
    padding: 0 !important;
    background: #ededed !important;
  }
  .v-list-item {
    font-family: "Lato", "Roboto", "sans-serif" !important;
    color: #575756 !important;
    min-height: 26px !important;
    height: auto;
    font-weight: normal !important;
    border-radius: 30px;
    margin: 0;
    padding: 0 10px !important;
    padding: 8px 0;
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
.v-dialog.v-dialog--active.v-dialog--persistent {
  border-radius: 15px !important;
  border: 2px solid #c5c5c5 !important;
  .theme--light.v-divider {
    border-color: transparent !important;
  }
}
</style>
