<template>
    <v-container fluid fill-height>
      <v-layout  justify-center>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-layout>
    </v-container>
</template>
<script>
export default {
  name: "Auth",
};
</script>

