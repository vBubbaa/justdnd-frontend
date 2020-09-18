<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">Template List</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="payload.search" @input="setSearchQuery()" color="#06ba63">
          <template v-slot:label>
            Search for templates
            <v-icon style="vertical-align: middle">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <div v-if="!$fetchState.pending">
      <v-row justify="center">
        <v-col cols="6" v-for="t in templates.data" :key="t.id" class="text-center">
          <TemplateSearchCard :template="t" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-pagination
            color="#06ba63"
            v-model="templates.pagination.current_page"
            :length="templates.pagination.num_pages"
            :total-visible="8"
            @input="nextPage"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
    <v-row justify="center" v-else>
      <v-col cols="12" class="text-center">Loading Templates</v-col>
      <v-col cols="12" class="text-center">
        <v-progress-circular :size="50" color="#06ba63" indeterminate></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TemplateSearchCard from "../../components/templates/TemplateSearchCard";

export default {
  name: "templateindex",
  auth: false,
  components: {
    TemplateSearchCard,
  },
  data() {
    return {
      templates: [],
      payload: {
        page: "",
        search: "",
      },
    };
  },

  methods: {
    nextPage(page) {
      this.payload.page = page;
      this.$fetch();
    },

    numPages() {
      if (this.templates.pagination.num_pages != null) {
        return this.templates.pagination.num_pages;
      } else {
        return 1;
      }
    },

    setSearchQuery: function () {
      this.payload.page = 1;
      this.$fetch();
    },
  },

  async fetch() {
    if (this.payload.search != "") {
      this.templates = await this.$axios.$get("/sheets/template/list/", {
        params: this.payload,
      });
    } else {
      this.templates = await this.$axios.$get("/sheets/template/list/");
    }
  },
};
</script>

<style scoped></style>
