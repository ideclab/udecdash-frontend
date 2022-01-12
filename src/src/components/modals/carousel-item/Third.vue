<template>
  <v-carousel-item>
    <v-sheet  tile   rounded class="py-3 px-3">
      <v-row no-gutters justify="center" class="full-height" >
          <v-col cols="12" >
          <v-img :src="require('@/assets/img/Logo_azul.svg')" class="logo mx-auto " />
        </v-col>
        <v-col cols="12" md="11" class="py-3 pb-10">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" md="5">
          <v-img :src="require('@/assets/img/computer_show_report.png')" class="computer_logo mx-auto d-none d-md-flex" />
        </v-col>
        <v-col cols="12" md="6"  align="center"  >
            <p class="gray--text">
              Los reportes están conformados con diferentes niveles de granularidad. Comienzan con una vista general del grupo de curso seleccionado, hasta llegar al detalle de cada estudiante y/o recursos (dependiendo del reporte), todo con una cantidad ínfima de
               clics y un nivel de profundización contextual en la información según tus necesidades.
            </p>
        </v-col>
      </v-row>
    </v-sheet>
  </v-carousel-item>
</template>
<script>

export default {
  
}
</script>
<style lang="scss" scoped>
.full-height{
  height:75%;
}
hr {
  border: 1px solid #f49e16;
  background: #f49e16;
}
.gray--text{
    color:#706e6e;
}
.logo {
  max-width: 16rem;
  max-height: 60px;
}
.computer_logo{
   max-width: 15rem;
}
.course_card {
  border-radius: 20px;
  border: 2px #c6c6c6 solid;
  background: linear-gradient(
    80deg,
    rgb(255, 255, 255) 0%,
    rgb(219, 219, 219) 50%
  );
  hr {
    width: 100%;
    border-width: 2px;
  }
  .name_container {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 5px;
    width: 100%;
    height: 58px;
    background: #ededed;
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
        cursor: default;
        border: 2px solid transparent !important;
        color: #878787;
        &.theme--light.v-btn:hover {
          opacity: 1;
        }
        &.theme--light.v-btn:focus::before {
          opacity: 0;
        }
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid #d8ab3a;
          border-radius: 40px;
          animation: latido linear 1s infinite;
        }
        &::after {
          animation-delay: 0.5s;
        }
      }
      @keyframes latido {
        0% {
          width: 100%;
          height: 120%;
          border: 2px solid #d8ab3a;
        }
        100% {
          width: 110%;
          height: 140%;
          border: 2 solid transparent;
        }
      }
    }
    .go {
      .v-btn {
        cursor: default;
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