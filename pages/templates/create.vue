<template>
  <v-container>
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
              <v-btn
                slot="append"
                class="ma-2"
                color="#de7679"
                dark
                @click="removeFeat(i)"
              >
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
            <v-btn
              color="#06ba63"
              width="80%"
              class="mr-4"
              @click.prevent="postTemplate()"
            >
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
  data() {
    return {
      template: {
        oneshot: null,
        oneshoturl: null,
        templatefeat: [
          {
            featName: "",
            featVal: ""
          }
        ]
      },
      valid: true,
      rules: {
        nameRules: [
          v => !!v || "One Shot name is required",
          v => (v && v.length <= 120) || "Name must be less than 120 characters"
        ],
        urlRules: [
          v => {
            if (v)
              return v.length <= 300 || "Url must be less than 300 characters";
            else return true;
          }
        ]
      }
    };
  },

  methods: {
    postTemplate() {
      // Check if the fields are valid, then post the character
      if (this.$refs.form.validate()) {
        return this.$axios
          .$post("/sheets/template/create/", this.template)
          .then(res => {
            this.$router.push({
              name: "user-slug",
              params: { slug: this.$auth.user.username }
            });
          });
      }
    },

    addFeat() {
      this.template.templatefeat.push({
        featName: "",
        featValue: ""
      });
    },
    removeFeat(index) {
      this.template.templatefeat.splice(index, 1);
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
