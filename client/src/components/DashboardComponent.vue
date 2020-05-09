<template>
    <div class="dashboard">
        <div class="row mx-0">
            <div class="col-10 offset-1">
                <h1 v-if="profitPercent">The percentage of profit is <span :class="profitClass" class="transition-color">{{profitPercent.toFixed(2)}}%</span>
                </h1>
                <h3 v-if="profitValue">Total company profit is <span class="green--text">{{profitValue}}$</span></h3>
                <h3 v-if="expenseValue">Total company expense is <span class="red--text">{{expenseValue}}$</span></h3>
            </div>
            <div class="col-10 offset-1" v-for="(chart, index) in charts" v-bind:key="index">
                <Chart :chart="chart" v-if="chart.type === 'line'"
                       :cubejsApi="cubejsApi"
                       :index="index"
                       :date="chart.query.timeDimensions[0].granularity"
                       @changeDate="changeChartDate"
                       @changeUser="changeChartUser"
                />
                <SegmentChart
                        :chart="chart" v-if="chart.type === 'pie'"
                        :cubejsApi="cubejsApi"
                        :index="index"
                        @changeDate="changeChartDate"
                        @changeUser="changeChartUser"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from './Chart.vue'
    import SegmentChart from "./SegmentChart";
    import cubejs from '@cubejs-client/core';

    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user || '{}');
    const userToken = userObj.token;
    const cubejsApi = cubejs(userToken, {apiUrl: `${process.env.VUE_APP_API_URL}/cubejs-api/v1`});

    export default {
        name: 'DashboardComponent',
        components: {
            Chart,
            SegmentChart
        },
        data() {
            return {
                cubejsApi,
                user: '',
                users: [],
                profitPercent: null,
                profitValue: null,
                expenseValue: null,
                charts: [{
                    query: {
                        "dimensions": [],
                        "timeDimensions": [
                            {
                                "dimension": "Payments.date",
                                "granularity": "day"
                            }
                        ],
                        "measures": [
                            "Payments.profitValue"
                        ],
                        "filters": [
                            {
                                "dimension": "Payments.username",
                                "operator": "contains",
                                "values": []
                            }
                        ]
                    },
                    title: 'Company profit value',
                    type: 'line',
                    hasDateChange: true,
                    hasUserSelect: true
                },
                    {
                        query: {
                            "dimensions": [],
                            "timeDimensions": [
                                {
                                    "dimension": "Payments.date",
                                    "granularity": "day"
                                }
                            ],
                            "measures": [
                                "Payments.expenseValue"
                            ],
                            "filters": [
                                {
                                    "dimension": "Payments.username",
                                    "operator": "contains",
                                    "values": []
                                }
                            ]
                        },
                        title: 'Company expense value',
                        type: 'line',
                        hasDateChange: true,
                        hasUserSelect: true
                    },
                    {
                        query: {
                            "dimensions": [
                                "Payments.segment",
                                "Payments.username"
                            ],
                            "timeDimensions": [],
                            "measures": [
                                "Payments.expenseValue"
                            ],
                            "filters": []
                        },
                        title: 'Expense segments',
                        type: 'pie',
                        hasDateChange: false,
                        hasUserSelect: false
                    },
                    {
                        query: {
                            "dimensions": [
                                "Payments.segment",
                                "Payments.username"
                            ],
                            "timeDimensions": [],
                            "measures": [
                                "Payments.profitValue"
                            ],
                            "filters": []
                        },
                        title: 'Profit segments',
                        type: 'pie',
                        hasDateChange: false,
                        hasUserSelect: false
                    },
                ]
            }
        },
        async created() {
            this.profitPercent = await this.loadProfitPercent();
            this.profitValue = await this.loadProfitValue();
            this.expenseValue = await this.loadExpenseValue();
        },
        methods: {
            async loadProfitPercent() {
                let precents = await cubejsApi.load({
                    "measures": [
                        "Payments.profitPercentage"
                    ],
                    "timeDimensions": [
                        {
                            "dimension": "Payments.date"
                        }
                    ],
                    "filters": []
                });
                if (precents) {
                    let percentValue = 0;
                    precents.loadResponse.data.forEach((obj) => {
                        if (obj['Payments.profitPercentage']) {
                            percentValue = obj['Payments.profitPercentage'];
                        }
                    });
                    return percentValue;
                }
            },
            async loadProfitValue() {
                let value = await cubejsApi.load({
                    "measures": [
                        "Payments.profitValue"
                    ],
                    "timeDimensions": [
                        {
                            "dimension": "Payments.date"
                        }
                    ],
                    "filters": []
                });
                if (value) {
                    let result = 0;
                    value.loadResponse.data.forEach((obj) => {
                        if (obj['Payments.profitValue']) {
                            result = obj['Payments.profitValue'];
                        }
                    });
                    return result;
                }
            },
            async loadExpenseValue() {
                let value = await cubejsApi.load({
                    "measures": [
                        "Payments.expenseValue"
                    ],
                    "timeDimensions": [
                        {
                            "dimension": "Payments.date"
                        }
                    ],
                    "filters": []
                });
                if (value) {
                    let result = 0;
                    value.loadResponse.data.forEach((obj) => {
                        if (obj['Payments.expenseValue']) {
                            result = obj['Payments.expenseValue'];
                        }
                    });
                    return result;
                }
            },
            changeChartDate(obj) {
                if ((typeof obj.index !== 'number') || !obj.value || !this.charts[obj.index]) {
                    return false
                }
                this.charts[obj.index].query.timeDimensions[0].granularity = obj.value;
            },
            changeChartUser(obj) {
                if ((typeof obj.index !== 'number') || !obj.value || !this.charts[obj.index]) {
                    return false
                }
                this.charts[obj.index].query.filters.forEach((filterObj) => {
                    console.log(filterObj);
                    if (filterObj['dimension'] === 'Payments.username' && filterObj['operator'] === 'contains') {
                        if (obj.value !== 'all users') {
                            filterObj['values'] = [obj.value];
                        } else {
                            filterObj['values'] = [];
                        }
                        console.log(filterObj['values'])
                    }
                })
                // this.charts[obj.index].query.timeDimensions[0].granularity = obj.value;
            }
        },
        computed: {
            profitClass() {
                return this.profitPercent > 50 ? 'green--text' : 'red--text'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dashboard {
        width: 100%;
    }

    .transition-color {
        transition: color 0.5s;
    }
</style>
