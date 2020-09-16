<template>
  <v-card
    class="mx-auto d-flex flex-column"
    max-width="344"
    height="300"
    color="#ffffff"
  >
    <v-card-text>
      <div class="card-text">{{ character.name }}</div>
      <v-divider></v-divider>
      <div class="card-text bio">{{ character.bio }}</div>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <nuxt-link
        :to="{
          name: 'charactersheets-id-slug',
          params: { id: character.id, slug: character.slug }
        }"
      >
        <v-btn text color="#06ba63">View</v-btn>
      </nuxt-link>
      <v-btn
        text
        color="red"
        v-if="checkIsOwner()"
        @click="deleteCharacter(character)"
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "minicharactercard",
  props: {
    character: Object
  },
  methods: {
    // Check if the sheet belongs to the logged in user
    checkIsOwner() {
      if (this.$auth.loggedIn) {
        if (this.character.user == this.$auth.user.username) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    deleteCharacter(character) {
      this.$emit("deletecharacter", character);
    }
  }
};
</script>

<style scoped>
.card-text {
  color: #000000 !important;
}
</style>
