cube(`Users`, {
  sql: `SELECT * FROM classicmodels.users`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, username]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    userType: {
      sql: `user_type`,
      type: `string`
    },
    
    username: {
      sql: `username`,
      type: `string`
    },
    
    password: {
      sql: `password`,
      type: `string`
    }
  }
});
