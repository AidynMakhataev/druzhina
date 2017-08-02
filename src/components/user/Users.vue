<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-card light>
                    <v-card-title>
                        <h5>Пользователи</h5>
                        <v-spacer></v-spacer>
                        <v-text-field
                                append-icon="search"
                                label="Поиск"
                                hide-details
                                v-model="search"
                                light
                                class="input-group--focused"
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                            v-bind:headers="headers"
                            v-bind:items="items"
                            v-bind:search="search"
                            v-bind:rows-per-page-items = "pagination"
                            class="elevation-1"
                    >
                        <template slot="headerCell" scope="props">
                            <span v-tooltip:bottom="{ 'html': props.header.text }">
                              {{ props.header.text }}
                            </span>
                        </template>
                        <template slot="items" scope="props">
                            <td>{{ props.item.user_name }} {{ props.item.user_surname }}</td>
                            <td  class="text-xs-right">{{ props.item.user_email }}</td>
                            <td  class="text-xs-right">{{ props.item.user_phone }}</td>
                            <td  class="text-xs-right">{{ props.item.user_iin }}</td>
                            <td  class="text-xs-right">{{ props.item.user_sex }}</td>
                            <td  class="text-xs-right">{{ props.item.user_age }}</td>
                            <td  class="text-xs-right">{{ props.item.user_role }}</td>
                            <td  class="text-xs-right">{{ props.item.user_date }}</td>
                            <td class="text-xs-right" style="width: 20%;"><v-btn small fab class="amber" :to="'/user/' + props.item.user_id"><v-icon class="white--text">account_circle</v-icon></v-btn></td>
                            <td class="text-xs-right"><v-btn small primary fab dark :to="'/user/edit/' + props.item.user_id"><v-icon>edit</v-icon></v-btn></td>
                            <td class="text-xs-right">

                                <v-btn error small dark fab @click.native.stop="showDelete(props.item)"><v-icon>delete</v-icon></v-btn>
                                <v-dialog v-model="dialog" lazy absolute width="450">
                                    <v-card>
                                        <v-card-title>
                                            <div class="headline" style="text-align: center">Вы уверены что хотите удалить пользователя {{ currentUser.user_name }} {{ currentUser.user_surname }} ?</div>
                                        </v-card-title>
                                        <v-card-text>Эта операция не может быть отменена! Все данные пользователя {{ currentUser.user_name }} {{ currentUser.user_surname }} будут удалены, и не подлежат восстанавлению! </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn error @click.native="fetchDelete(currentUser)">Удалить</v-btn>
                                            <v-btn primary @click.native="dialog = false">Отмена</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </td>
                        </template>

                        <template slot="pageText" scope="{ pageStart, pageStop }" dark>
                            От {{ pageStart }} до {{ pageStop }}
                        </template>

                    </v-data-table>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState({
                items: state => state.userStore.userList

            })
        },
        created () {
            this.$store.dispatch('setUserList')
        },
        methods: {
            showDelete(user) {
                this.currentUser = user;
                this.dialog = true;
            },
            fetchDelete(id) {
                this.$store.dispatch('fetchDeleteUser', id)
            }
        },
        data () {
            return {
                search: '',
                selected: [],
                headers: [
                    {
                        text: 'ФИО',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'Email', value: 'user_email' },
                    { text: 'Телефон', value: 'user_phone' },
                    { text: 'ИИН', value: 'user_iin' },
                    { text: 'Пол', value: 'user_sex' },
                    { text: 'Возраст', value: 'user_age' },
                    { text: 'Роль', value: 'user_role' },
                    { text: 'Дата регистрации', value: 'user_date' }
                ],
                pagination: [
                  10,20,30,{text: "Все", value: -1}
                ],
                dialog: false,
                currentUser: {}

            }
        }
    }
</script>

<style scoped>
</style>