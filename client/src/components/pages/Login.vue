<template>
    <v-app>
        <v-form ref="form"
                class="form"
                v-model="valid"
                @keyup.native.enter="signUpHandler">
            <v-content>
                <v-container
                        class="fill-height"
                        fluid
                >
                    <v-row
                            align="center"
                            justify="center"
                    >
                        <v-col
                                cols="12"
                                sm="8"
                                md="4"
                        >
                            <v-card class="elevation-12">
                                <v-toolbar
                                        color="primary"
                                        dark
                                        flat
                                >
                                    <v-toolbar-title>Login</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field
                                                v-model="login"
                                                :counter="40"
                                                label="Login"
                                                name="login"
                                                prepend-icon="person"
                                                required
                                                :rules="loginRules"
                                                type="text"></v-text-field>

                                        <v-text-field
                                                v-model="password"
                                                id="password"
                                                label="Password"
                                                name="password"
                                                prepend-icon="lock"
                                                required
                                                :rules="passwordRules"
                                                type="password"></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer/>
                                    <v-btn :disabled="!valid" color="secondary" @click="signUpHandler">Sign up</v-btn>
                                    <v-btn :disabled="!valid" color="primary" @click="signInHandler">Sign in</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>
        </v-form>
    </v-app>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Login',
        data() {
            return {
                valid: false,
                login: '',
                password: '',
                loginRules: [
                    v => !!v || 'Name is required',
                    v => v.length <= 40 || 'Name must be less than 40 characters',
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                ],
            }
        },
        mounted() {
            let user = localStorage.getItem('user');
            if (user) {
                let userObj = JSON.parse(user);
                this.successAuth(userObj.token);
            }
        },
        methods: {
            async signUpHandler() {
                if (!this.login || !this.password) {
                    return false
                }
                try {
                    const response = await axios.post(`http://79.143.30.13/login/registration`, {
                        login: this.login,
                        password: this.password
                    });
                    if (response.status === 201) {
                        this.$emit('show_snackbar', {text: response.data});
                        this.signInHandler();
                    } else {
                        if (typeof response.data === 'string') {
                            this.$emit('show_snackbar', {text: response.data})
                        }
                    }
                } catch (e) {
                    this.$emit('show_snackbar', {text: e.response.data});
                }

            },
            async signInHandler() {
                if (!this.login || !this.password) {
                    return false
                }
                try {
                    const response = await axios.post(`http://79.143.30.13/login/sign`, {
                        login: this.login,
                        password: this.password
                    });
                    if (response.status === 200) {
                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                    this.successAuth(response.data.token);
                } catch (e) {
                    this.$emit('show_snackbar', {text: e.response.data});
                }
            },
            validate() {
                this.$refs.form.validate()
            },
            successAuth(token) {
                axios.defaults.headers.common['authorization'] = `${token}`;
                this.$router.push('/dashboard');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .form {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
