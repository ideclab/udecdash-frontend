<template>
  <v-icon
    :class="colorIcon(state)"
    v-text="seenIcon(state)"
  ></v-icon>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    seenIcon(state) {
      if (!state) {
        return "mdi-close";
      } else {
        return "mdi-check";
      }
    },
    colorIcon(state) {
      if (!state) {
        return "icon-close";
        } else {
        return "icon-check";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .icon-close {
    font-size: 20px !important;
    border-radius: 100%;
    color: #D86883 !important;
  }
  .icon-check {
    color: #2F9B40;
    font-size: 20px !important;
    border-radius: 100%;
  }
</style>
