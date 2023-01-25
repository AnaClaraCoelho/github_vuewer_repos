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
                        {{ path.join("/") }}
                        <tr v-for="arquivo in arquivos" :key="arquivo.url">
                            <td>
                                <v-icon v-if="arquivo.type == 'file'">
                                    mdi-file
                                </v-icon>
                                <v-icon v-else @click="redirect(arquivo)">
                                    mdi-folder
                                </v-icon>
                                {{ arquivo.name }}
                                <th v-if="arquivo.mostrarPath && arquivo.type != 'file'">
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
            arquivos: [],
            loading: false,
            is_path: false,
            path: []
        }),
        methods: {
            async listaArquivos () {
                this.path = []
                this.loading = true
                const maisArquivos = await api.listaArquivos(this.repo.owner.login, this.repo.name)
                this.arquivos = this.arquivos.concat(maisArquivos.map(arquivo => {
                    arquivo.mostrarPath = false
                    return arquivo
                }))
                this.loading = false
            },
            async redirect(arquivo){
                this.path = []
                arquivo.mostrarPath = !arquivo.mostrarPath
                const maisArquivos = await api.listaArquivos(this.repo.owner.login, this.repo.name, arquivo.path)
                this.path.push(this.repo.owner.login, this.repo.name, arquivo.path)
                this.arquivos = maisArquivos

            }
        },
        watch: {
            repo() {
                this.arquivos = []
                if (this.repo){
                    this.listaArquivos()
                }
            }
        }
    }
</script>