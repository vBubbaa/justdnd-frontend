<template>
  <v-card class="mx-auto" max-width="344" color="#ffffff">
    <v-card-text>
      <div class="card-text">{{ character.name }}</div>
      <v-divider></v-divider>
      <div class="card-text">{{ character.bio }}</div>
    </v-card-text>
    <v-card-actions>
      <nuxt-link
        :to="{ name: 'charactersheets-id-slug', params: { id: character.id, slug: character.slug } }"
      >
        <v-btn text color="#06ba63">View</v-btn>
      </nuxt-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "minicharactercard",
  props: {
    character: Object,
  },
};
</script>

<style scoped>
.card-text {
  color: #000000 !important;
}
</style>
