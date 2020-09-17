<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">Template List</v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="6"
        v-for="t in templates.data"
        :key="t.id"
        class="text-center"
      >
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
  </v-container>
</template>

<script>
import TemplateSearchCard from "../../components/templates/TemplateSearchCard";

export default {
  name: "templateindex",
  auth: false,
  components: {
    TemplateSearchCard
  },
  data() {
    return {
      templates: [],
      payload: {
        page: "",
        search: ""
      }
    };
  },

  methods: {
    nextPage(page) {
      this.payload.page = page;
      this.$fetch();
    }
  },

  async fetch() {
    if (this.payload.page == "") {
      this.templates = await this.$axios.$get("/sheets/template/list/");
    } else {
      this.templates = await this.$axios.$get("/sheets/template/list/", {
        params: this.payload
      });
    }
  }
};
</script>

<style scoped></style>
