<template>
  <v-card class="mx-auto" color="#1e1e1e" dark max-width="400">
    <v-card-title>
      <v-icon large left>
        mdi-sword
      </v-icon>
      <span class="title font-weight-light">{{ template.oneshot }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ template.user }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-btn icon color="#ffffff">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <span class="subheading mr-2">0</span>
          <v-btn icon color="#ffffff">
            <v-icon class="mr-1">mdi-paperclip</v-icon>
          </v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "templatesearchcard",
  props: {
    template: Object
  }
};
</script>

<style scoped></style>
