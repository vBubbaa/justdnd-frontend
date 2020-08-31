<template>
  <v-container>
    <v-container>
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
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "charactersheetdetail",
  data: function () {
    return {
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
          .$put(
            `http://127.0.0.1:8000/api/sheets/charactersheet/${this.character.id}/`,
            this.character
          )
          .then((res) => {
            console.log(res);
          });
      }
    },

    deleteCharacter() {
      this.$axios
        .$delete(
          `http://127.0.0.1:8000/api/sheets/charactersheet/${this.character.id}/delete/`
        )
        .then(this.$router.push({ name: "index" }));
    },
  },
  async asyncData({ $axios, params }) {
    let character = await $axios.$get(
      "/api/sheets/charactersheet/" + params.id
    );

    return {
      character: character,
    };
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