<template>
    <div class="finances">
        <v-card class="py-5 px-5" :elevation="8" v-if="!datePick">
            <form>
                <div class="row">
                    <div class="col-6">
                        <v-select
                                v-model="actionSelected"
                                :items="items"
                                label="Value"
                                required
                        ></v-select>
                    </div>
                    <div class="col-6">
                        <v-text-field
                                v-model.number="cost"
                                @keypress="isNumber($event)"
                                type="number"
                                :label="actionSelected + ' value ($)'"
                                required
                        ></v-text-field>
                    </div>
                    <div class="col-6">
                        <v-select
                                v-model="segment"
                                :items="segments"
                                label="Segment"
                                required
                        ></v-select>
                    </div>
                    <div class="col-6 d-flex align-center">
                        <v-btn class="mr-4" color="primary" @click="datePick = true">{{date ? date : 'Pick a date'}}</v-btn>
                    </div>
                </div>
                <v-textarea
                        v-model="description"
                        outlined
                        label="Description"
                        required
                ></v-textarea>
                <v-checkbox
                        v-model="isAgree"
                        label="Do you agree?"
                        required
                ></v-checkbox>
                <v-btn class="mr-4" color="accent" :disabled="!isValid" @click="submitHandler">Submit</v-btn>
            </form>
        </v-card>
        <v-date-picker v-model="date" v-else  width="600"></v-date-picker>
    </div>
</template>

<script>
    import cubejs from '@cubejs-client/core';
    import axios from "axios";
    // import Loader from "./UI/Loader";

    export default {
        name: 'DashboardComponent',
        components: {
            // Loader,
        },
        data() {
            const user = localStorage.getItem('user');
            const userObj = JSON.parse(user);
            const userToken = userObj.token;
            const cubejsApi = cubejs(userToken, {apiUrl: `http://79.143.30.13/cubejs-api/v1`});
            return {
                cubejsApi,
                cost: null,
                description: '',
                items: ['Profit', 'Expense'],
                isAgree: false,
                actionSelected: 'Profit',
                segment: '',
                date: '',
                datePick: false,
                segments: ['Car', 'Food', 'Clothes', 'Taxi', 'Transport', 'Bills', 'House', 'Health', 'Other']
            }
        },
        computed: {
            isValid() {
                return this.cost && this.description && this.actionSelected && this.isAgree && this.segment && this.date
            }
        },
        methods: {
            async submitHandler() {
                if (!this.isValid) {
                    return false
                }
                try {
                    const user = JSON.parse(localStorage.getItem('user'));
                    let payload = {
                        id: user.id,
                        token: user.token,
                        user_name: user.user_name,
                        cost: this.cost,
                        description: this.description,
                        actionSelected: this.actionSelected,
                        date: this.date,
                        segment: this.segment,
                        profit: this.actionSelected === 'Profit' ? 1 : 0
                    };
                    const response = await axios.post(`http://79.143.30.13/payments/add`, payload);
                    if (response.status === 201) {
                        this.$root.$emit('show_snackbar', {text: 'Payment successfully added'});
                    }
                    console.log(response);
                } catch (e) {
                    this.$root.$emit('show_snackbar', {text: e});

                }
                this.clearForm();
            },
            clearForm() {
                this.cost = null;
                this.description = '';
                this.isAgree = false;
                this.actionSelected = 'Profit';
                this.segment = '';
                this.date = '';
            },
            isNumber(evt) {
                evt = (evt) ? evt : window.event;
                let charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode < 48 || charCode > 57) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            }
        },
        watch: {
            date: {
                handler(value) {
                    if (value) {
                        this.datePick = false
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .finances {
        width: 100%;
        max-width: 600px;
    }
</style>
