<template>
  <v-container>
    <v-sheet class="sheet" color="#333333">
      <v-row justify="center">
        <v-col class="text-center">
          <h1>
            About JustRollDnD
            <v-icon size="50px">mdi-death-star-variant</v-icon>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="header">Why was this site made?</div>
          <div class="answer">
            I made this website so that my friends and I could keep track of our DnD one-shot character sheets. Before this website, we were
            stuck writing our custom user sheets in notepad and losing them constantly.
          </div>
        </v-col>
        <v-col cols="12">
          <div class="header">What tech stack is this site made in?</div>
          <div class="answer">
            This websites backend is built on
            <a
              href="https://www.django-rest-framework.org/"
              class="aboutlink"
            >Django Rest Framework</a>, and our frontend is built on
            <a class="aboutlink" href="https://nuxtjs.org/">NuxtJS</a>.
          </div>
        </v-col>
        <v-col cols="12">
          <div class="header">I found a bug on your website!</div>
          <div class="answer">
            If you think you have found a bug with the website, head over to our
            <a
              class="aboutlink"
              href="https://discord.com/invite/Pdfehc9"
            >discord</a> and message a developer or leave a message in the channel. Please
            provide as much information you can and screenshots so that I can best fix the problem!
          </div>
        </v-col>
        <v-col cols="12">
          <div class="header">I have a suggestion!</div>
          <div class="answer">
            To make suggetions for the website please post them in the
            <a
              class="aboutlink"
              href="https://discord.com/invite/Pdfehc9"
            >discord</a>. Please note, as of now I
            am creating this site alone and features/fixes may take time to get implemented. Also, not every feature request will make it into the website!
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "about",
  auth: false,
  head() {
    return {
      title: `JustRollDnD | About`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Commonly asked question and information about JustRollDnD`,
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  color: #ffffff;
}

.sheet {
  padding: 1rem;
  border-radius: 5px;
}

.header {
  border-left: 2px solid #06ba63;
  padding: 10px 1rem;
}

.answer {
  padding: 1rem 0;
}

.aboutlink {
  color: #06ba63 !important;
  border-bottom: 1px solid transparent;
}

.aboutlink:hover {
  border-bottom: 1px solid #06ba63 !important;
  font-weight: normal !important;
}
</style>