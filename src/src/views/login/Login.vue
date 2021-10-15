<template>
  <div class="d-flex flex-column justify-space-between" id="login">
    <v-snackbar :timeout="5000" top color="white" black v-model="alert">
      <div class="d-flex alert align-center">
        <img :src="require(`@/assets/img/Error.svg`)" width="40" />
        <v-divider vertical> </v-divider>
        <strong class="gray--text"
          >{{message_error}}</strong
        >.
      </div>
    </v-snackbar>
    <div></div>
    <div class="text-center">
      <v-img :src="require('@/assets/img/logo.png')" class="logo mx-auto" />
      <h3 class="text-center pb-5 login--text">
        <b>¡</b>Bienvenido a <b>UDECDASH!</b>, una
        plataforma <br />para visualizar reportes relacionados con Canvas LMS
      </h3>
      <v-btn @click="login" outlined dark rounded>
        <v-icon left class="mr-4 icon-account" large>mdi-account</v-icon>
        Acceder
      </v-btn>
    </div>
    <div>
      <v-row justify-center align-center>
        <v-col cols="4" lg="3"
          ><v-img :src="require('@/assets/img/udec_blanco.png')" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" lg="3">
          <v-img :src="require('@/assets/img/dirdoc_blanco.png')" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" lg="3">
          <v-img :src="require('@/assets/img/ideclab_blanco.png')" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  mounted: function () {
    this.initLogin(),
    this.initTour()
  },
  methods: {
        initTour() {
      if (this.$tours["myTour"]) {
        this.$tours["myTour"].stop();
      }
    },
    initLogin() {
      if(localStorage.error_code != 'null' & localStorage.error_code != '200' ){
        switch (localStorage.error_code) {
          case '401':
            this.message_error = "Su sesión ha expirado, por favor vuelva a intentar";
            break;
          case '404':
         this.message_error = "No se ha encontrado el usuario, por favor vuelva a intentar ";
            break;
          case '1':
            this.message_error = "Permiso rechazado, por favor vuelva a intentar";
            break;
          case '2':
            this.message_error = "Su sesión ha expirado, por favor vuelva a intentar";
            break;
          case '3':
            this.message_error = "Su sesión ha expirado, por favor vuelva a intentar";
            break;
          case '4':
            this.message_error = "No se ha encontrado el usuario, por favor vuelva a intentar";
            break;    
          case '5':
            this.message_error = "Para poder ingresar debe ser profesor";
            break;                              
          default:
            break;
        }
        this.alert = true;
        localStorage.setItem("error_code", null);
      }
    },
    login() {
      let url = `${this.$CANVAS_LOGIN_URL}auth?client_id=${this.$CLIENT_ID}&response_type=code&redirect_uri=${this.$URL_BACKEND}/canvas/check_permission`;
      window.location.replace(url);
    },
  },
  data: () => ({
    alert: false,
    message_error: null,
  }),
};
</script>
<style lang="scss">
#login {
  .v-snack__wrapper.v-sheet.theme--dark {
    border: 3px solid #c5c5c5 !important;
    border-radius: 15px;
  }
}
</style>
<style lang="scss" scoped>
* {
  font-family: "OpenSans", "Lato", "Roboto";
  font-weight: 400;
  .login--text {
    color: #b2b2b2;
  }

  b {
    color: white;

    font-weight: bold;
  }
  button {
    font-weight: bold;
    text-transform: capitalize;
    border: 3px solid;
  }
  .logo {
    max-width: 20rem;
  }
  .icon-account{
    font-size: 1.5rem !important;
  }
  .alert {
    .gray--text {
      color: #706e6e;
    }
    hr {
      border: 1px solid #706e6e;
      margin: 0 10px;
    }
    .icon_error {
      border-radius: 100%;
      font-size: 1.5rem;
      color: #d04545;
      font-family: "Lato", "Roboto";
      font-weight: bold;
      padding: 1% 2%;
      border: 3px solid #d04545;
    }
  }
}
</style>
