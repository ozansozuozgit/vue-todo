<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="display-1">Signup</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Email" prepend-icon="mdi-account-circle" v-model="email"></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
          @click:append="showPassword = !showPassword"
          v-model="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" @click="signup">Register</v-btn>
    </v-card-actions>
    <v-alert type="error" v-if="feedback">{{feedback}}</v-alert>
  </v-card>
</template>

<script>
import firebase from "firebase";
// import db from "@/firebase/init";
export default {
  name: "Signup",
  data() {
    return {
      showPassword: false,
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    signup() {
      if (this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => this.$router.push({ name: "home" }))
          .catch((err) => (this.feedback = err.message));
      }
      // this.feedback = "stuff";
    },
  },
};
</script>
