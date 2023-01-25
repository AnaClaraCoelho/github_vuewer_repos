<template>
  <v-app>
    <v-app-bar
      app
      color="orange accent-1"
      dark
    >
      <v-spacer></v-spacer>

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
