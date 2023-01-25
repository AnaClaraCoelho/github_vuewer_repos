<template>
  <v-container>
      <GithupRepo @reposelected="onRepoSelected"/>
     <GithubInfos :repo="repo"/>
  </v-container>
  </template>
  
<script>
import GithubInfos from './GithubInfos';
import GithupRepo from './GithupRepo';
export default {
    components: {
    GithupRepo,
    GithubInfos
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
