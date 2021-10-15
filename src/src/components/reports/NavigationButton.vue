<template>
    <router-link :to="NavigationRoute" outlined small>
  <div class="background">
      <v-btn outlined rounded class="btn_navigation d-flex d-sm-none">Navegar</v-btn>
      <icon-base
        width="23"
        height="23"
        viewBox="0 0 8.31 14.28"
        color="#3dbcd9"
        icon-name="arrow"
        class="browse_button navigation"
      >
        <icon-arrow />
      </icon-base>
  </div>
    </router-link>
</template>

<script>
export default {
  props: {
    NavigationRoute: {
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  cursor: pointer;
  width: 100%;
  height: 100%;
  &:hover {
    .browse_button {
      color: white;
      background: #3bbad2;
      border: 2px #3bbad2 solid;
      border-radius: 100%;
    }
  }
   @media only screen and (min-width: 600px) {
  padding: 7px 16px 0 16px;
   }
}
a {
  text-decoration: none !important;
}
.browse_button {
  border: 2px solid;
  padding: 3px;
  border-radius: 100%;
  &.navigation {
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
  &:hover {
    color: white;
    background: #3bbad2;
    border: 2px #3bbad2 solid;
    border-radius: 100%;
  }
}
</style>