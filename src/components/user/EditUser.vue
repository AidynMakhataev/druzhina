<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-card class="grey lighten-4 elevation-0">
                    <v-card-title><h4>Редактирование пользователя {{ fio }}</h4></v-card-title>
                    <form v-on:submit.prevent="updateUser">
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
                                            v-model="userDetails.user_name"
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
                                            v-model="userDetails.user_surname"
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
                                            type="email"
                                            v-model="userDetails.user_email"
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
                                            v-model="userDetails.user_phone"
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
                                            type="number"
                                            v-model="userDetails.user_iin"
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
                                            type="number"
                                            v-model="userDetails.user_age"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Пол</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-select
                                            :items="genders"
                                            :item-text="genders.text"
                                            :item-value="genders.value"
                                            v-model="userDetails.user_sex"
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
                                    <v-select
                                        :items="roles"
                                        :item-text="roles.text"
                                        :item-value="roles.value"
                                        v-model="userDetails.user_role"
                                        single-line
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-spacer></v-spacer>
                                <v-btn primary :disabled="!formIsValid" type="submit">Отправить</v-btn>
                                <v-btn to="/users">Отмена</v-btn>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {get} from './../../helpers/api'
    export default {
        data () {
            return {
                genders: [
                    {text: 'Мужской', value: 1},
                    {text: 'Женский', value: 2}
                ],
                roles: [
                    {text: 'Пользователь', value: 1},
                    {text: 'Оператор', value: 2}
                ],
                userDetails: {},
                fio: ''

            }
        },
        computed: {
            formIsValid () {
                return  this.userDetails.user_name !== '' &&
                        this.userDetails.user_surname !== '' &&
                        this.userDetails.user_email !== '' &&
                        this.userDetails.user_phone !== '' &&
                        this.userDetails.user_sex !== '' &&
                        this.userDetails.user_age !== '' &&
                        this.userDetails.user_iin !== '' &&
                        this.userDetails.user_role !== ''
            }
        },
        created() {
            this.fetchSingleUserById(this.$route.params.id)
        },
        methods: {
            fetchSingleUserById(id) {
                get('/api/user/' + id)
                    .then(response => {
                        this.userDetails = response.data
                        this.fio = response.data.user_name + '' + response.data.user_surname
                    })
            },
            updateUser() {
                if( !this.formIsValid) {
                    return false;
                }
                const userData = {
                    user_name: this.userDetails.user_name,
                    user_surname: this.userDetails.user_surname,
                    user_phone: this.userDetails.user_phone,
                    user_email: this.userDetails.user_email,
                    user_iin: this.userDetails.user_iin,
                    user_age: parseInt(this.userDetails.user_age),
                    user_role: parseInt(this.userDetails.user_role),
                    user_sex: parseInt(this.userDetails.user_sex),
                    user_id: parseInt(this.userDetails.user_id),
                    user_avatar: this.userDetails.user_avatar
                }
//                console.log(response)
                this.$store.dispatch('fetchUpdateUser', userData)
                this.$router.push('/users')
            }
        }
    }
</script>

<style></style>