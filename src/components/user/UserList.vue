<template>

    <v-layout wrap>
        <ul v-for="user in items.list">{{ user.user_name }}</ul>
    </v-layout>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState({
                items: state => state.userList
            })
        }

    }
</script>