<template>
<v-container>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-card-title v-text="text">
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
    export default {
        data () {
            return {
                text: 'Странице не найдена'
            }
        }
    }
</script>