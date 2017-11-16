<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm12 md3>
                <v-card>
                    <v-toolbar class="blue" dark>
                        <v-toolbar-side-icon></v-toolbar-side-icon>
                        <v-toolbar-title>Список пользователей</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="getCoords()">
                            <v-icon>
                                autorenew</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-list two-line >
                        <template >
                            <v-subheader>Тревога</v-subheader>
                            <v-divider></v-divider>

                            <v-list-tile avatar href="javascript:;" id="asd" v-for="(user,i) in all" :key="user.trace_user_id">
                                <div>
                                    <img v-bind:src="getUserPhoto(user.user_avatar)" style="width: 120px; height: 120px; border-radius: 50%;">
                                </div>
                                <v-list-tile-content >
                                    <v-list-tile-title >
                                        {{ user.user_name }}  {{ user.user_surname }}
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <v-icon>email</v-icon>
                                        {{ user.user_email }} <br/>
                                        <v-icon>phone</v-icon>
                                        {{ user.user_phone }}
                                        <v-spacer></v-spacer>
                                        <v-btn error @click="cancelEvent(user.trace_user_id)">Отмена тревоги</v-btn> <br/>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-divider></v-divider>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md9 v-if="markerCoords.length > 0">
                <v-card flat height="800px">
                    <yandex-map
                            :coords="center"
                            zoom="12"
                            style="width: 100%; height: 600px;"
                            :cluster-options="{
    1: {clusterDisableClickZoom: false}
  }"
                            :behaviors="['scrollZoom', 'drag']"
                            :controls="['zoomControl']"
                            map-type="map"
                    >



                        <ymap-marker
                                v-for="cs in markerCoords"
                                :key ="cs[0]"
                                marker-type="placemark"
                                :coords="cs.coords"
                                :hint-content="cs.balloon.footer"
                                :balloon="{header: cs.balloon.header, body: cs.balloon.body}"
                                :icon="{color: 'red', glyph: 'stretchy', content: cs.balloon.header}"
                                cluster-name="1"
                        ></ymap-marker>


                    </yandex-map>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'
    import {get, post} from './../helpers/api'
    import {yandexMap, ymapMarker} from 'vue-yandex-maps'
    export default {
        components: {
            yandexMap, ymapMarker
        },
        data () {
            return {
                center: [],
                markerCoords: [],
                users: [],
                avatar : '',
                all: []
            }
        },
        created() {
            this.getCoords();
        },
        methods: {
            cancelEvent: function(id) {
                let postData = {
                    event_type: 2
                }
                post('/api/user/'+id+'/event',postData)
                    .then(response => {
                        this.getCoords();
                    })
            },
            getCoords: function () {
                this.users = [];
                this.all = [];
                this.markerCoords = [];
                var self = this;
                // var userInfo = new Array();
                get('/api/user?event_type=1')
                    .then(response => {
                        this.users = response.data;
                        for (var i = 0; i< this.users.length; i++) {
                            get('/api/user/' + this.users[i].user_id + '/trace?count=1')
                                .then(response => {
                                    this.all.push(response.data[0]);
                                    this.center = [response.data[0].trace_latitude, response.data[0].trace_longitude]
                                    let test = '<div class="card">' +
                                        '<div class="card__media">' +
                                        '</div>' +
                                        '<ul data-uid="606" class="list list--two-line">' +
                                        '<li><a href="javascript:;" class="list__tile">' +
                                        '<div class="list__tile__action"><i class="material-icons icon indigo--text">phone</i></div>' +
                                        '<div class="list__tile__content"><div class="list__tile__title">' + response.data[0].user_phone +
                                        '</div><div class="list__tile__sub-title">Мобильный тел.</div></div> </a></li>' +
                                        '<li><a href="javascript:;" class="list__tile">' +
                                        '<div class="list__tile__action"><i class="material-icons icon indigo--text">mail</i></div>' +
                                        '<div class="list__tile__content"><div class="list__tile__title">' + response.data[0].user_email +
                                        '</div><div class="list__tile__sub-title">Email</div></div> </a></li>' +
                                        '<li><a href="' + '#/user/' + response.data[0].trace_user_id + '" class="btn btn--raised btn--small theme--dark primary"><div class="btn__content">Профиль пользователя</div></a>'
                                    '</div>';
                                    this.markerCoords.push({
                                        coords: [response.data[0].trace_latitude, response.data[0].trace_longitude],
                                        balloon: {
                                            header: response.data[0].user_name + '&nbsp;' + response.data[0].user_surname,
                                            body: test,
                                            footer: response.data[0].user_phone
                                        }
                                    })
                                    console.log(this.markerCoords)
                                }).catch( error => {console.log(error); });
                        }
                    })
                    .catch(error => {console.log(error); });
                setTimeout(function(){ self.getCoords() }, 30000);

            },
            getUserPhoto (avatar) {
                let imgPath = '';
                if(avatar) {
                    imgPath = 'https://brigade.kz/api/file/' + avatar
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
    #asd {
        height:250px!important;
    }
</style>