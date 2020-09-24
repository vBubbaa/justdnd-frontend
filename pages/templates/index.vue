<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">Template List</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="payload.search" color="#06ba63" clearable>
          <template v-slot:label>
            Search for templates
            <v-icon style="vertical-align: middle">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" class="text-center">
      <v-col cols="12">
        <v-btn class="mr-4" color="#06ba63" @click="setSearchQuery()">Submit</v-btn>
      </v-col>
    </v-row>
    <div v-if="!$fetchState.pending">
      <v-row justify="center">
        <v-col cols="12" sm="12" md="6" v-for="t in templates.data" :key="t.id" class="text-center">
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
  head() {
    return {
      title: `JustRollDnD | Templates`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Browse pre-made templates created on JustRollDnD. Find and share the templates with friends and use them in your next One-Shot!`,
        },
      ],
    };
  },
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
      console.log(page);
      this.$fetch();
    },

    setSearchQuery: function () {
      this.payload.page = 1;
      this.$fetch();
    },
  },

  async fetch() {
    if (this.payload.page == "") {
      console.log(this.payload);
      this.templates = await this.$axios.$get("/sheets/template/list/", {
        params: { page: 1, search: this.payload.search },
      });
    } else {
      console.log(this.payload);
      this.templates = await this.$axios.$get("/sheets/template/list/", {
        params: this.payload,
      });
    }
  },
};
</script>

<style scoped></style>
