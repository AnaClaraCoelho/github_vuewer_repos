<template>
  <v-container>
      <GithupRepo @reposelected="onRepoSelected"/>
     <GithubContents :repo="repo"/>
  </v-container>
  </template>
  
<script>
import GithubContents from './GithubContents';
import GithupRepo from './GithupRepo';
export default {
    components: {
    GithupRepo,
    GithubContents
},
    data: () => ({
        repo: null
    }),
    methods: {
        onRepoSelected (repo){
            this.repo = repo
        }
    }
}
</script>
