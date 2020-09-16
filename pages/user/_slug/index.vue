<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12">Characters</v-col>
    </v-row>
    <v-row justify="center" class="text-center" v-if="checkIsOwner()">
      <v-col cols="12">
        <v-btn text outlined color="#ffffff">
          <nuxt-link
            :to="{ name: 'charactersheets-create' }"
            class="create-link"
          >
            Create New Character
            <v-icon>mdi-sword-cross</v-icon>
          </nuxt-link>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="4"
        xl="4"
        v-for="c in characters"
        :key="c.id"
      >
        <MiniCharacterCard :character="c" @deletecharacter="deleteCharacter" />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="center" class="text-center">
      <v-col cols="12">Created Templates</v-col>
    </v-row>
    <v-row justify="center" class="text-center" v-if="checkIsOwner()">
      <v-col cols="12">
        <v-btn text outlined color="#ffffff">
          <nuxt-link :to="{ name: 'templates-create' }" class="create-link">
            Create New Template
            <v-icon>mdi-file-outline</v-icon>
          </nuxt-link>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="4"
        xl="4"
        v-for="t in templates"
        :key="t.id"
      >
        <MiniTemplateCard
          :template="t"
          :key="t.id"
          @deletetemplate="deleteTemplate"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MiniCharacterCard from "../../../components/sheets/MiniCharacterCard";
import MiniTemplateCard from "../../../components/templates/MiniTemplateCard";

export default {
  name: "userdetail",
  auth: false,

  data() {
    return {
      characters: [],
      templates: []
    };
  },

  components: {
    MiniCharacterCard,
    MiniTemplateCard
  },

  methods: {
    deleteCharacter(e) {
      console.log(e);
      this.$axios
        .$delete(
          `http://127.0.0.1:8000/api/sheets/charactersheet/${e.id}/delete/`
        )
        .then(
          this.characters.splice(
            this.characters.findIndex(function(i) {
              return i.id === e.id;
            })
          )
        );
    },

    deleteTemplate(e) {
      console.log(e);
      this.$axios
        .$delete(`http://127.0.0.1:8000/api/sheets/template/${e.id}/delete/`)
        .then(
          this.templates.splice(
            this.templates.findIndex(function(i) {
              return i.id === e.id;
            })
          )
        );
    },

    // Check if the sheet belongs to the logged in user
    checkIsOwner() {
      if (this.$auth.loggedIn) {
        if (this.$route.params.slug == this.$auth.user.username) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },

  async asyncData({ $axios, params }) {
    let characters = await $axios.$get(
      `/sheets/charactersheetuser/list/${params.slug}`
    );
    let templates = await $axios.$get(`/sheets/template/list/${params.slug}/`);

    return {
      characters: characters,
      templates: templates
    };
  }
};
</script>

<style scoped>
.create-link {
  color: #06ba63 !important;
}
</style>
