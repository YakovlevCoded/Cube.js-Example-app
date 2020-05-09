cube(`Payments`, {
  sql: `SELECT * FROM classicmodels.payments`,

  joins: {

  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, username, date]
    },
    profitCount: {
      sql: `id`,
      type: `count`,
      filters: [
        { sql: `${CUBE}.profit = 1` }
      ]
    },
    expenseCount: {
      sql: `id`,
      type: `count`,
      filters: [
        { sql: `${CUBE}.profit = 0` }
      ]
    },
    profitPercentage: {
      sql: `100.0 * ${profitValue} / ${cost}`,
      type: `number`,
      format: `percent`
    },

    cost: {
      sql: `cost`,
      type: `sum`,
    },
    profitValue: {
      sql: `cost`,
      type: `sum`,
      filters: [
        { sql: `${CUBE}.profit = 1` }
      ]
    },
    expenseValue: {
      sql: `cost`,
      type: `sum`,
      filters: [
        { sql: `${CUBE}.profit = 0` }
      ]
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    username: {
      sql: `username`,
      type: `string`
    },

    description: {
      sql: `description`,
      type: `string`
    },

    segment: {
      sql: `segment`,
      type: `string`
    },

    date: {
      sql: `date`,
      type: `time`
    },

    isProfit: {
      sql: `profit`,
      type: `boolean`
    }
  }
});
