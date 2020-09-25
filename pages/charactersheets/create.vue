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
            v-model="character.name"
            :rules="rules.nameRules"
            :counter="120"
            label="Character Name"
            required
          ></v-text-field>
          <v-textarea
            v-model="character.bio"
            auto-grow
            filled
            color="#06ba63"
            :rules="rules.bioRules"
            :counter="300"
            label="Bio"
            rows="4"
          ></v-textarea>
          <v-text-field
            filled
            color="#06ba63"
            v-model="character.hp"
            type="number"
            label="Hit Points"
          ></v-text-field>
          <div v-for="(feat, i) in character.charactersheetfeat" :key="i">
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
              @click.prevent="postCharacter()"
            >
              Create Character
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
  name: "createcharactersheet",
  head() {
    return {
      title: `JustRollDnD | Character Create`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Create a custom character through JustRollDnD. Save and edit it later, or keep it open and edit it while you play!`
        }
      ]
    };
  },
  data() {
    return {
      error: {
        err: false,
        message: ""
      },
      character: {
        name: null,
        bio: null,
        hp: null,
        charactersheetfeat: [
          {
            featName: "",
            featVal: ""
          }
        ]
      },
      valid: true,
      rules: {
        nameRules: [
          v => !!v || "Name is required",
          v => (v && v.length <= 120) || "Name must be less than 120 characters"
        ],
        bioRules: [
          v => {
            if (v)
              return v.length <= 300 || "Bio must be less that 300 characters";
            else return true;
          }
        ]
      }
    };
  },

  methods: {
    postCharacter() {
      // Check if the fields are valid, then post the character
      if (this.$refs.form.validate()) {
        return this.$axios
          .$post("/sheets/charactersheet/create/", this.character)
          .then(res => {
            console.log(res);
            this.$router.push({
              name: "user-slug",
              params: { slug: this.$auth.user.username }
            });
          })
          .catch(err => {
            this.error.err = true;
            this.error.message = err.response.data.detail;
          });
      }
    },

    addFeat() {
      this.character.charactersheetfeat.push({
        featName: "",
        featValue: ""
      });
    },
    removeFeat(index) {
      this.character.charactersheetfeat.splice(index, 1);
    }
  },

  created() {
    //  If we passed feats from a template, set the feats in local data, then clear them from the store
    if (this.templateFeats.length > 0) {
      this.character.charactersheetfeat = [];
      for (const feat of this.templateFeats) {
        this.character.charactersheetfeat.push(feat);
        this.$store.commit("CLEAR_TEMPLATE_FEATS");
      }
    }
  },

  computed: {
    templateFeats() {
      return this.$store.state.templateFeats;
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
