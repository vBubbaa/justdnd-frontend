<template>
  <v-container>
    <v-row justify="center" class="index-row">
      <v-col cols="12" sm="6" class="d-flex justify-center align-center">
        <img src="~/assets/d20.png" width="150" height="150" alt="D20 Dice" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="d-flex justify-center align-center flex-column"
      >
        <div class="main-text">Character Sheets</div>
        <div class="subtext text-center">
          Easily create character sheets for any one shot you are playing and
          update your sheets as you play.
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="center" class="index-row">
      <v-col
        cols="12"
        sm="6"
        class="d-flex justify-center align-center flex-column"
      >
        <div class="main-text">Templates</div>
        <div class="subtext text-center">
          Pre-made templates made for specific one-shots. Browse templates to
          create your character sheet from a template, or create your own
          template for others to use.
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-center align-center">
        <img src="~/assets/lute.png" width="150" height="150" alt="D20 Dice" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false
};
</script>

<style scoped>
.main-text {
  color: #06ba63;
  font-size: 1.5rem;
  font-weight: bold;
}

.subtext {
  font-size: 1rem;
  color: #ffffff;
  width: 80%;
}

.index-row {
  padding: 3rem 0;
}
</style>
