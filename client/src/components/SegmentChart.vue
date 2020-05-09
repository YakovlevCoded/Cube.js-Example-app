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
                            <pie-chart :styles="myStyles"
                                        :chartdata="prepareData(resultSet.loadResponse.data)"
                                        :options="options"></pie-chart>

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
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
    import {QueryRenderer} from '@cubejs-client/vue';
    import Loader from "./UI/Loader";
    import PieChart from "./UI/PieChart";

    export default {
        name: 'Chart',
        components: {
            PieChart,
            QueryRenderer,
            Loader,
        },
        props: ['chart', 'cubejsApi', 'date', 'index'],
        data: () => ({
            height: 300,
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            dateInner: '',
            colors: ['#6f76d9', '#43436B', '#FF6492', '#141446', '#7A77FF', '#5d9ec7', '#5db2c7'],
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
                        string += `, ${obj[keys[1]]}`;
                        return string
                    }),
                    datasets: [{label: self.chart.title, backgroundColor: self.colors, data: newData}]
                }
            },
            changeDateHandler(value) {
                this.$emit('changeDate', {index: this.index, value});
            },
            changeUserHandler(value) {
                this.$emit('changeUser', {index: this.index, value});
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dashboard {
        width: 100%;
    }
</style>
