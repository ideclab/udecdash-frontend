<template>
  <div class="d-flex justify-space-around px-16 course_card_details">

    <v-tooltip top :disabled="!details.course_code" redonde >
      <template v-slot:activator="{ on,attrs }">
        <v-icon v-bind="attrs" v-on="on" size="26" on="true" class="icon_details" :class="!details.course_code ?'opacity':''">
          mdi-code-tags
        </v-icon>
      </template>
      <span class="course_card_details_description">Código <br></span> 
      <span class="py-0">{{ details.course_code }}</span>
    </v-tooltip>
    <v-tooltip top :disabled="details.sections.length ==0">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" >
          <icon-base class="icon_details" width="50" :class="details.sections.length ==0 ?'opacity':''"
           height="26" viewBox="0 0 24 17.82" >
            <icon-section />
          </icon-base>
        </div>
      </template>
      <span class="course_card_details_description">Secciones</span> <br>
          <span v-for="section in details.sections" :key="section">
          {{section}}
        </span>
    </v-tooltip>
    <v-tooltip top :disabled="!details.period" >
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <icon-base class="icon_details" width="50" :class="!details.period ?'opacity':''"
            height="26" viewBox="0 0 24 21.82" >
            <icon-calendar />
          </icon-base>
        </div>
      </template>
      <span class="course_card_details_description">Periodo</span> <br>
       <span>{{ details.period }}</span> 
    </v-tooltip>
    <v-tooltip top :disabled="!details.year">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <icon-base class="icon_details" width="50" :class="!details.year ?'opacity':''"
            height="26" viewBox="0 0 24 21.82" >
            <icon-calendar-year />
          </icon-base>
        </div>
      </template>
      <span class="course_card_details_description">Año</span> <br>

      <span>{{ details.year }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import IconCalendarYear from "@/components/icons/IconCalendarYear.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconSection from "@/components/icons/IconSection.vue";

export default {
  components: { IconCalendarYear, IconCalendar, IconSection },

  props: {
    details: {
      type: Object,
      default: () => ({
        course_code: null,
        name:null,
        period: null,
        sections: null,
        year: null,
      }),
    },
  },
  methods:{
    sections(section){
      console.log(section.toString().split(','))
      return section.toString().split(',')
    }
  }
};
</script>

<style lang="scss">

</style>
<style lang="scss" scoped>
.course_card_details {
  background: #f5f5f5;
  .icon_details {
    height: 100%;
    border-radius: 20px;
    color: #6e6e6e;
    padding: 1px 14px;
    &:hover {
      background: #6e6e6e;
      color: white;
    }
    &.opacity{
  opacity: .6;
   &:hover {
      background: transparent;
      color: #6e6e6e;
    }
}
  }
 
}
</style>
<style lang="scss">
 .v-tooltip__content {
  border-radius: 15px !important;
  padding: 0 20px;
  line-height:1rem !important;
}

 .course_card_details_description{
    font-size: 0.7rem !important;
    br{
     line-height: 1rem;
    }
  } 



</style>