<template>
    <v-container>
    <v-layout row>
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
                            <v-list-tile-avatar >
                                <img v-bind:src="avatar"></v-list-tile-avatar>
                            <v-list-tile-content >
                                <v-list-tile-title >
                                    {{ user.user_name }}  {{ user.user_surname }}
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-icon>email</v-icon>
                                    {{ user.user_email }}
                                    <v-icon>phone</v-icon>
                                    {{ user.user_phone }}
                                    <v-spacer></v-spacer>
                                    <v-btn error @click="cancelEvent(user.trace_user_id)">Отмена тревоги</v-btn>
                                    <v-btn primary @click="findMarker(user.trace_latitude,user.trace_longitude,i)">Найти на карте</v-btn>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-divider></v-divider>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md9>
            <v-card flat height="800px">
                <gmap-map
                        :center="center"
                        :zoom="12"
                        style="height: 90%"
                        v-if="markers.length !== 0"
                >
                    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
                    <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            @click="toggleInfoWindow(m,index)"
                    ></gmap-marker>
                </gmap-map>
            </v-card>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'
    import {get, post} from './../helpers/api'
    export default {
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
                        console.log(response);
                        this.getCoords();
                    })
            },
            findMarker: function(lat,lng,index) {
                let position = {
                    lat: lat,
                    lng: lng
                }
                this.center = position;
                this.infoWindowPos = this.markers[index].position;
                this.infoContent = this.markers[index].infoText;
                this.infoWinOpen = true;

            },
            toggleInfoWindow: function(marker, idx) {
                console.log(idx);
                this.infoWindowPos = marker.position;
                this.infoContent = marker.infoText;

                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                    this.infoWinOpen = !this.infoWinOpen;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.infoWinOpen = true;
                    this.currentMidx = idx;

                }
            },
            getCoords: function () {
                this.markers = [];
                this.users = [];
                this.all = [];
                var self = this;
                let image = [];
                // var userInfo = new Array();
                get('/api/user?event_type=1')
                    .then(response => {
                        this.users = response.data;
                        for (var i = 0; i< this.users.length; i++) {

                            get('/api/user/' + this.users[i].user_id + '/trace?count=1')
                                .then(response => {
                                    this.all.push(response.data[0])
                                    console.log('Response',this.all);
                                    if(response.data[0].user_avatar != null) {
                                        image = 'https://brigade.kz/api/file/' + response.data[0].user_avatar;
                                    }
                                    else {
                                        image = 'https://vuetifyjs.com/static/doc-images/cards/docks.jpg'
                                    }
                                    var test = '<div class="card" style="height: 300px;">' +
                                            '<div class="card__media" style="height: 100px;">' +
                                            '<div class="card__media__background" style="background: url(' + image + ') center center / cover no-repeat;"></div>' +
                                            '<div class="card__media__content">' +
                                            '<div class="layout media column">' +
                                            '<div class="spacer"></div>' +
                                            '<div class="card__title white--text" style="text-shadow: 1px 1px 1px black;"><div class="display-1 pl-5 pt-5">' + response.data[0].user_name + '&nbsp;' + response.data[0].user_surname + '</div></div>' +
                                            '</div></div></div>' +
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
                                    this.markers.push({
                                        position: {
                                            lat: response.data[0].trace_latitude,
                                            lng: response.data[0].trace_longitude
                                        },
                                        infoText: test
                                    })
                                }).catch( error => {console.log(error); });

                        }
                    }).catch(error => {console.log(error); });
                 setTimeout(function(){ self.getCoords() }, 30000);
            }
        },
        data () {
            return {
                center: {lat: 43.231696, lng: 76.94481},
                markers: [],
                users: [],
                avatar : 'https://vuetifyjs.com/static/doc-images/cards/docks.jpg',
                all: [],
                infoContent: '',
                infoWindowPos: {
                    lat: 0,
                    lng: 0
                },
                infoWinOpen: false,
                currentMidx: null,
                //optional: offset infowindow so it visually sits nicely on top of our marker
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
            }
        }
    }
</script>

<style>
   #asd {
       height:100px!important;
   }
</style>