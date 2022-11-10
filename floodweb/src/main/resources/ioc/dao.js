var ioc = {
    conf : {
        type : "org.nutz.ioc.impl.PropertiesProxy",
        fields : {
            paths : ["custom/"]
        }
    },
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
            url : "jdbc:mysql://localhost:3306/flooddb?serverTimezone=UTC&characterEncoding=utf-8 ",
            username : "root",
            password : "3030644021",
            maxWait: 15000
        }
    },
    geoserverConfig: {
        type: "cn.edu.fudan.floodweb.bean.GeoserverConfig",
        fields: {
            url: 'http://localhost:8088/geoserver',
            userName:'admin',
            passWord:'geoserver'
        }
    }
}