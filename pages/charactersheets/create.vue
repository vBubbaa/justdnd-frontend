<template>
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
            <v-btn color="#06ba63" width="80%" class="mr-4" @click.prevent="postCharacter()">
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
  data: function () {
    return {
      character: {
        name: null,
        bio: null,
        hp: null,
      },
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
    postCharacter() {
      // Check if the fields are valid, then post the character
      if (this.$refs.form.validate()) {
        return this.$axios
          .$post(
            "http://127.0.0.1:8000/api/sheets/charactersheet/create/",
            this.character
          )
          .then((res) => {
            console.log(res);
          });
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