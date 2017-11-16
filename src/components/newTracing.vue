<template>
    <div>
        <ul>
            <li v-for="user in traces">
                {{ user.user_email }}
            </li>
        </ul>
    </div>
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
                traces: []
            }
        },
        computed: {
            ...mapState({
                dangerUsersList: state => state.traceStore.dangerUsersList
            })
        },
        watch: {
            traces: function(val) {
                console.log('this is sparta', val)
            }
        },
        mounted() {
            setTimeout(() => {
                this.$store.dispatch('fetchDangerUsers')
                    .then(response => {
                        console.log(response)
                        this.traces = response
                    })
            }, 1000)
        }
    }
</script>