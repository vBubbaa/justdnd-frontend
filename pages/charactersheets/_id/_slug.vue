<template>
  <v-container>
    <v-row justify="center" v-if="isOwner">
      <v-col>
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
              <v-btn color="#06ba63" width="80%" class="mr-4" @click.prevent="updateCharacter()">
                Update Character
                <v-icon>mdi-sword-cross</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="center" class="create-btn">
              <v-btn color="#ed254e" width="80%" class="mr-4" @click.prevent="deleteCharacter()">
                Delete Character
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
    <v-sheet class="creator-base" v-else>
      <v-row justify="center">
        <v-col cols="12" class="text-center">{{ character.name }}</v-col>
        <v-divider></v-divider>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">About: {{ character.bio }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          Hitpoints
          <v-icon>mdi-bottle-tonic-plus</v-icon>
        </v-col>
        <v-col cols="6">{{ character.hp }}</v-col>
      </v-row>
      <v-row v-for="(feat, index) in character.charactersheetfeat" :key="index">
        <v-col cols="6">{{ feat.featName}}</v-col>
        <v-col cols="6">{{ feat.featVal }}</v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "charactersheetdetail",
  data: function () {
    return {
      isOwner: false,
      valid: true,
      rules: {
        nameRules: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 120) || "Name must be less than 120 characters",
        ],
        bioRules: [
          (v) => {
            if (v)
              return v.length <= 300 || "Bio must be less that 300 characters";
            else return true;
          },
        ],
      },
    };
  },
  methods: {
    updateCharacter() {
      // Check if the fields are valid, then post the character
      if (this.$refs.form.validate()) {
        return this.$axios
          .$put(`/sheets/charactersheet/${this.character.id}/`, this.character)
          .then((res) => {
            this.$router.push({
              name: "user-slug",
              params: { slug: this.$auth.user.username },
            });
          });
      }
    },

    deleteCharacter() {
      this.$axios
        .$delete(
          `http://127.0.0.1:8000/api/sheets/charactersheet/${this.character.id}/delete/`
        )
        .then(
          this.$router.push({
            name: "user-slug",
            params: { slug: this.$auth.user.username },
          })
        );
    },
    // Check if the sheet belongs to the logged in user
    checkIsOwner() {
      if (this.character.user == this.$auth.user.username) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
    },
    addFeat() {
      this.character.charactersheetfeat.push({
        featName: "",
        featValue: "",
      });
    },
    removeFeat(index) {
      this.character.charactersheetfeat.splice(index, 1);
    },
  },
  async asyncData({ $axios, params }) {
    let character = await $axios.$get("/sheets/charactersheet/" + params.id);

    return {
      character: character,
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
</style>