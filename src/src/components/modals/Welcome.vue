<template>
  <v-row justify="center" >
    <v-dialog  v-model="welcome_status" width="1000px" redonde persistent>
      <v-card id="welcome">
        <v-row no-gutters>
          <v-col cols="12">
            <v-carousel
              class="max-height"
              hide-delimiter-background
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <first></first>
             <second></second>
               <third></third>
            </v-carousel>
          </v-col>
          <v-col cols="12" align="center" justify="center">
            <v-col cols="12" sm="6" md="5" lg="4">
              <v-btn @click="close()" outlined rounded class="btn-exit" color="#38b9d1"> Acceptar </v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import First from "@/components/modals/carousel-item/First.vue";
import Second from "@/components/modals/carousel-item/Second.vue";
import Third from "@/components/modals/carousel-item/Third.vue";
export default {
  components: { First,Second, Third },
  props: {
    welcome_status: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      localStorage.setItem("udecdash_welcome", false);
      this.$emit("welcome_status", false);
    },
  },
  data: () => ({
    model: 0,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
  }),
};
</script>
<style lang="scss" >

#welcome{
  .v-carousel{
      @media only screen and (min-width: 600px) {
    height: 450px !important;

     }
  }
  .v-carousel__controls{
    .v-item-group.theme--dark{
      // border:2px solid #868686;
      border-radius: 50px;
      .v-carousel__controls__item
      {
        &:hover{
          .v-icon{
            opacity: 0;
          }
        }
        &.v-btn{
        height:15px;
        width: 15px;
        background: #868686;
        margin-top: 0;
        &:nth-child(1){
          margin-left: 0px;
        }
        &:last-child{
          margin-right: 0px;
        }
        .v-carousel__controls__item .v-icon{
          opacity: 0;
        }
        &.v-item--active.v-btn--active{
            background: #ffa000;
        }
      }
      }
    }
  }
}

.btn-exit{
  border:2px solid #38b9d1;
  .v-btn__content{
    text-transform:capitalize !important;
  }

          &.theme--light.v-btn:hover {
            background: #3bbad2 !important;
            opacity: 1;
            color: white !important;
          }
      
}
</style>
