<template>
  <v-app
    height="415px"
    light
    id="e3"
    standalone
  >
    <v-navigation-drawer
      class="pb-0"
      persistent
      absolute
      height="100%"
      clipped
      enable-resize-watcher
      v-model="drawer"
      v-if="auth"
    >
      <v-list dense>
        <v-list-tile avatar class="mb-2">
          <v-list-tile-avatar>
            <img src="http://www.rush-agency.ru/wp-content/uploads/avatar-1.png" alt="">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              Оператор Brigade
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
            {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="blue" >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="auth" class="white--text"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor:pointer;">Brigade Druzhina</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-if="auth" @click.stop="logout" class="white--text"><v-icon left class="white--text">exit_to_app</v-icon>Выйти из системы</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <div id="flash">
        <v-alert success dismissible v-if="flash.success" value="true">{{ flash.success }}</v-alert>
        <v-alert danger dismissible v-if="flash.error" value="true">{{ flash.error }}</v-alert>
      </div>
      <router-view></router-view>

    </main>
  </v-app>
</template>

<script>
  import Auth from './store/auth'
  import Flash from './helpers/flash'
  import { get } from './helpers/api'
  export default {
      created() {
          Auth.initialize()
      },
      data () {
          return {
              drawer: true,
              items: [
                  {title: 'Отслеживание', icon: 'my_location', link: '/'},
                  {title: 'Пользователи', icon: 'person', link: '/users'},
                  {title: 'Регистрация', icon: 'face', link: '/register'}
              ],
              authState: Auth.state,
              flash: Flash.state
          }
      },
      computed: {
          auth() {
              if(this.authState.user_email) {
                  return true
              }
              return false
          },
          guest() {
              return !this.auth
          }
      },
      methods: {
          logout() {
              Auth.remove()
              Flash.setSuccess('Вы успешно вышли из системы.')
              this.$router.push('/login')
          }
      }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  #flash {
    position: fixed;
    top: 60px;
    width: 30%;
    right: 0px;
    z-index:9999;
  }
</style>
