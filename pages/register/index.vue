<template>
  <v-container>
    <v-row v-if="errStatus" justify="center">
      <v-col cols="10" v-for="(k, v) in errors" :key="v">
        <v-alert type="error">{{ k }}</v-alert>
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
              v-model="user.email"
              :rules="rules.emailRules"
              label="Email"
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
            <v-text-field
              filled
              color="#06ba63"
              v-model="passwordCheck"
              :rules="[rules.passwordRules, passwordChecker]"
              :type="show ? 'text' : 'password'"
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
  head() {
    return {
      title: `JustRollDnD | Register`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Register for JustRollDnD and get started creating characters and using templates you need.`,
        },
      ],
    };
  },
  auth: false,
  data: function () {
    return {
      errStatus: false,
      errors: [],
      show: false,
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
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
      },
    };
  },
  methods: {
    async register() {
      this.errors = [];
      this.errStatus = false;
      if (this.$refs.form.validate()) {
        return this.$axios
          .$post(`/user/register/`, this.user)
          .then((res) => {
            this.$router.push({
              name: "index",
            });
          })
          .catch((err) => {
            console.log(err.response.data);
            if (err.response.data["username"]) {
              this.errors.push("This username is already in use.");
              this.errStatus = true;
            }
            if (err.response.data["email"]) {
              this.errors.push("This email is already in use.");
              this.errStatus = true;
            }
            if (err.response.data["password"]) {
              this.errors.push("Password must be at least 8 characters long");
              this.errStatus = true;
            }
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