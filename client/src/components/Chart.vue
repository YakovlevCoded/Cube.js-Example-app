<template>
    <div class="chart">
        <div class="row mx-0">
            <v-card style="width: 100%">
                <v-card-title>
                    {{chart.title}}
                </v-card-title>

                <query-renderer class="pt-3" style="min-height: 312px" :cubejs-api="cubejsApi" :query="chart.query" v-if="cubejsApi">
                    <template v-slot="{ resultSet }">
                        <!-- chart -->
                        <div>
                            <line-chart :styles="myStyles"
                                        :chartdata="prepareData(resultSet.loadResponse.data)"
                                        :options="options"></line-chart>

                        </div>
                    </template>

                    <template v-slot:empty>
                        <div class="loading-container align-center justify-center d-flex">
                            <Loader/>
                        </div>
                    </template>
                </query-renderer>

                <!--<v-card-subtitle>-->
                <!--1,000 miles of wonder-->
                <!--</v-card-subtitle>-->

                <v-card-actions>
                    <span>
                        Filters:
                    </span>
                    <div class="col-4">
                        <v-spacer></v-spacer>
                        <v-select
                                label="by timeDimensions"
                                v-if="chart.hasDateChange"
                                v-model="dateInner"
                                :items="['day', 'week','month']"
                                @change="changeDateHandler"
                        >
                        </v-select>
                    </div>
                    <div class="col-4">
                        <v-spacer></v-spacer>
                        <v-select
                                label="by user"
                                v-if="chart.hasUserSelect"
                                v-model="innerUser"
                                :items="users"
                                @change="changeUserHandler"
                        >
                        </v-select>
                    </div>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
    import {QueryRenderer} from '@cubejs-client/vue';
    import Loader from "./UI/Loader";
    import LineChart from './UI/LineChart.vue'

    export default {
        name: 'Chart',
        components: {
            QueryRenderer,
            Loader,
            LineChart
        },
        props: ['chart', 'cubejsApi', 'date', 'index'],
        data: () => ({
            height: 300,
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            dateInner: '',
            colors: ['#6f76d9', '#43436B'],
            users: ['all users'],
            innerUser: 'all users'
        }),
        methods: {
            prepareData(data) {
                let self = this;
                let newData = data.map((obj) => {
                    let keys = Object.keys(obj);
                    let value = obj[keys[2]] || 0;
                    return value
                });
                return {
                    labels: data.map((obj) => {
                        let keys = Object.keys(obj);
                        let string = obj[keys[0]];
                        if (string.length >= 10) {
                            string = string.substr(0, 10);
                        }
                        return string
                    }),
                    datasets: [{label: self.chart.title, backgroundColor: self.colors[0], data: newData}]
                }
            },
            changeDateHandler(value) {
                this.$emit('changeDate', {index: this.index, value});
            },
            changeUserHandler(value) {
                this.$emit('changeUser', {index: this.index, value});
            },
            async loadUsers() {
                let users = await this.cubejsApi.load({
                    "dimensions": [
                        "Payments.username"
                    ],
                    "timeDimensions": [],
                    "filters": []
                });
                if (users) {
                    let usersArray = [];
                    users.loadResponse.data.forEach((obj) => {
                        usersArray.push(obj['Payments.username'])
                    });
                    return usersArray;
                }
            },
        },
        computed: {
            myStyles() {
                return {
                    height: `${this.height}px`,
                    position: 'relative'
                }
            }
        },
        async created() {
            this.dateInner = this.date;
            if (this.chart.hasUserSelect) {
                const users = await this.loadUsers();
                this.users = [...this.users, ...users];
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dashboard {
        width: 100%;
    }
</style>
