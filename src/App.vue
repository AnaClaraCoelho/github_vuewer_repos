<template>
    <v-app>
      <v-app-bar
        app
        color="cyan lighten-2"
        dark
      >
        <v-switch
            v-model="$vuetify.theme.dark"
            inset
            label="Change to Theme Dark"
            persistent-hint
          ></v-switch>
        <v-spacer></v-spacer>

        <v-btn
          href="https://github.com/AnaClaraCoelho/github_vuewer_repos"
          target="_blank"
          text
        >
          <span class="mr-2">Repositório</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>

      </v-app-bar>

      <v-main>
        <GithubVuewer/> 
      </v-main>
    </v-app>
</template>

<script>
import GithubVuewer from './components/GithubVuewer.vue';

export default {
  name: 'App',

  components: {
    GithubVuewer
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
