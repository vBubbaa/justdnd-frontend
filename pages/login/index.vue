<template>
  <v-container>
    <v-row v-if="error" justify="center">
      <v-col cols="10">
        <v-alert type="error">Invalid login credentials!</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
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
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              label="Password"
              required
            ></v-text-field>

            <v-row justify="center" class="create-btn">
              <v-col cols="12">
                <v-btn color="#06ba63" width="100%" class="mr-4" @click.prevent="login()">
                  Login
                  <v-icon>mdi-sword-cross</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row justify="center" class="text-center">
              <v-col>
                <span>
                  Need an account?
                  <nuxt-link :to="{ name: 'register' }" class="link">Register</nuxt-link>
                </span>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "login",
  head() {
    return {
      title: `JustRollDnD | Login`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Login to JustRollDnD and get started creating characters and using templates you need.`,
        },
      ],
    };
  },
  data: function () {
    return {
      show: false,
      error: false,
      user: {},
      valid: true,
      rules: {
        usernameRules: [(v) => !!v || "Username is required"],
        passwordRules: [(v) => !!v || "Password is required"],
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", { data: this.user });
        console.log("success login");
      } catch (err) {
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
.creator-base {
  padding: 3%;
  border-radius: 10px;
}
.add-feat {
  padding-bottom: 10px;
}
.create-btn {
  padding-top: 10px;
}
.link {
  color: #06ba63 !important;
}
</style>
