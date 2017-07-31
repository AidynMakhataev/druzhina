<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-card class="grey lighten-4 elevation-0">
                    <v-card-title><h4>Редактирование</h4></v-card-title>
                    <v-card-text>
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Имя</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="input-1"
                                            label="Имя"
                                            value="Ерасыл"
                                            id="testing"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Фамилия</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="input-2"
                                            label="Фамилия"
                                            value="Test"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Email</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="input-2"
                                            label="Email"
                                            value="era@test.kz"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Телефон</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="input-2"
                                            label="Телефон"
                                            value="+77071237777"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>ИИН</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="input-2"
                                            label="ИИН"
                                            value="123456789012"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Возраст</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="input-2"
                                            label="Возраст"
                                            value="12"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Пол</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-select
                                            v-bind:items="genders"
                                            v-model="select"
                                            label="Выберите пол"
                                            single-line
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Роль</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="input-3"
                                            label="Роль"
                                            value="Пользователь"
                                            disabled
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                select: null,
                genders: [
                    { text: 'Мужской' },
                    { text: 'Женский' }
                ]

            }
        }
    }
</script>

<style></style>