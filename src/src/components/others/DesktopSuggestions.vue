<template>
  <div>
    <template v-if="!modal_suggestions">
      <div class="suggestions_btn">
        <v-btn dark  @click="modal_suggestions = !modal_suggestions">
          <span class="pr-1 mb-1">Contactanos </span>
          <v-icon size="20" class="help">mdi-message-question-outline </v-icon>
        </v-btn>
      </div>
    </template>
    <template v-else>
      <div class="suggestions_modal">
        <v-card width="300" elevation="0">

          <v-toolbar dark color="#f49f13" flat height="30">
            <v-toolbar-title> <h5>  Contactanos </h5></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-icon  color="#afaeb5" @click="close()" class="close" > mdi-window-close </v-icon>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="pt-3 pb-0">
            <v-form
              v-model="valid"
              lazy-validation
              ref="form"
              class="d-flex flex-column"
            >
              <div>
              <div class="pt-0 pb-3 suggestions_title">¿Que desea hacer?</div>

                <v-select
                  outlined
                  class="suggestions_select"
                  dense
                  :items="subject"
                  item-text="name"
                  item-value="value"
                  v-model="form.category"
                  placeholder="Seleccionar"
                  :rules="rules['category']"
                ></v-select>
              </div>
              <div class="pt-0 pb-3 suggestions_title">¿Cómo te podemos ayudar?</div>
              <div>
                <v-textarea
                  class="suggestions_description"
                  outlined
                  name="input-7-4"
                  label="Escribir ..."
                  v-model="form.description"
                  :rules="rules['description']"
                ></v-textarea>
              </div>
            </v-form>
            <v-progress-linear
            v-if="alert['progress']"
              indeterminate
              color="#3bbad2"
            ></v-progress-linear>
          <v-alert

            v-model="alert['active']"
            :color="alert['color']"
            border="left"
            elevation="0"
            dense
            colored-border
          >
            {{alert['message']}}
          </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="send px-4" outlined rounded @click="send()">
              Enviar
              <v-icon class="pl-2" small> mdi-send </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </template>
  </div>
</template>

<script>
import Webservice from "@/models/webservice";
import Bowser from "bowser";
export default {
  name: "DesktopSuggestions",
  data: () => ({
    alert:{
      progress:false,
      message:'',
      active:false,
      color:''
    },
    modal_suggestions: false,
    subject: [
      { name:"Enviar una sugerencia", value: "SUGGESTION" },
      { name: "Reportar un error", value: "ERROR" },
    ],
    valid: true,
    form: {
      category: "",
      description: "",
      tracker: null,
    },
    rules: {
      category: [(v) => !!v  || 'Seleccione el tipo de mensaje'],
      description: [
        v => !!v  || 'El mensaje es obligatorio',
        v => v.length >= 10 || 'El mensaje debe ser mayor a 10 caracteres'
      ],
    },
  }),
  methods: {
    close() {
      this.$refs.form.reset();
      this.format();
      this.alert['active']=false
      this.modal_suggestions = false;
    },
    async send() {
      this.alert['active']=false
      let browser = Bowser.getParser(navigator.userAgent);
      this.form["tracker"] = JSON.stringify({
        Name: browser.getBrowserName(),
        Version: browser.getBrowserVersion(),
        Platform: browser.getPlatform(),
      });
      if (this.$refs.form.validate()) {
        this.alert['progress']= true
        let data = JSON.parse(JSON.stringify(this.form));
        let webservice = new Webservice();
        await webservice.suggestions(data).then((response) => {
          console.log(response)
          if(response.status ==200){
            this.alert['message']='Su mensaje ha sido enviado'
            this.alert['color']='green'
            this.$refs.form.reset();
             this.format();
          }else{
            this.alert['message']='Su mensaje no ha podido ser enviado'
            this.alert['color']='#db4056'
          }
        this.alert['progress']= false
          this.alert['active']=true

        });
    
      }
    },
    format() {
      this.form.category = "";
      this.form.description = "";
      this.form.tracker = null;
    },
  },
};
</script>

<style lang="scss">
.suggestions_select {
  border-radius: 15px !important;
}
.suggestions_description {
  border-radius: 15px !important;
}
#desktopSuggestions {
    .close{
    position: fixed;
    right: -10px;
    top: -10px;
    border-radius: 100%;
    background: white;
border:2px solid #afaeb5;
  }
  position: fixed;
  bottom: 40px;
  left: 30px;
  z-index: 100;
  .suggestions_btn {
    .v-btn {
      border-radius: 20px;
      background: #f49f13;
      text-transform: capitalize;
      span {
        font-family: "OpenSans", "Lato", "Roboto";
        font-weight: 400;
        padding: 4px 0;
      }
    }
  }
  .v-list-item--dense .v-list-item__title,
  .v-list-item--dense .v-list-item__subtitle,
  .v-list--dense .v-list-item .v-list-item__title,
  .v-list--dense .v-list-item .v-list-item__subtitle {
    font-family: "Lato", "Roboto" !important;
    font-weight: 400 !important;
    color: #706f6f;
  }
  .suggestions_modal {
    .v-card{
      border-radius: 10px;
      border:1px #c5c5c5 solid;
    }
    font-family: "Lato", "Roboto";
    font-weight: bold;
    color: #706f6f;
    .v-text-field--outlined.v-input--dense .v-label {
      font-family: "Lato", "Roboto" !important;
      font-weight: 400 !important;
      color: #706f6f;
    }

    .suggestions_title {
      font-family: "Lato", "Roboto";
      font-weight: bold;
      color: #706f6f;
    }
    .send {
      text-transform: capitalize !important;
      font-weight: bold;
      color: #38b9d1;
      border: 2px #38b9d1 solid !important;
      &.theme--light.v-btn:hover {
        background: #38b9d1 !important;
        opacity: 1;
        color: white;
      }
    }
  }
}
</style>