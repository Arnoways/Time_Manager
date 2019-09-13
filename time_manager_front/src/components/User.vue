<template>
    <div id="theUser">
        <div id="username">
            <input v-model="username" placeholder="Nom d'utilisateur"> <br><br>
            <button v-on:click="search">Rechercher</button>
            <span></span>
        </div>
        <br><br>
        <div id="all">
            <ul v-if="users">
                <li v-for="user of users" :key="user.id">
                    {{ user.username }}
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>

import axios from 'axios';

export default {

    name: 'User',

    data() {
        return {
            users: [],
            usernames: [],
            username: '',
            user: {},
            email: '',
            exists: false
        }
    },

    created() {
        this.fetchData()
    },

    watch: {
        '$route': 'fetchData'
    },

    methods: {
        
        fetchData() {
            axios.get('http://localhost:4000/api/users')
            .then((response) => {
                for (var i = 0; i < response.data.data.length; i++) {
                    this.usernames.push(response.data.data[i].username);
                }
                this.users = response.data.data;
            })
            .catch((err) => {
                console.log(err);
            })
        },

        search() {
            for (var j = 0; j < this.usernames.length; j++){
                if (this.username == this.usernames[j]) {
                    this.exists = true;
                }
            }

            if (this.exists) {
                alert('il existe');
            } else {
                alert('il n existe pas');
            }
            
            this.exists = false;
        }
    }
}

</script>

<style>

#username {
    width: 90%;
    border-radius: 10px;
    background-color: #95afc0;
    margin: auto;
    padding: 10px;
}

#all {
    width: 90%;
    border-radius: 10px;
    background-color: #dff9fb;
    margin: auto;
    padding: 10px;
}

</style>
