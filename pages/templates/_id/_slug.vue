<template>
  <v-container>
    <v-row justify="center" v-if="isOwner">
      <v-col>
        <v-sheet class="creator-base">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              filled
              color="#06ba63"
              v-model="template.oneshot"
              :rules="rules.nameRules"
              :counter="120"
              label="One shot name"
              required
            ></v-text-field>
            <v-text-field
              filled
              color="#06ba63"
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
              <v-btn color="#06ba63" width="80%" class="mr-4" @click.prevent="updateTemplate()">
                Update Template
                <v-icon>mdi-sword-cross</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="center" class="create-btn">
              <v-btn color="#06ba63" width="80%" class="mr-4" @click.prevent="createFromTemplate()">
                Use this template
                <v-icon>mdi-sword-cross</v-icon>
              </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
    <v-sheet class="creator-base" v-else>
      <v-row justify="center">
        <v-col cols="12" class="text-center name">{{ template.oneshot }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" class="default-text">URL: {{ template.oneshoturl }}</v-col>
      </v-row>
      <v-row v-for="(feat, index) in template.templatefeat" :key="index">
        <v-col cols="6" class="default-text">{{ feat.featName }}</v-col>
        <v-col cols="6" class="default-text">{{ feat.featVal }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col class="default-text">
          Made by:
          <nuxt-link
            class="user-link"
            :to="{ name: 'user-slug', params: { slug: template.user } }"
          >{{ template.user }}</nuxt-link>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-btn
            color="#06ba63"
            width="100%"
            class="text-center"
            @click.prevent="createFromTemplate()"
          >
            Use this template
            <v-icon>mdi-sword-cross</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "charactersheetdetail",
  auth: false,
  data: function () {
    return {
      isOwner: false,
      valid: true,
      rules: {
        nameRules: [
          (v) => !!v || "One shot name is required",
          (v) =>
            (v && v.length <= 120) || "Name must be less than 120 characters",
        ],
        urlRules: [
          (v) => {
            if (v)
              return (
                v.length <= 300 ||
                "One shot url must be less that 300 characters"
              );
            else return true;
          },
        ],
      },
    };
  },
  methods: {
    updateTemplate() {
      // Check if the fields are valid, then post the character
      if (this.$refs.form.validate()) {
        return this.$axios
          .$put(`/sheets/template/${this.template.id}/`, this.template)
          .then((res) => {
            this.$router.push({
              name: "user-slug",
              params: { slug: this.$auth.user.username },
            });
          });
      }
    },

    deleteTemplate() {
      this.$axios
        .$delete(`/sheets/charactersheet/${this.template.id}/delete/`)
        .then(
          this.$router.push({
            name: "user-slug",
            params: { slug: this.$auth.user.username },
          })
        );
    },
    // Check if the sheet belongs to the logged in user
    checkIsOwner() {
      if (this.$auth.loggedIn) {
        if (this.template.user == this.$auth.user.username) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
      } else {
        this.isOwner = false;
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
    createFromTemplate() {
      this.$store.commit("SET_TEMPLATE_FEATS", this.template.templatefeat);
      this.$router.push({ name: "charactersheets-create" });
    },
  },
  async asyncData({ $axios, params }) {
    let template = await $axios.$get("/sheets/template/" + params.id);

    return {
      template: template,
    };
  },
  mounted() {
    this.checkIsOwner();
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

.name {
  font-size: 2rem;
}

.default-text {
  font-size: 1.2rem;
}

.user-link {
  color: #06ba63 !important;
}
</style>
