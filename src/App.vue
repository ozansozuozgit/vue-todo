<template>
  <div id="app">
    <v-app>
      <Navbar />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {};
  },
};
</script>
