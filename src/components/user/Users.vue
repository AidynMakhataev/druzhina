<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-card light>
                    <v-card-title>
                        <h5>Пользователи</h5>
                        <v-spacer></v-spacer>
                        <v-text-field
                                append-icon="search"
                                label="Поиск"
                                hide-details
                                v-model="search"
                                light
                                class="input-group--focused"
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                            v-bind:headers="headers"
                            v-bind:items="items"
                            v-bind:search="search"
                            v-bind:rows-per-page-items = "pagination"
                            class="elevation-1"
                    >
                        <template slot="headerCell" scope="props">
                            <span v-tooltip:bottom="{ 'html': props.header.text }">
                              {{ props.header.text }}
                            </span>
                        </template>
                        <template slot="items" scope="props">
                            <td>{{ props.item.name }}</td>
                            <td  class="text-xs-right">{{ props.item.email }}</td>
                            <td  class="text-xs-right">{{ props.item.phone }}</td>
                            <td  class="text-xs-right">{{ props.item.iin }}</td>
                            <td  class="text-xs-right">{{ props.item.sex }}</td>
                            <td  class="text-xs-right">{{ props.item.age }}</td>
                            <td  class="text-xs-right">{{ props.item.role }}</td>
                            <td  class="text-xs-right">{{ props.item.regdate }}</td>
                            <td class="text-xs-right" style="width: 20%;"><v-btn small fab class="amber"><v-icon class="white--text">account_circle</v-icon></v-btn></td>
                            <td class="text-xs-right"><v-btn small primary fab dark><v-icon>edit</v-icon></v-btn></td>
                            <td class="text-xs-right"><v-btn small error fab dark><v-icon>delete</v-icon></v-btn></td>
                        </template>
                        <template slot="pageText" scope="{ pageStart, pageStop }" dark>
                            От {{ pageStart }} до {{ pageStop }}
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                search: '',
                pagination: {},
                selected: [],
                headers: [
                    {
                        text: 'ФИО',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'Email', value: 'email' },
                    { text: 'Телефон', value: 'phone' },
                    { text: 'ИИН', value: 'iin' },
                    { text: 'Пол', value: 'sex' },
                    { text: 'Возраст', value: 'age' },
                    { text: 'Роль', value: 'role' },
                    { text: 'Дата регистрации', value: 'regdate' }
                ],
                pagination: [
                  8,16,30,{text: "Все", value: -1}
                ],
                items: [
                    {
                        value: false,
                        name: 'Frozen Yogurt',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 87,
                        role: 'Пользователь',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'Ice cream sandwich',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 129,
                        role: 'Пользователь',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'Eclair',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 337,
                        role: 'Пользователь',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'Cupcake',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 413,
                        role: 'Пользователь',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'Gingerbread',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 327,
                        role: 'Пользователь',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'Jelly bean',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 50,
                        role: 'Пользователь',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'Lollipop',
                        email: 'asd@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 38,
                        role: 'Пользователь',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'Honeycomb',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-21',
                        iin: '123456789012',
                        sex: 1,
                        age: 562,
                        role: 'Пользователь',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'Donut',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 326,
                        role: 'Оператор',
                        regdate: '2017-06-15'
                    },
                    {
                        value: false,
                        name: 'KitKat',
                        email: 'test@mail.ru',
                        phone: '+7775-783-51-22',
                        iin: '123456789012',
                        sex: 1,
                        age: 54,
                        role: 'Админ',
                        regdate: '2017-06-15'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
</style>