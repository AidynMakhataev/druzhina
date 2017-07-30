<template>
  <v-app
    height="415px"
    dark
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
            <v-list-tile-title>Current User</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
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
    <v-toolbar class="red">
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="auth"></v-toolbar-side-icon>
        Brigade Druzhina
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-if="auth"><v-icon left>account_box</v-icon>Profile</v-btn>
        <v-btn flat v-if="auth" @click.stop="logout"><v-icon left>exit_to_app</v-icon>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-alert success dismissible v-if="flash.success">{{ flash.success }}</v-alert>
      <v-alert danger dismissible v-if="flash.error">{{ flash.error }}</v-alert>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  import Auth from './store/auth'
  import Flash from './helpers/flash'
  export default {
      created() {
          Auth.initialize()
      },
      data () {
          return {
              drawer: true,
              items: [
                  {title: 'Отслеживание', icon: 'my_location'},
                  {title: 'Пользователи', icon: 'person'},
                  {title: 'Регистрация', icon: 'face'}
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
</style>
