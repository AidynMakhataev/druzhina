<template>
    <v-container>
    <v-layout class="mt-5">
        <v-flex xs12 sm12 md3>
            <v-card>
                <v-card-media :src="getUserPhoto()">
                    <v-layout column class="media">
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn dark icon class="mr-3">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn dark icon>
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-title class="white--text pl-5 pt-5">
                            <div class="display-1 pl-5 pt-5">{{ user.user_name }} {{ user.user_surname }}</div>
                        </v-card-title>
                    </v-layout>
                </v-card-media>
                <v-list two-line>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon class="indigo--text">phone</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.user_phone }}</v-list-tile-title>
                            <v-list-tile-sub-title>Моб. тел</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon dark>chat</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon class="indigo--text">mail</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.user_email }}</v-list-tile-title>
                            <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon class="indigo--text">assignment_ind</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.user_iin }}</v-list-tile-title>
                            <v-list-tile-sub-title>ИИН</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon class="indigo--text">all_inclusive</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.user_age }}</v-list-tile-title>
                            <v-list-tile-sub-title>Возраст</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon class="indigo--text">wc</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.user_sex === 1 ? 'Мужской' : 'Женский' }}</v-list-tile-title>
                            <v-list-tile-sub-title>Пол</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon class="indigo--text">accessibility</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.user_role === 1 ? 'Пользователь' : 'Оператор' }}</v-list-tile-title>
                            <v-list-tile-sub-title>Роль</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon class="indigo--text">date_range</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.user_date }}</v-list-tile-title>
                            <v-list-tile-sub-title>Дата регистрации</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md9>
            <v-card flat height="100%">
                <v-toolbar class="white" floating dense>
                    <v-toolbar-title single-line>Последние координаты {{ user.user_name }} {{ user.user_surname }}</v-toolbar-title>
                    <v-btn icon>
                        <v-icon>my_location</v-icon>
                    </v-btn>

                </v-toolbar>
                <gmap-map
                        :center="center"
                        :zoom="12"
                        style="height: 90%"
                >
                    <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            @click="center=m.position"
                    ></gmap-marker>
                </gmap-map>
            </v-card>
        </v-flex>
    </v-layout>

    </v-container>
</template>

<script>
    import * as VueGoogleMaps from 'vue2-google-maps';
    import Vue from 'vue';

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCScnmbvb8VoQTEti15eFCrPfkhNAOZOF8'
        }
    });
    import { get } from './../../helpers/api'
    export default {
        data () {
            return {
                user: '',
                center: {lat: 43.231696, lng: 76.94481},
                markers: [],
                img: ''
            }
        },
        created() {
            this.fetchUser(this.$route.params.id)
            this.fetchUserTraces(this.$route.params.id)
        },
        methods: {
            fetchUser(id) {
                get('/api/user/' + id)
                    .then(response => {
                        this.user = response.data
                    })
            },
            fetchUserTraces(id) {
                let temporary = []
                get('/api/user/' + id + '/trace?count=10')
                    .then(response => {
                        temporary = response.data
                        for(let i = 0; i<temporary.length; i ++) {
                            this.markers.push({
                                position: {
                                    lat: temporary[i].trace_latitude,
                                    lng: temporary[i].trace_longitude
                                }
                            })
                        }
                    })
            },
            getUserPhoto () {

                let imgPath = '';
                if(this.user.user_avatar) {
                    imgPath = 'https://brigade.kz/api/file/' + this.user.user_avatar
                }
                else {
                    imgPath = 'https://vuetifyjs.com/static/doc-images/cards/docks.jpg'
                }
                return imgPath;
            }
        }
    }
</script>

<style>
    .media {
        height:100%;
        margin: 0;
    }
</style>