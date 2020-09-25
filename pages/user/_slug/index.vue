<template>
  <v-container>
    <v-row v-if="userOverview.verified">
      <v-col cols="12">
        <v-icon color="#06ba63">mdi-check-decagram</v-icon>&nbsp;Verified User
      </v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="6">Characters</v-col>
      <v-col cols="6">
        Sheets:
        <span class="count">{{ characterSheetCount }}</span
        >&nbsp;/
        <span v-if="!userOverview.verified">10</span>
        <span v-else>&#8734;</span>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      class="text-center"
      v-if="
        (checkIsOwner() && limitChecker()) ||
          (userOverview.verified && checkIsOwner())
      "
    >
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
      <v-col cols="6">Created Templates</v-col>
      <v-col cols="6">
        Templates:
        <span class="count">{{ templateCount }}</span
        >&nbsp;/
        <span v-if="!userOverview.verified">10</span>
        <span v-else>&#8734;</span>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      class="text-center"
      v-if="
        (checkIsOwner() && templateLimitChecker()) ||
          (userOverview.verified && checkIsOwner())
      "
    >
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
  head() {
    return {
      title: `JustRollDnD | User - ${this.$route.params.slug}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `JustRollDnD user: ${this.$route.params.slug}. Browse ${this.$route.params.slug}'s character sheets and templates.`
        }
      ]
    };
  },

  data() {
    return {
      characterSheetCount: null,
      templateCount: null,
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
      this.$axios.$delete(`/sheets/charactersheet/${e.id}/delete/`).then(
        this.characters.splice(
          this.characters.findIndex(function(i) {
            return i.id === e.id;
          })
        )
      );
      this.characterSheetCount -= 1;
    },

    deleteTemplate(e) {
      console.log(e);
      this.$axios.$delete(`/sheets/template/${e.id}/delete/`).then(
        this.templates.splice(
          this.templates.findIndex(function(i) {
            return i.id === e.id;
          })
        )
      );
      this.templateCount -= 1;
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
    },

    limitChecker() {
      if (this.characterSheetCount < 10) {
        return true;
      } else {
        return false;
      }
    },

    templateLimitChecker() {
      if (this.templateCount < 10) {
        return true;
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
    let userOverview = await $axios.$get(
      `/user/fetchuseroverview/${params.slug}/`
    );

    return {
      characters: characters,
      templates: templates,
      userOverview: userOverview
    };
  },

  created() {
    this.characterSheetCount = this.characters.length;
    this.templateCount = this.templates.length;
  }
};
</script>

<style scoped>
.create-link {
  color: #06ba63 !important;
}

.count {
  color: #06ba63 !important;
}
</style>
