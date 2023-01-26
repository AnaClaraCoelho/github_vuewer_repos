<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Content
                                </th>
                            </tr>
                        </thead>
                    <tbody>
                        <v-banner v-if="actualPath">
                            📂 {{actualPath}}
                        </v-banner>
                        <tr v-for="file in files" :key="file.url">
                            <td>
                                <v-icon v-if="file.type == 'file'">
                                    mdi-file
                                </v-icon>
                                <v-icon v-else @click="redirect(file)">
                                    mdi-folder
                                </v-icon>
                                {{ file.name }}
                            </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-progress-circular
                indeterminate
                color="primary"
                v-if="loading">
                </v-progress-circular>
            </v-col>
        </v-row>
    </div>
  </template>
  
<script>

import {api} from '~api'

    export default {
        props: ['repo'],
        data: () => ({
            files: [],
            loading: false,
            actualPath: null
        }),
        methods: {
            async list_files () {
                this.path = []
                this.loading = true
                const moreFiles = await api.list_files(this.repo.owner.login, this.repo.name)
                this.files = this.files.concat(moreFiles)
                this.loading = false
            },
            async redirect(file){
                let path = []
                const moreFiles = await api.list_files(this.repo.owner.login, this.repo.name, file.path)
                path.push(this.repo.owner.login, this.repo.name, file.path)
                this.files = moreFiles
                this.actualPath = path.join('/')
            }
        },
        watch: {
            repo() {
                this.files = []
                if (this.repo){
                    this.list_files()
                }
            }
        }
    }
</script>