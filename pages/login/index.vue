<template>
  <v-container>
    <v-row justify="center">
      <v-sheet class="creator-base">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            filled
            color="#06ba63"
            v-model="user.username"
            :rules="rules.usernameRules"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            filled
            color="#06ba63"
            v-model="user.password"
            :rules="rules.passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-row justify="center" class="create-btn">
            <v-btn
              color="#06ba63"
              width="80%"
              class="mr-4"
              @click.prevent="login()"
            >
              Login
              <v-icon>mdi-sword-cross</v-icon>
            </v-btn>
          </v-row>
        </v-form>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      user: {},
      valid: true,
      rules: {
        usernameRules: [v => !!v || "Username is required"],
        passwordRules: [v => !!v || "Password is required"]
      }
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", { data: this.user });
        console.log("success login");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.creator-base {
  padding: 3%;
  border-radius: 10px;
  min-width: 60%;
}
.add-feat {
  padding-bottom: 10px;
}
.create-btn {
  padding-top: 10px;
}
</style>
