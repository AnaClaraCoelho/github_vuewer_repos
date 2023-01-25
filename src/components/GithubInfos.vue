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
                        <tr v-for="info in infos" :key="info.url">
                            <p> {{info.path  }}</p>
                            <td>
                                <v-icon v-if="info.type == 'file'">
                                    mdi-file
                                </v-icon>
                                <v-icon v-else @click="redirect(info)">
                                    mdi-folder
                                </v-icon>
                                {{ info.name }}
                                <th v-if="info.mostrarPath && info.type != 'file'">
                                </th>
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
            infos: [],
            loading: false,
            is_path: false
        }),
        methods: {
            async listaInfos () {
                this.loading = true
                const maisInfos = await api.listaInfos(this.repo.owner.login, this.repo.name)
                this.infos = this.infos.concat(maisInfos.map(info => {
                    info.mostrarPath = false
                    return info
                }))
                this.loading = false
            },
            async redirect(info){
                info.mostrarPath = !info.mostrarPath
                const maisInfos = await api.listaInfos(this.repo.owner.login, this.repo.name, info.path)
                this.infos = maisInfos
            }
        },
        watch: {
            repo() {
                this.infos = []
                if (this.repo){
                    this.listaInfos()
                }
            }
        }
    }
</script>