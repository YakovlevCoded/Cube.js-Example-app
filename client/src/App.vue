<template>
    <div id="app">
        <router-view @show_snackbar="show_snackbar"></router-view>
        <v-snackbar
                v-model="snackbar.show"
                top
                color="#FF6492"
        >
            {{snackbar.text}}
            <v-btn
                    dark
                    text
                    @click="snackbar.show = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'App',
        components: {
            // Header
        },
        created() {
            let user = localStorage.getItem('user');
            let theme = localStorage.getItem('theme');
            if (user) {
                let userObj = JSON.parse(user);
                axios.defaults.headers.common['authorization'] = `${userObj.token}`;
            }
            if (theme === 'true') {
                this.$vuetify.theme.dark = true;
            }
            document.title = 'Cube.js | Example app'
        },
        mounted() {
            this.$root.$on('show_snackbar', obj => {
                this.show_snackbar(obj);
            });
        },
        data() {
            return {
                snackbar: {
                    show: false,
                    text: '',
                    type: 'error'
                }
            }
        },
        methods: {
            show_snackbar (obj) {
                this.snackbar.text = obj.text || '';
                this.snackbar.type = obj.type || 'error';
                this.snackbar.show = true;
                setTimeout(() => {
                    this.snackbar.show = false;
                }, 5000)
            }
        }
    }
</script>

<style>
    body {
        background-color: rgb(243, 243, 251);
        height: 100%;
        max-height: 100%;
        line-height: 28px;
        font-size: 18px;
        letter-spacing: .02em;
        color: #50556c;
        font-weight: 400;
        -webkit-font-feature-settings: "liga" 0;
        font-feature-settings: "liga" 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
