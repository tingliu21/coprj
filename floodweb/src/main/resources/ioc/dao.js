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
            driverClassName : "com.mysql.cj.jdbc.Driver",
            url : "jdbc:mysql://localhost:3306/flooddb",
            username : "root",
            password : "123456",
            maxWait: 15000
        }
    }
}