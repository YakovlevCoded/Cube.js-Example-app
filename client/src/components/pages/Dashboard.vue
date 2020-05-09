<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <div class="container">
                    <img src="../../assets/logo.svg" alt="">
                </div>
                <v-list-item link @click="mode = 'Dashboard'">
                    <v-list-item-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="mode = 'Finances'">
                    <v-list-item-action>
                        <v-icon>monetization_on</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Record transactions</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="exit">
                    <v-list-item-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Exit</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="pl-1">
                            <v-switch
                                    v-model="$vuetify.theme.dark"
                                    primary
                                    label="Dark theme"
                                    @change="setTheme"></v-switch>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left color="primary">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color: white"></v-app-bar-nav-icon>
            <v-toolbar-title style="color: white">
                {{mode}}
            </v-toolbar-title>
            <v-spacer/>

        </v-app-bar>

        <v-content>
            <v-container class="fill-height" fluid :class="{'gradient' : this.$vuetify.theme.dark}">
                <v-row align="center" justify="center">
                    <DashboardComponent v-if="mode === 'Dashboard'"/>
                    <Finances v-else></Finances>
                </v-row>
            </v-container>
        </v-content>

        <v-footer app>
            Cube.js | example app
        </v-footer>
    </v-app>
</template>

<script>
    import DashboardComponent from '../DashboardComponent.vue'
    import Finances from '../Finances.vue'

    export default {
        data: () => ({
            drawer: null,
            mode: 'Dashboard'
        }),
        components: {
            DashboardComponent,
            Finances
        },
        methods: {
            exit() {
                localStorage.setItem('user', '');
                this.$router.push('/login')
            },
            setTheme() {
                localStorage.setItem('theme', `${this.$vuetify.theme.dark}`);
            }
        },
    }
</script>

<style>
    .gradient {
        background: linear-gradient(45deg, #252627 0%, #252627 50%, #252627 100%) !important;
    }
</style>
