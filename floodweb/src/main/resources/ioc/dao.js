var ioc = {
    dao : {
        type : "org.nutz.dao.impl.NutDao",
        args : [{refer:"dataSource"}]
    },
    dataSource : {
        type : "com.alibaba.druid.pool.DruidDataSource",
        events : {
            depose : 'close'
        },
        fields : {
            driverClassName : "org.postgresql.Driver",
            url : "jdbc:postgresql://localhost:5432/smellmap",
            username : "postgres",
            password : "123456",
            maxWait: 15000
        }
    }
}