<template>
  <v-container>
    <v-row v-if="error.err" justify="center">
      <v-col cols="10">
        <v-alert type="error">{{ error.message }}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-sheet class="creator-base">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            filled
            color="#06ba63"
            v-model="template.oneshot"
            :rules="rules.nameRules"
            :counter="120"
            label="One Shot"
            required
          ></v-text-field>
          <v-text-field
            filled
            color="#06ba63"
            type="url"
            v-model="template.oneshoturl"
            :rules="rules.urlRules"
            :counter="120"
            label="One shot URL"
          ></v-text-field>
          <div v-for="(feat, i) in template.templatefeat" :key="i">
            <v-text-field
              :label="feat.featName"
              v-model="feat.featName"
              filled
              color="#06ba63"
              placeholder="Feat Name"
            >
              <v-btn slot="append" class="ma-2" color="#de7679" dark @click="removeFeat(i)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-text-field>
            <v-text-field
              placeholder="Feat Value"
              :label="feat.featVal"
              v-model="feat.featVal"
              type="number"
              filled
              color="#06ba63"
            ></v-text-field>
          </div>
          <v-row justify="center">
            <v-btn class="ma-2" color="#06ba63" dark @click="addFeat()">
              Add Feat
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-row>
          <v-row justify="center" class="create-btn">
            <v-btn color="#06ba63" width="80%" class="mr-4" @click.prevent="postTemplate()">
              Create Template
              <v-icon>mdi-file-outline</v-icon>
            </v-btn>
          </v-row>
        </v-form>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "createcharactersheet",
  head() {
    return {
      title: `JustRollDnD | Create Template`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Create a template and share it with others for your next One-Shot. Easily create a customizable template for others to use while they play.`,
        },
      ],
    };
  },
  data() {
    return {
      error: {
        err: false,
        message: "",
      },
      template: {
        oneshot: null,
        oneshoturl: null,
        templatefeat: [
          {
            featName: "",
            featVal: "",
          },
        ],
      },
      valid: true,
      rules: {
        nameRules: [
          (v) => !!v || "One Shot name is required",
          (v) =>
            (v && v.length <= 120) || "Name must be less than 120 characters",
        ],
        urlRules: [
          (v) => {
            if (v)
              return v.length <= 300 || "Url must be less than 300 characters";
            else return true;
          },
          (v) => {
            if (v && v.length > 0) {
              return (
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
                  v
                ) || "URL format is incorrect."
              );
            } else {
              return true;
            }
          },
        ],
      },
    };
  },

  methods: {
    postTemplate() {
      // Check if the fields are valid, then post the character
      if (this.$refs.form.validate()) {
        return this.$axios
          .$post("/sheets/template/create/", this.template)
          .then((res) => {
            this.$router.push({
              name: "user-slug",
              params: { slug: this.$auth.user.username },
            });
          })
          .catch((err) => {
            this.error.err = true;
            this.error.message = err.response.data.detail;
          });
      }
    },

    addFeat() {
      this.template.templatefeat.push({
        featName: "",
        featValue: "",
      });
    },
    removeFeat(index) {
      this.template.templatefeat.splice(index, 1);
    },
  },

  computed: {
    templateFeats() {
      if (this.$store.state.templateFeats.length > 0) {
        return this.$state.templateFeats;
      }
    },
  },
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
