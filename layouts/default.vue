<template>
  <v-app dark>
    <!-- Side Bar -->
    <v-navigation-drawer v-model="drawer" fixed app temporary>
      <v-list>
        <v-list-item>
          <nuxt-link to="/templates">
            Templates
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Main Navbar -->
    <v-app-bar app color="#000C14">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/" class="default-link">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
      <v-menu offset-y v-if="this.$auth.loggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="#ffffff" outlined rounded>
            {{ $auth.user.username }}
            <v-icon medium>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <nuxt-link :to="'/user/' + $auth.user.username">
              <v-btn text>Profile</v-btn>
            </nuxt-link>
          </v-list-item>
          <v-list-item>
            <nuxt-link to="/logout">
              <v-btn text>Logout</v-btn>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn color="#ffffff" text v-else>
        <nuxt-link to="/login">Login</nuxt-link>
      </v-btn>
    </v-app-bar>
    <v-main>
      <div class="main-wrap">
        <nuxt />
      </div>
    </v-main>
    <v-divider></v-divider>
    <!-- Footer -->
    <v-footer :absolute="!fixed" app color="#000C14">
      <v-container class="pa-0" fluid>
        <v-row justify="center" class="text-center">
          <v-col cols="12">
            <!-- Contact links -->
            <a href target="_blank">
              <v-btn class="mx-4" icon>
                <v-icon size="30px" color="#06ba63">mdi-discord</v-icon>
              </v-btn>
            </a>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <!-- By yours, truly. -->
        <v-row justify="center" class="text-center">
          <v-col cols="12">
            A project by
            <a href="https://twitter.com/VBubbaa" target="_blank">vBubbaa</a>
            <v-icon color="#ed254e">mdi-heart</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      title: "JustDnD"
    };
  }
};
</script>

<style scoped>
.main-wrap {
  width: 100%;
  height: 100%;
}

.main-wrap {
  background-color: #000c14;
}
</style>

<style>
/* Default anchor styles */
a {
  color: #ffffff !important;
  text-decoration: none !important;
}
a:hover {
  font-weight: bolder;
}
/* Active links green + bold */
.nuxt-link-active {
  color: #06ba63 !important;
  font-weight: bold !important;
}
</style>
