<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12">Characters</v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="12">
        <v-btn text outlined color="#ffffff">
          <nuxt-link :to="{ name: 'charactersheets-create' }" class="create-link">
            Create New Character
            <v-icon>mdi-sword-cross</v-icon>
          </nuxt-link>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4" xl="4" v-for="c in characters" :key="c.id">
        <MiniCharacterCard :character="c" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MiniCharacterCard from "../../../components/sheets/MiniCharacterCard";
export default {
  name: "userdetail",

  components: {
    MiniCharacterCard,
  },

  async asyncData({ $axios, $auth }) {
    let characters = await $axios.$get(
      `http://127.0.0.1:8000/api/sheets/charactersheetuser/list/${$auth.user.pk}`
    );

    return {
      characters: characters,
    };
  },
};
</script>

<style scoped>
.create-link {
  color: #06ba63 !important;
}
</style>
