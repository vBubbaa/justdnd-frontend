<template>
  <v-card class="mx-auto d-flex flex-column" max-width="344" color="#ffffff">
    <v-card-text>
      <div class="card-text">{{ template.oneshot }}</div>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <nuxt-link
        :to="{
          name: 'templates-id-slug',
          params: { id: template.id, slug: template.slug }
        }"
      >
        <v-btn text color="#06ba63">View</v-btn>
      </nuxt-link>
      <v-btn
        text
        color="red"
        v-if="checkIsOwner()"
        @click="deleteTemplate(template)"
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "minitemplatecard",
  props: {
    template: Object
  },
  methods: {
    // Check if the sheet belongs to the logged in user
    checkIsOwner() {
      if (this.$auth.loggedIn) {
        if (this.template.user == this.$auth.user.username) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    deleteTemplate(template) {
      this.$emit("deletetemplate", template);
    }
  }
};
</script>

<style scoped>
.card-text {
  color: #000000 !important;
}
</style>
