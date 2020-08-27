<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="display-1">Login</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          label="Email"
          prepend-icon="mdi-account-circle"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
          @click:append="showPassword = !showPassword"
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" :disabled="!valid" @click="login">Login</v-btn>
    </v-card-actions>
    <v-alert type="error" v-if="feedback">{{feedback}}</v-alert>
  </v-card>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",

  data() {
    return {
      showPassword: false,
      email: null,
      password: "",
      feedback: null,
      valid: true,
      passwordRules: [(v) => v.length >= 8 || "Min 8 characters"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            console.log(cred);
            this.$router.push({ name: "home" });
          })
          .catch((err) => (this.feedback = err.message));
      }
    },
  },
};
</script>
