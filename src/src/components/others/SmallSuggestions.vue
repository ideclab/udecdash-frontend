<template>
  <v-dialog
    v-model="modal_suggestions"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="smallSuggestions_btn">
        <v-avatar large  v-bind="attrs" v-on="on">
          <v-icon size="30" dark class="help">mdi-message-question-outline</v-icon>
        </v-avatar>
      </div>
    </template>
    <v-card class="smallSuggestions_card">
      <v-toolbar dark color="#f49f13" flat>
        <v-toolbar-title>Contactanos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-icon @click="close()">
            mdi-window-close
          </v-icon>
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
                  placeholder="sugerencia"
                  :rules="rules['category']"
                ></v-select>
              </div>
              <div class="pt-0 pb-3 suggestions_title">¿Cómo te podemos ayudar?</div>
              <div>
                <v-textarea
                  class="suggestions_description"
                  outlined
                  name="input-7-4"
                  label="Ingresar mensaje"
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
        <v-btn  class="smallSuggestions_send px-2" outlined rounded @click="send()">
          Enviar
            <v-icon class="pl-2" small> mdi-send </v-icon>
        </v-btn>
      </v-card-actions>
  
    </v-card>
  </v-dialog>
</template>

<script>
import Webservice from "@/models/webservice";
import Bowser from "bowser";

export default {
  name: "SmallSuggestions",
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
  data: () => ({
        alert:{
      progress:false,
      message:'',
      active:false,
      color:''
    },
    modal_suggestions: false,
       subject: [
      { name:"Sugerencia", value: "SUGGESTION" },
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
};
</script>

<style lang="scss">
#smallSuggestions{
.smallSuggestions_btn {
  position: fixed;
  bottom: 40px;
  left: 30px;
  z-index: 100;
  .v-avatar {
    background: #f49f13;
    text-transform: capitalize;
  }
}
}
 .smallSuggestions_send {
    text-transform: capitalize !important;
    font-weight: bold;
    color: #38b9d1 !important;
    border: 2px #38b9d1 solid !important;
    &.theme--light.v-btn:hover {
      background: #38b9d1 !important;
      opacity: 1;
      color: white  !important;
    }
  }

</style>
