<template>
  <div class="justify-center format-date" v-html="formatDate(date)"></div>
</template>

<script>
export default {
  props: {
    date: {
      default: "",
    },
  },
  methods: {
    formatDate(date) {
      if (date != null) {
        let newDate = new Date(date);
        let day =
          newDate.getDate().toString().length > 1
            ? newDate.getDate()
            : "0" + newDate.getDate().toString();
        let month = newDate.getMonth() ;

        let year = newDate.getFullYear();
        let hour =
          newDate.getHours().toString().length > 1
            ? newDate.getHours()
            : "0" + newDate.getHours().toString();
        let minute =
          newDate.getMinutes().toString().length > 1
            ? newDate.getMinutes()
            : "0" + newDate.getMinutes().toString();
        return `<p> ${day} de ${this.moths[month]},${year} </p> <p>${hour}:${minute} </p>`;
      } else {
        return "";
      }
    },
  },
  data: () => ({
    moths: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  }),
};
</script>

<style lang="scss" >
.format-date {
  p {
    margin-bottom: 0;
    font-size: .7rem;
    &:nth-child(1) {
      font-family: "Lato", "Roboto", "sans-serif";
      font-weight: bold;
      color:#575756
    }
    &:nth-child(2) {
      font-family: "Lato", "Roboto", "sans-serif";
      font-weight: 400;
      color:#706f6f
    }
  }
}
</style>
