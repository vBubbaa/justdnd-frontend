<template>
  <v-container>
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
              label="Password"
              required
            ></v-text-field>
            <v-text-field
              filled
              color="#06ba63"
              v-model="passwordCheck"
              :rules="[rules.passwordRules, passwordChecker]"
              label="Password"
              required
            ></v-text-field>

            <v-row justify="center" class="create-btn">
              <v-col cols="12">
                <v-btn color="#06ba63" width="100%" class="mr-4" @click.prevent="register()">
                  Register
                  <v-icon>mdi-sword-cross</v-icon>
                </v-btn>
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
  name: "register",
  auth: false,
  data: function () {
    return {
      user: {},
      passwordCheck: "",
      valid: true,
      rules: {
        usernameRules: [
          (v) => !!v || "Username is required",
          (v) =>
            (v && v.length <= 120) || "Name must be 150 characters or less.",
        ],
        passwordRules: [(v) => !!v || "Password is required"],
      },
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        return this.$axios
          .$post(`http://127.0.0.1:8000/api/user/register/`, this.user)
          .then((res) => {
            this.$router.push({
              name: "index",
            });
          });
      }
    },
  },

  computed: {
    passwordChecker() {
      return (
        this.user.password === this.passwordCheck || "Passwords do not match"
      );
    },
  },
};
</script>

<style scoped>
.creator-base {
  padding: 3%;
  border-radius: 10px;
}
</style>