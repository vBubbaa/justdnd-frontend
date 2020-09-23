<template>
  <v-card class="mx-auto" color="#1e1e1e" dark max-width="400">
    <v-card-title>
      <v-icon large left>mdi-sword</v-icon>
      <span class="title font-weight-light">{{ template.oneshot }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <nuxt-link class="user-link" :to="{ name: 'user-slug', params: { slug: template.user } }">
            <v-list-item-title class="user-name">{{ template.user }}</v-list-item-title>
          </nuxt-link>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-btn icon color="#ffffff" @click="copy()">
            <v-icon>mdi-paperclip</v-icon>
          </v-btn>
          <nuxt-link
            :to="{ name: 'templates-id-slug', params: { 'id': template.id, 'slug': template.slug } }"
          >
            <v-btn icon color="#06ba63" @click="copy()">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </nuxt-link>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "templatesearchcard",
  props: {
    template: Object,
  },
  methods: {
    // Copies URL to clipboard once the copy button is clicked
    copy: function () {
      let dummy = document.createElement("input");
      // change url for prod once we get the domain
      let url = `https://justdnd.com/${this.template.id}/${this.template.slug}`;
      document.body.appendChild(dummy);
      dummy.value = url;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
  },
};
</script>

<style scoped>
.user-link {
  color: #06ba63 !important;
}

.user-name {
  width: fit-content;
}
</style>
