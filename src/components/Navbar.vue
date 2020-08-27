<template>
  <nav>
    <v-toolbar>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">Todo</span>
        <span>List</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user" class="grey--text text-darken-1">{{user.email}}</div>
      <v-btn text v-if="!user">
        <router-link :to="{name:'signup'}">
          <span>Sign Up</span>
          <v-icon right>login</v-icon>
        </router-link>
      </v-btn>
      <v-btn text v-if="!user">
        <router-link :to="{name:'login'}">
          <span>Sign In</span>
          <v-icon right>login</v-icon>
        </router-link>
      </v-btn>
      <v-btn text @click="logout" v-if="user">
        <span>Sign Out</span>
        <v-icon right>login</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.push({ name: "login" }));
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style>
</style>